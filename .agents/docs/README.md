# mytools Agent Context

## Purpose and stack

`mytools` is a macOS-first collection of Bash commands for media conversion, media inspection, downloading, and `.webloc` Finder work. The project uses Bash 3.2-compatible syntax, `ffmpeg`/`ffprobe`, `cwebp`, `yt-dlp`, `fzf`, and `osascript` notifications.

## Commands

- `mytools`: interactive launcher displaying full command catalog without scrolling; subcommands `doctor`, `config`, `help`, and `guide`.
- `mytools-guide`: detailed and interactive command guide.
- `mytools-doctor`: checks optional dependencies; `--install` uses Homebrew.
- `mytools-config`: initializes and shows `~/.config/mytools/config`.
- Image tools:
  - `img2webp`: mature image batching/resizing/WebP command.
- Web Downloads:
  - `ytdl`: downloading video/audio from web URLs via yt-dlp.
- Video tools:
  - `vidglue`: concatenates compatible MP4 files with stream copy, optional re-encoding, or bounce mode.
  - `vid2webm`: safe VP9/Opus WebM conversion.
  - `vid2gif`: video to animated GIF conversion with palette generation.
  - `videoWithoutAudio`: creates an audio-less video copy, discarding audio by default; `--extract-audio` preserves every original stream as a separate lossless-copy `.mka` file.
  - `vidoptim`: Web/social/archive H.264/H.265 output presets.
  - `vidglitch`: glitch and retro video FX with RGB split, VHS, CRT, 8-bit, cyberpunk, badsignal, and tear presets.
  - `vidcuts`: cut film, rhythmic BPM beat cuts, freeze-cuts, and automatic vlog silence jump-cut generator (alias: `videocuts`).
  - `videoeffects`: cinematic color grading looks, speed/slow-motion ramps, reverse, optical bloom, tilt-shift, kaleidoscope mirrors & CinemaScope framing (alias: `vidfx`).
  - `videorandfram`: randomizes video frame order, temporal stutter, micro-jitter, and surreal time-warp loops (alias: `vidrandfram`).
- Audio tools:
  - `vid2audio`: extracts audio streams from video files (WAV / MP3).
  - `wav2mp3`: safe WAV to MP3 conversion.
  - `wav2tempo`: detects a single WAV’s BPM with `aubio` and pitch-preservingly retimes it with FFmpeg; accepts `--bpm` when detection is unavailable or unsuitable.
  - `wavreverse`: reverses one or more WAV files using FFmpeg’s `areverse` filter.
  - `wavpitch`: pitch shifts WAV files by semitones (pitch-only or tape varispeed).
  - `wavnorm`: normalizes WAV volume using EBU R128 LUFS or peak dBFS targets.
  - `wavfade`: applies customizable fade-in and fade-out volume envelopes.
  - `wavtrim`: strips leading and trailing silence using FFmpeg silence removal.
  - `wavfx`: applies DSP audio effects (reverb presets, delay, low/high pass filters).
- Inspection & Bookmarks:
  - `media-info`: FFprobe report for codec, resolution, bitrate, duration.
  - `thumloc`: generates Finder thumbnail previews for `.webloc` files.
  - `webloc2md`: creates a structured Markdown index of bookmark URLs.
- Website & Documentation:
  - `website/`: minimal, Bauhaus-brutalist and terminal web app showcasing the project and tools.
  - Interactive CLI emulator, visual Command Studio flag generator, DSP audio waveform canvas, video glitch simulator, and searchable catalog.
  - Deployed automatically to GitHub Pages (`https://cocreating.github.io/mytools/`) via `.github/workflows/pages.yml`.

## Conventions

- Direct command usage always remains supported; the launcher is convenience only.
- Shared helpers live in `scripts/lib/common.sh`.
- Add matching zsh completions and README examples for new command options.
- Never overwrite media output unless a command’s explicit `--force` is present.
- Run `bash -n scripts/* scripts/lib/common.sh install.sh` after changing shell files.
- Keep Quick Action templates in `quick-actions/` and avoid app-specific dependencies beyond macOS.
- Website assets use pure vanilla HTML/CSS/JS without external build steps or frameworks.

