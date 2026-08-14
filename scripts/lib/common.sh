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
