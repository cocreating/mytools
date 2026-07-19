# mytools

A macOS-first terminal toolbox for everyday media conversion and Finder bookmark work. Each command works directly in a shell; `mytools` adds a searchable `fzf` launcher.

## Install and check dependencies

```bash
git clone https://github.com/cocreating/mytools.git
cd mytools
./install.sh
mytools doctor
```

`mytools doctor --install` installs the optional Homebrew packages needed by all tools: `ffmpeg`, `webp`, `aubio`, `yt-dlp`, `fzf`, and `setweblocthumb`.

## Start here

```bash
mytools                 # interactive launcher
mytools help            # command overview
mytools doctor          # dependency and PATH check
mytools config          # create/show ~/.config/mytools/config
```

All conversion tools avoid overwriting an existing output by default. Use `--force` only when replacing it is intentional, and `--dry-run` to preview batch operations.
`mytools config` creates editable overrides for the built-in `media-optimize` presets; change `codec`, `crf`, or `width` within a named preset section.

## Media conversions

### Images: `img2webp`

```bash
img2webp photo.jpg
img2webp -q 80 --width 1200 photo.png
img2webp -R -j 4 -n ~/Pictures/ToPublish       # preview a recursive batch
img2webp -R -j 4 -o ./webp ~/Pictures/ToPublish
```

Supports JPEG, PNG, GIF, TIFF, HEIC/HEIF and WebP; quality, lossless mode, size limits, folders, parallel jobs and optional deletion of successfully converted originals.

### Video to WebM: `vid2webm`

```bash
vid2webm clip.mov
vid2webm -q 32 -w 1280 --from 00:00:10 --to 00:00:25 recording.mp4
vid2webm -o ./web -n *.mov
```

Uses VP9 video and Opus audio. Lower `--quality` values produce higher-quality/larger files.

### Video to GIF: `vid2gif`

```bash
vid2gif demo.mov
vid2gif -w 480 -r 10 --from 00:00:03 --to 00:00:08 demo.mp4
vid2gif -o ./gifs -f clip1.mp4 clip2.mp4
```

GIFs use palette generation for better quality and now support multiple videos.

### Extract or convert audio

```bash
vid2audio trailer.mov                       # WAV by default
vid2audio --format mp3 --bitrate 128 -o ./audio trailer.mov
wav2mp3 --bitrate 256 interview.wav
wav2mp3 -n -o ./mp3 *.wav                   # preview first
```

### Retime a WAV by BPM: `wav2tempo`

```bash
wav2tempo drum-loop.wav                       # detects BPM, then asks for a target
wav2tempo --target-bpm 128 drum-loop.wav
wav2tempo --bpm 92 -t 120 -o ./retimed song.wav
```

`wav2tempo` uses `aubio` to estimate the source BPM and FFmpeg’s pitch-preserving tempo filter to create a new WAV. Detection works best with a rhythmic loop or a track with a clear, steady beat. If detection is uncertain, use `--bpm` to enter the known source BPM yourself.

### Inspect and optimize media

```bash
media-info recording.mov song.m4a
media-optimize --preset web recording.mov
media-optimize --preset social -o ./social *.mov
media-optimize --preset archive --dry-run footage.mp4
```

`media-info` reports codecs, dimensions, duration, size, and bitrate. `media-optimize` writes a new MP4 using one of three presets:

- `web`: H.264, CRF 23, capped to 1080p
- `social`: H.264, CRF 25, capped to 720p
- `archive`: H.265, CRF 26, source dimensions

## Downloads: `ytdl`

```bash
ytdl 'https://example.com/video'
ytdl --format mp3 --output-dir ~/Music 'https://example.com/video'
ytdl --format mp4 --playlist --subtitles 'https://example.com/playlist'
```

If no URL is supplied, the command uses a URL in the clipboard or prompts for one. It defaults to a single item; pass `--playlist` explicitly to download a playlist.

## Finder bookmarks

```bash
thumloc ~/Downloads/Bookmarks
thumloc --force ~/Downloads/Bookmarks
webloc2md ~/Downloads/Bookmarks bookmarks.md
```

`thumloc` populates Finder thumbnails for `.webloc` files. `webloc2md` creates a grouped Markdown index of bookmark URLs.

## Finder Quick Actions

The `quick-actions/` directory includes ready-to-paste AppleScript templates for WebM, WebP, MP3, GIF, and audio extraction. Create a Finder Quick Action in Automator, set its input to the matching media type, add **Run AppleScript**, and paste the template. See [quick-actions/README.md](quick-actions/README.md).

## Shell completions

Installation links zsh completion definitions to `~/.zfunc`. Restart the terminal or run `source ~/.zshrc` after installation.
