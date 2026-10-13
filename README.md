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
mytools help            # categorized command overview
mytools help <tool>     # detailed guide for a specific tool (e.g. mytools help mp4glue)
mytools guide           # interactive help browser & cheat-sheets
mytools doctor          # dependency and PATH check
mytools config          # create/show ~/.config/mytools/config
```

All conversion tools avoid overwriting an existing output by default. Use `--force` only when replacing it is intentional, and `--dry-run` to preview batch operations.
`mytools config` creates editable overrides for the built-in `media-optimize` presets; change `codec`, `crf`, or `width` within a named preset section.

## Image tools

### Images: `img2webp`

```bash
img2webp -i                                    # interactive wizard
img2webp --width 1200 -q 90 -a                 # batch convert all images in current folder
img2webp -width 1200 -q 90 .                   # single-dash flags & directory scan supported
img2webp photo.jpg
img2webp -q 80 --width 1200 photo.png
img2webp -R -j 4 -n ~/Pictures/ToPublish       # preview a recursive batch
img2webp -R -j 4 -o ./webp ~/Pictures/ToPublish
```

Supports JPEG, PNG, GIF, TIFF, HEIC/HEIF and WebP; interactive wizard, quality, lossless mode, size limits, current folder and recursive batching, parallel jobs and optional deletion of successfully converted originals.

## Web downloads: `ytdl`

```bash
ytdl 'https://example.com/video'
ytdl --format mp3 --output-dir ~/Music 'https://example.com/video'
ytdl --format mp4 --playlist --subtitles 'https://example.com/playlist'
```

If no URL is supplied, the command uses a URL in the clipboard or prompts for one. It defaults to a single item; pass `--playlist` explicitly to download a playlist.

## Video tools

### Glue MP4 videos: `mp4glue`

```bash
mp4glue part1.mp4 part2.mp4
mp4glue -o combined.mp4 clip1.mp4 clip2.mp4 clip3.mp4
mp4glue --bounce video1.mp4 video2.mp4       # video1 forward, video2 reversed
mp4glue --bounce video.mp4                 # video forward + video reversed (bounce effect)
mp4glue --reencode -o merged.mp4 mixed1.mp4 mixed2.mov
```

Glues multiple video files into a single MP4 file. Uses fast stream copy (`-c copy`) by default, or `--reencode` to re-encode streams into standard H.264/AAC MP4 when source files have different resolutions or codecs. Pass `-b` / `--bounce` to play videos forward and reversed.

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

### Split a video from its audio: `videoWithoutAudio`

```bash
videoWithoutAudio interview.mp4
videoWithoutAudio --extract-audio -o ./separated recording.mov
videoWithoutAudio --dry-run *.mp4
```

By default, this creates only `<name>-without-audio.<ext>` and discards the original audio from the new copy. Add `--extract-audio` to also preserve every source stream as `<name>-audio-track-01.mka`, `<name>-audio-track-02.mka`, and so on. Preserved audio streams are copied without re-encoding; the original video is never changed.

### Optimize video: `media-optimize`

```bash
media-optimize --preset web recording.mov
media-optimize --preset social -o ./social *.mov
media-optimize --preset archive --dry-run footage.mp4
```

`media-optimize` writes a new MP4 using one of three presets:

- `web`: H.264, CRF 23, capped to 1080p
- `social`: H.264, CRF 25, capped to 720p
- `archive`: H.265, CRF 26, source dimensions

### Glitch & retro video FX: `vidglitch`

```bash
vidglitch -i                                       # interactive guided wizard
vidglitch clip.mp4                                 # RGB chromatic aberration (default)
vidglitch --preset vhs recording.mov               # analog VHS tape noise & vignette
vidglitch --preset cyberpunk --burst promo.mp4     # pulsing neon glitch & scanlines
vidglitch --preset 8bit -o ./glitched *.mp4        # retro pixelated look
vidglitch --rgb-split 16 --scanlines intro.mp4     # custom RGB shift & CRT scanlines
```

Applies customizable analog and digital glitch effects using FFmpeg. Built-in presets: `rgb-split`, `vhs`, `crt`, `8bit`, `cyberpunk`, `badsignal`, and `tear`. Pass `--burst` to pulse the glitch periodically instead of applying a static overlay.

### Cut film & jump cuts: `filmcut`

```bash
filmcut clip.mp4                                   # 20% random frame excision (default)
filmcut -p 35 recording.mov                        # 35% shorter video with jump cuts
filmcut -p 25 --mode jumps action.mp4              # 25% chunk jump cuts (~0.2s each)
filmcut -p 20 --jitter --grain vintage.mp4         # with projector jitter & film grain
filmcut -i                                         # interactive guided wizard
```

Erases a chosen percentage of random frames or micro-chunks from the timeline, producing a shorter video with authentic physical cut-film and jump-cut aesthetics. Audio is trimmed in lockstep to maintain perfect synchronization across all cuts.

## Audio tools

### Extract audio from video: `vid2audio`

```bash
vid2audio trailer.mov                       # WAV by default
vid2audio --format mp3 --bitrate 128 -o ./audio trailer.mov
```

Extracts crisp audio streams from video files into uncompressed WAV or MP3.

### Audio to MP3: `wav2mp3`

```bash
wav2mp3 interview.wav
wav2mp3 --bitrate 256 interview.wav
wav2mp3 -n -o ./mp3 *.wav                   # preview first
```

Converts heavy WAV audio into compact, high-quality MP3 files.

### Retime a WAV by BPM: `wav2tempo`

```bash
wav2tempo drum-loop.wav                       # detects BPM, then asks for a target
wav2tempo --target-bpm 128 drum-loop.wav
wav2tempo --bpm 92 -t 120 -o ./retimed song.wav
```

`wav2tempo` uses `aubio` to estimate the source BPM and FFmpeg’s pitch-preserving tempo filter to create a new WAV. Detection works best with a rhythmic loop or a track with a clear, steady beat. If detection is uncertain, use `--bpm` to enter the known source BPM yourself. Both period (`.`) and comma (`,`) decimal separators are supported regardless of system locale.

### Reverse a WAV: `wavreverse`

```bash
wavreverse riser.wav
wavreverse -o ./reversed *.wav
wavreverse --dry-run samples/*.wav
```

Creates a full, sample-accurate reverse of each WAV and writes `<name>-reversed.wav` without modifying the original.

### Shift pitch: `wavpitch`

```bash
wavpitch -s +2 vocal.wav                     # shift up 2 semitones
wavpitch --semitones -3 drumloop.wav         # shift down 3 semitones
wavpitch --varispeed -s -5 track.wav         # tape speed effect (pitch + playback speed)
```

`wavpitch` shifts WAV pitch by semitones while preserving tempo by default, or uses `--varispeed` to link pitch and speed for tape/vinyl drop effects.

### Normalize volume: `wavnorm`

```bash
wavnorm podcast.wav                          # default: -14 LUFS integrated loudness
wavnorm --lufs -16 interview.wav
wavnorm --peak 0 master.wav                  # peak normalize to 0 dBFS
```

`wavnorm` normalizes audio volume to standard EBU R128 integrated LUFS or sample-accurate peak dBFS levels.

### Fade in / fade out: `wavfade`

```bash
wavfade -i 0.1 -o 0.2 sample.wav             # 100ms fade-in, 200ms fade-out
wavfade --in 0.5 --out 1.0 synth-pad.wav
wavfade -i 0.2 -o 0.5 --curve qsin *.wav
```

`wavfade` applies smooth fade envelopes to eliminate clicks and pops at sample boundaries.

### Trim silence: `wavtrim`

```bash
wavtrim sample.wav                           # strip silence below -50dB
wavtrim --threshold -40dB vocal.wav
wavtrim --start-only kick.wav                # trim leading silence only
```

`wavtrim` automatically detects and crops leading and trailing silence from WAV recordings.

### Audio effects & EQ: `wavfx`

```bash
wavfx --reverb room loop.wav                 # room, hall, or space reverb
wavfx --delay 250 guitar.wav                 # echo delay in ms
wavfx --lowpass 800 synth-pad.wav            # warm low-pass filter
wavfx --highpass 150 --reverb hall vocal.wav # cut sub rumble + hall reverb
```

`wavfx` applies DSP audio effects including spatial reverb presets, echo delays, and low/high-pass filters.

## Media inspection

### Inspect media: `media-info`

```bash
media-info recording.mov song.m4a
```

`media-info` reports codecs, dimensions, duration, size, and bitrate.

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
