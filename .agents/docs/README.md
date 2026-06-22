# mytools Agent Context

## Project Purpose

`mytools` is a personal macOS terminal toolkit for small media and Finder automation tasks. It provides direct shell commands plus an optional `fzf`-powered interactive launcher.

The main goals are:

- Keep each tool small and easy to run from the terminal.
- Support batch processing where practical.
- Provide zsh completions for common file types and options.
- Show macOS notifications after longer media conversions.
- Keep local project context in `.agents/docs` for future coding agents.

## Stack

- Shell scripts: Bash.
- Interactive picker: `fzf`.
- Image conversion: `cwebp` from WebP tools.
- Video/audio conversion: `ffmpeg`.
- macOS notifications: `osascript`.
- Finder thumbnail helper: `setweblocthumb` for `thumloc`.
- Shell completions: zsh completion files under `completions/`.

## Repository Layout

- `scripts/`: executable terminal tools.
- `completions/`: zsh completion definitions.
- `quick-actions/`: macOS Automator helper scripts.
- `install.sh`: installer that links/copies scripts and completions.
- `README.md`: user-facing setup and usage documentation.
- `.agents/docs/`: agent-facing project context and implementation notes.

## Tool Summary

- `mytools`: interactive launcher. Uses `fzf` when available. Includes a help entry and guided `img2webp` options.
- `img2webp`: converts images to WebP with optional quality and resize settings.
- `vid2webm`: converts MP4/MOV-style video files to WebM.
- `wav2mp3`: converts WAV files to MP3.
- `thumloc`: recursively adds Finder thumbnails to `.webloc` files.

## img2webp Behavior

Default:

```bash
img2webp photo.jpg
```

Quality:

```bash
img2webp -q 80 photo.jpg
img2webp --quality 80 photo.jpg
```

Resize width while preserving aspect ratio:

```bash
img2webp --width 1200 photo.jpg
img2webp -w 1200 photo.jpg
```

Resize height while preserving aspect ratio:

```bash
img2webp --height 800 photo.jpg
img2webp -H 800 photo.jpg
```

Resize to explicit dimensions:

```bash
img2webp --resize 1200x800 photo.jpg
img2webp -r 1200x800 photo.jpg
```

The script passes `-resize_mode down_only` to `cwebp` when resizing. This means resize options reduce larger images but do not upscale smaller images.

## Interactive Launcher Behavior

Run:

```bash
mytools
```

Print guided help without opening the picker:

```bash
mytools --help
mytools help
```

The main picker includes:

- `vid2webm`
- `wav2mp3`
- `img2webp`
- `thumloc`
- `help`

When `img2webp` is selected, the launcher shows a guided options menu before file selection:

- Default quality 85, no resize.
- Quality 80.
- Reduce width to 1200px.
- Reduce width to 1920px.
- Resize to 1200x800.
- Custom options.
- Show `img2webp --help`.

After options are selected, the launcher opens a multi-select `fzf` file picker and runs the selected tool on all chosen files.

File picker shortcuts:

- `Tab`: select or unselect one file.
- `Ctrl-A`: select all visible files.
- `Ctrl-D`: clear the current selection.
- `Enter`: confirm selected files.

## Conventions For Future Changes

- Keep scripts dependency-light and readable.
- Prefer extending existing command flags over adding new wrappers.
- Update the matching zsh completion file when adding command options.
- Update `README.md` for user-facing usage changes.
- Update `.agents/docs/README.md` when behavior, dependencies, or repo conventions change.
- Preserve the ability to run tools directly without the interactive launcher.
- Use `bash -n` on edited scripts before finishing.
