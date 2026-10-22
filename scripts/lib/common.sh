#!/usr/bin/env bash
# Shared helpers for mytools commands. Compatible with macOS Bash 3.2.

export LC_ALL=C
export LC_NUMERIC=C

MYTOOLS_CONFIG_DIR="${MYTOOLS_CONFIG_DIR:-$HOME/.config/mytools}"
MYTOOLS_CONFIG_FILE="${MYTOOLS_CONFIG_FILE:-$MYTOOLS_CONFIG_DIR/config}"

notify() {
    local message="$1" title="${2:-mytools}"
    osascript -e "display notification \"${message//\"/\\\"}\" with title \"${title//\"/\\\"}\"" 2>/dev/null || true
}

require_commands() {
    local missing=() command
    for command in "$@"; do command -v "$command" >/dev/null 2>&1 || missing+=("$command"); done
    if [ "${#missing[@]}" -gt 0 ]; then
        printf '❌ Missing required command(s): %s\n' "${missing[*]}" >&2
        printf '💡 Run: mytools doctor\n' >&2
        return 1
    fi
}

ensure_output_dir() {
    local directory="$1"
    [ -z "$directory" ] && return 0
    mkdir -p "$directory" || return 1
    cd "$directory" && pwd
}

output_is_safe() {
    local output="$1" force="$2"
    if [ -e "$output" ] && [ "$force" -ne 1 ]; then
        printf '⚠️  Skipped (already exists; pass --force): %s\n' "$output" >&2
        return 1
    fi
}

load_preset() {
    local preset="$1" key value section=""
    [ -f "$MYTOOLS_CONFIG_FILE" ] || return 1
    while IFS='=' read -r key value; do
        key="${key%%[[:space:]]*}"; value="${value#*=}"
        case "$key" in
            "[$preset]") section="$preset" ;;
            \[*\]) section="" ;;
            *) [ "$section" = "$preset" ] && printf '%s=%s\n' "$key" "$value" ;;
        esac
    done < "$MYTOOLS_CONFIG_FILE"
}

# Live file metadata preview helper for fzf file pickers
preview_media_file() {
    local f="$1"
    if [ ! -e "$f" ]; then
        echo "ℹ️  $f"
        return 0
    fi
    if [ -d "$f" ]; then
        echo "📁 Directory: $f"
        ls -la "$f" 2>/dev/null | head -n 25
        return 0
    fi
    local size=""
    size=$(du -h "$f" 2>/dev/null | awk '{print $1}' || true)
    echo "📄 File : $(basename "$f")"
    echo "📂 Path : $f"
    [ -n "$size" ] && echo "💾 Size : $size"
    echo "────────────────────────────────────────"
    if command -v ffprobe >/dev/null 2>&1; then
        local vinfo ainfo dur
        dur=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f" 2>/dev/null | head -n1 || true)
        vinfo=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt -of default=nw=1 "$f" 2>/dev/null || true)
        ainfo=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels -of default=nw=1 "$f" 2>/dev/null || true)
        if [ -n "$dur" ] && [[ "$dur" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
            printf "⏱️  Duration : %.2fs\n" "$dur"
        fi
        if [ -n "$vinfo" ]; then
            echo "🎬 Video Stream:"
            echo "$vinfo" | sed 's/^/   • /'
        fi
        if [ -n "$ainfo" ]; then
            echo "🔊 Audio Stream:"
            echo "$ainfo" | sed 's/^/   • /'
        else
            echo "🔇 Audio Stream: None (Muted)"
        fi
    else
        file -b "$f" 2>/dev/null || true
    fi
}

# Interactive file selector with fzf & live metadata preview
# Populates global FILES array
wizard_select_files() {
    local tool_name="$1"
    local ext_regex="${2:-\.(mp4|mov|avi|mkv|webm|m4v)$}"
    local header_msg="${3:-💡 [Tab] mark multiple files • [Enter] confirm}"
    local common_path="${BASH_SOURCE[0]}"

    if [ "${#FILES[@]}" -gt 0 ]; then
        echo "📂 Files selected (${#FILES[@]}): ${FILES[*]}"
        return 0
    fi

    if command -v fzf >/dev/null 2>&1; then
        local cand_files="" selected=""
        cand_files=$(find . -maxdepth 1 -type f 2>/dev/null | grep -Ei "$ext_regex" | sed 's#^./##' | sort || true)
        if [ -z "$cand_files" ]; then
            cand_files=$(find . -maxdepth 2 -type f 2>/dev/null | grep -Ei "$ext_regex" | sed 's#^./##' | sort || true)
        fi
        if [ -n "$cand_files" ]; then
            selected=$(printf '%s\n' "$cand_files" | fzf -m \
                --prompt="${tool_name} files > " \
                --header="$header_msg" \
                --height=65% \
                --layout=reverse \
                --border \
                --preview="bash \"$common_path\" --preview {}" \
                --preview-window=right:48%:wrap || true)
        fi
        if [ -n "$selected" ]; then
            while IFS= read -r f; do
                [ -n "$f" ] && FILES+=("$f")
            done <<< "$selected"
        fi
    fi

    if [ "${#FILES[@]}" -eq 0 ]; then
        printf "📂 Enter path to file(s) for %s: " "$tool_name"
        local manual_input=""
        read -r manual_input || true
        if [ -n "$manual_input" ]; then
            for mf in $manual_input; do
                [ -n "$mf" ] && FILES+=("$mf")
            done
        fi
    fi

    if [ "${#FILES[@]}" -eq 0 ]; then
        echo "❌ No files selected. Canceled."
        exit 0
    fi
}

# Interactive summary card, Equivalent Command display, clipboard helper & execution confirmation
# Usage: wizard_confirm_and_run <tool_name> <equivalent_cmd> <summary_line_1> [summary_line_2...]
wizard_confirm_and_run() {
    local tool_name="$1"
    local eq_cmd="$2"
    shift 2

    echo ""
    echo "══════════════════════════════════════════════════════════════"
    echo "📋 Planned Configuration ($tool_name)"
    for line in "$@"; do
        echo "  • $line"
    done
    echo "──────────────────────────────────────────────────────────────"
    echo "💡 Equivalent command (copy for next time):"
    echo "   $eq_cmd"
    echo "══════════════════════════════════════════════════════════════"

    # Only prompt for confirmation if running in an interactive terminal
    if [ ! -t 0 ]; then
        return 0
    fi

    if command -v fzf >/dev/null 2>&1; then
        local action
        action=$(printf '%s\n' \
            'run — 🚀 Execute now' \
            'copy-run — 📋 Copy command to clipboard & execute now' \
            'dry-run — 📝 Dry-run preview only (do not encode)' \
            'copy-only — 📋 Copy command to clipboard & exit without running' \
            'cancel — ❌ Cancel and exit' | fzf \
            --prompt="${tool_name} > " \
            --header="Confirm execution or copy the generated CLI command" \
            --height=35% \
            --layout=reverse \
            --border || true)
        case "${action%% *}" in
            run)
                return 0
                ;;
            copy-run)
                if command -v pbcopy >/dev/null 2>&1; then
                    printf '%s' "$eq_cmd" | pbcopy
                    echo "📋 Copied command to macOS clipboard!"
                fi
                return 0
                ;;
            dry-run)
                DRY_RUN=1
                return 0
                ;;
            copy-only)
                if command -v pbcopy >/dev/null 2>&1; then
                    printf '%s' "$eq_cmd" | pbcopy
                    echo "✅ Command copied to clipboard! Paste it in Terminal with Cmd+V anytime."
                else
                    echo "💡 Command: $eq_cmd"
                fi
                exit 0
                ;;
            *)
                echo "❌ Operation canceled."
                exit 0
                ;;
        esac
    else
        printf "🚀 Proceed with execution? [Y/n/d(ry-run)/c(opy)]: "
        local ans=""
        read -r ans || true
        case "$ans" in
            [nN]*) echo "❌ Operation canceled."; exit 0 ;;
            [dD]*) DRY_RUN=1; return 0 ;;
            [cC]*)
                if command -v pbcopy >/dev/null 2>&1; then
                    printf '%s' "$eq_cmd" | pbcopy
                    echo "✅ Command copied to clipboard!"
                fi
                exit 0
                ;;
            *) return 0 ;;
        esac
    fi
}

if [ "${1:-}" = "--preview" ] && [ -n "${2:-}" ]; then
    preview_media_file "$2"
    exit 0
fi
