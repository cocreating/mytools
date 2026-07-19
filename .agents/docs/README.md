# mytools Agent Context

## Purpose and stack

`mytools` is a macOS-first collection of Bash commands for media conversion, media inspection, downloading, and `.webloc` Finder work. The project uses Bash 3.2-compatible syntax, `ffmpeg`/`ffprobe`, `cwebp`, `yt-dlp`, `fzf`, and `osascript` notifications.

## Commands

- `mytools`: interactive launcher; subcommands `doctor`, `config`, and `help`.
- `mytools-doctor`: checks optional dependencies; `--install` uses Homebrew.
- `mytools-config`: initializes and shows `~/.config/mytools/config`.
- `img2webp`: mature image batching/resizing/WebP command.
- `vid2webm`, `vid2gif`, `vid2audio`, `wav2mp3`: safe media conversions with non-overwrite defaults, `--force`, `--dry-run`, and output-directory support.
- `wav2tempo`: detects a single WAV’s BPM with `aubio` and pitch-preservingly retimes it with FFmpeg; accepts `--bpm` when detection is unavailable or unsuitable.
- `media-info`: FFprobe report.
- `media-optimize`: Web/social/archive H.264/H.265 output presets.
- `ytdl`, `thumloc`, `webloc2md`: downloading and bookmark tools.

## Conventions

- Direct command usage always remains supported; the launcher is convenience only.
- Shared helpers live in `scripts/lib/common.sh`.
- Add matching zsh completions and README examples for new command options.
- Never overwrite media output unless a command’s explicit `--force` is present.
- Run `bash -n scripts/* scripts/lib/common.sh install.sh` after changing shell files.
- Keep Quick Action templates in `quick-actions/` and avoid app-specific dependencies beyond macOS.
