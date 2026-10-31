# mytools

A macOS-first terminal toolbox for everyday media conversion and Finder bookmark work. Each command works directly in a shell; `mytools` adds a searchable `fzf` launcher.

🌐 **Interactive Documentation & Command Studio**: [cocreating.github.io/mytools](https://cocreating.github.io/mytools/)
*(Minimalist Bauhaus-brutalist terminal design, live CLI simulator, command builder & DSP visualizer)*

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
mytools                 # interactive fzf launcher (pick files + WAV/MP3 output)
mytools cs              # print the complete Short Code Sheet in terminal
mytools cs audio        # print only Audio / WAV & MP3 one-liners (also: video, image, recipes)
mytools guide           # interactive help browser, 1-click recipe copier & wizard launcher
mytools help            # categorized command overview
mytools help <tool>     # detailed guide & Short Code Sheet for a specific tool
mytools doctor          # dependency and PATH check
mytools config          # create/show ~/.config/mytools/config
```

All conversion tools avoid overwriting an existing output by default. Use `--force` only when replacing it is intentional, and `--dry-run` to preview batch operations.
`mytools config` creates editable overrides for the built-in `vidoptim` presets; change `codec`, `crf`, or `width` within a named preset section.

### Universal Flags & Audio Output Shortcuts

| Flag | Applies To | Description |
| :--- | :--- | :--- |
| `-i, --interactive` | Major video/image tools | Step-by-step interactive wizard + command generator |
| `-a, --all` | Batch media tools | Process all matching media files in current folder |
| `-o, --output-dir <dir>` | All media tools (`-d` on `wavfade`) | Save outputs into a dedicated folder |
| `-m, --mp3` | **All 7 `wav*` tools** | Output directly as **MP3** (`libmp3lame`) instead of WAV |
| `--format <wav\|mp3>` | **All 7 `wav*` tools** & `vid2audio` | Explicitly choose `wav` or `mp3` output format |
| `-b, --bitrate <kbps>` | **All 7 `wav*` tools**, `wav2mp3`, `vid2audio` | Set MP3 bitrate in kbps (default `192`, e.g. `-b 320`) |
| `-n, --dry-run` | All media tools | Preview exact output paths and FFmpeg settings safely |
| `-f, --force` | All media tools | Overwrite existing output files |

### ⚡ Quick Reference Short Code Sheet

| Goal / Workflow | One-Liner Command |
| :--- | :--- |
| **Cinematic Teal & Orange + 2.35:1 bars** | `videoeffects --preset cinema --letterbox 2.35 clip.mp4` |
| **Cyberpunk glitch + organic burst + audio FX** | `vidglitch --preset cyberpunk --organic-burst --audio-glitch clip.mp4` |
| **Auto-remove dead air / silent pauses** | `vidcuts --mode silence vlog.mp4` |
| **Freeze-hold jump cuts (preserves song sync)** | `vidcuts -p 20 --mode freeze --film-burn --super8 mv.mp4` |
| **Crossfade two videos (0.8s smooth fade)** | `vidglue -t fade -d 0.8 part1.mp4 part2.mp4` |
| **2x2 Split-Screen Video Grid** | `vidglue --layout 2x2 a.mp4 b.mp4 c.mp4 d.mp4` |
| **Normalize podcast to -16 LUFS MP3** | `wavnorm -m -l -16 podcast.wav` |
| **Retime drum loop to 128 BPM (320kbps MP3)** | `wav2tempo -t 128 -m -b 320 drumloop.wav` |
| **Shift vocal +3 semitones to MP3** | `wavpitch -s +3 -m vocal.wav` |
| **Strip leading/trailing silence to MP3** | `wavtrim -m --threshold -45dB recording.wav` |
| **De-pop sample edges (100ms in / 250ms out)** | `wavfade -i 0.1 -o 0.25 -m sample.wav` |
| **Concert hall reverb + 300ms delay to MP3** | `wavfx --reverb hall --delay 300 -m vocal.wav` |
| **Reverse audio to MP3** | `wavreverse -m cymbal.wav` |
| **Batch folder to WebP (q=82, max 1600px)** | `img2webp -a -q 82 --width 1600` |
| **Download clipboard URL as 320k MP3** | `ytdl --format mp3` |
| **Full Podcast Mastering Pipeline** | `vid2audio talk.mp4 && wavtrim talk.wav && wavnorm -m -b 320 -l -16 talk-trimmed.wav` |

### Step-by-Step: How to Use Any Tool with Custom Commands

> **Two key observations when running custom commands:**
> 1. **You don't need `mytools` in front of individual tool commands** — `mytools` is the interactive menu launcher, while each tool (`img2webp`, `vidglue`, `vid2webm`, `wav2mp3`, etc.) is run **directly by its own name** (though `mytools <tool> [options]` also forwards commands as a convenience).
> 2. **Watch the exact tool name** — for example, the image converter ends with a `p`: **`img2webp`** (not `img2web`).

1. **Step 1: Go to the folder where your files are**  
   In Terminal, move into the folder containing the images, videos, or audio you want to process *(Tip: type `cd ` with a space, drag-and-drop your folder from Finder into Terminal, and press Enter)*:
   ```bash
   cd ~/Pictures/MyPhotos
   ```
2. **Step 2: Run the tool directly with your custom flags**  
   Combine options before `-a` (all files in current folder) or before specific filenames:
   ```bash
   img2webp -a                                  # convert all images in current folder
   img2webp --width 1200 -q 90 -a               # resize to 1200px wide at 90% quality
   img2webp -q 80 photo.jpg                     # convert one specific file
   img2webp -q 90 -o ./webp-output -a           # save into a separate subfolder
   img2webp --width 1200 -q 90 -a -n            # test safely first (-n / --dry-run)
   ```
3. **Step 3: Use Interactive Wizard Mode (`-i`) to learn custom commands effortlessly**  
   If you don't want to memorize flags, run `img2webp -i`, `vidglue -i`, `vidglitch -i`, `vidcuts -i`, `videoeffects -i`, or `videorandfram -i`. It previews file metadata (`ffprobe`), walks you through every setting step by step, prints the exact **Equivalent command**, and lets you copy it directly to your macOS clipboard (`pbcopy`).

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

### Glue, crossfade & collage MP4 videos: `vidglue`

```bash
vidglue -i                                         # interactive guided wizard
vidglue part1.mp4 part2.mp4                        # fast lossless stream copy
vidglue -o combined.mp4 clip1.mp4 clip2.mp4 clip3.mp4
vidglue --bounce video.mp4                         # video forward + video reversed (bounce effect)
vidglue --bounce -l 3 video.mp4                    # bounce loop repeated 3x
vidglue --reencode --fit blur horiz.mp4 vert.mp4   # mix horizontal & vertical with blurred background
vidglue -t fade --transition-duration 0.8 a.mp4 b.mp4 # smooth crossfade transition
vidglue --layout hstack left.mp4 right.mp4         # side-by-side split-screen collage
```

Glues multiple video files into a single MP4 file. Uses fast stream copy (`-c copy`) by default, or `--reencode` to normalize mixed resolutions/aspect ratios (`--fit pad|crop|blur`) and automatically synthesize silent audio for muted clips. Supports crossfade transitions (`-t fade|fadeblack|wipeleft|pixelize|radial...`), spatial collages (`--layout hstack|vstack|2x2`), and Boomerang loops (`-b` / `--bounce` and `-l` / `--loop`).

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

### Optimize video: `vidoptim`

```bash
vidoptim --preset web recording.mov
vidoptim --preset social -o ./social *.mov
vidoptim --preset archive --dry-run footage.mp4
```

`vidoptim` writes a new MP4 using one of three presets:

- `web`: H.264, CRF 23, capped to 1080p
- `social`: H.264, CRF 25, capped to 720p
- `archive`: H.265, CRF 26, source dimensions

### Glitch & retro video/audio FX: `vidglitch`

```bash
vidglitch -i                                              # interactive guided wizard
vidglitch clip.mp4                                        # RGB chromatic aberration (default)
vidglitch --preset vhs --audio-glitch --osd recording.mov # VHS tape + tape flutter audio + camcorder HUD
vidglitch --preset cyberpunk --organic-burst promo.mp4    # erratic neon glitch & scanlines
vidglitch --preset datamosh -I high dance.mp4             # intense motion pixel smear & ghost trails
vidglitch --preset 8bit -A -o ./glitched *.mp4            # retro pixelated look + 8-bit chiptune audio
vidglitch --rgb-split 16 --scanlines intro.mp4            # custom RGB shift & CRT scanlines
```

Applies customizable analog and digital glitch effects using FFmpeg. Built-in presets: `rgb-split`, `vhs`, `crt`, `8bit`, `cyberpunk`, `badsignal`, `tear`, `datamosh`, `nightvision`, `gameboy`, and `matrix`. Supports intensity scaling (`-I low|med|high|1-100`), periodic (`--burst`) or erratic (`--organic-burst`) glitch triggers, camcorder viewfinder HUD (`--osd`), and synchronized audio corruption (`-A` / `--audio-glitch`).

### Cut film, BPM beat cuts & silence remover: `vidcuts`

```bash
vidcuts clip.mp4                                         # 20% random frame excision (default)
vidcuts -p 35 recording.mov                              # 35% shorter video with jump cuts
vidcuts -p 25 --mode jumps action.mp4                    # 25% chunk jump cuts (~0.2s each)
vidcuts -p 40 --mode freeze --film-burn musicvideo.mp4   # freeze-cuts keeping original duration & song intact
vidcuts --mode beat --bpm 128 --flash dance.mp4          # rhythmic cuts synced to 128 BPM
vidcuts --mode silence interview.mp4                     # auto-strip silent pauses (vlogger jump cuts)
vidcuts -p 20 --jitter --grain --scratches --super8 v.mp4 # full 16mm/Super-8 damaged film look
vidcuts -i                                               # interactive guided wizard
```

Erases a chosen percentage of random frames, rhythmic BPM beats, or silent dead-air pauses from the timeline. Supports timeline-shortening cuts (with audio trimmed in lockstep) or constant-duration `--mode freeze` cuts that hold frames so the original audio track remains untouched.

### Cinematic color grading, speed & optical FX: `videoeffects` (`vidfx`)

```bash
videoeffects -i                                           # interactive multi-effect wizard
videoeffects --preset cinema --letterbox 2.35 clip.mp4    # widescreen blockbuster teal & orange look
videoeffects --preset noir --vignette --fade-in 1 a.mp4   # high-contrast film noir opening
videoeffects --speed 0.5 --smooth-slowmo action.mp4       # silky 2x optical-flow slow motion
videoeffects --mirror quad --preset synthwave dance.mp4   # 4-way neon kaleidoscope
vidfx --reverse --bloom --trails 6 dream.mov              # reversed ethereal motion trails
```

The video counterpart to `wavfx`. Combines color grading presets (`cinema`, `noir`, `vintage`, `kodak`, `dream`, `synthwave`, `thermal`, `bleach`, `sepia`), temporal speed/reverse/stop-motion/trails, optical lens effects (`--bloom`, `--vignette`, `--tilt-shift`, `--blur`, `--sharpen`, `--mirror`, `--zoom`), and widescreen framing (`--letterbox`, `--fade-in`, `--fade-out`) in a single pass.

### Randomize frame order & temporal glitch: `videorandfram` (`vidrandfram`)

```bash
videorandfram clip.mp4                                         # 30-frame temporal shuffle
videorandfram -p jitter recording.mov                          # high-speed micro-jitter shutter
videorandfram -p stutter --fps 12 dance.mp4                    # stop-motion 12fps breakbeat stutter
videorandfram -p vortex --trails 5 --audio keep promo.mp4      # dreamlike surreal time warp + trails
videorandfram -p chaos -w 450 -s 42 visual.mp4                 # reproducible deep temporal explosion
videorandfram -p flicker --rgb-split 12 music.mp4              # kinetic 60fps frame alternation + chromatic shift
videorandfram -p burst --audio stutter action.mp4              # periodic frantic scramble bursts + choppy audio
videorandfram -i                                               # interactive guided wizard
```

Randomizes and scrambles video frame order in time to produce kinetic stutter, shutter tremor, stop-motion breakbeat skips, surreal time-warp loops, and full non-linear temporal chaos. Offers presets (`shuffle`, `jitter`, `stutter`, `vortex`, `chaos`, `flicker`, `reverse`, `burst`), customizable frame cache window (`-w 2-512`), random seeds for reproducibility (`-s`), motion ghosting trails (`--trails`), audio modulation (`--audio keep|mute|stutter|crush`), and analog visual extras (`--flash`, `--rgb-split`, `--grain`, `--super8`).

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

All WAV processing tools (`wav2tempo`, `wavreverse`, `wavpitch`, `wavnorm`, `wavfade`, `wavtrim`, `wavfx`) output uncompressed WAV by default, and also support `-m, --mp3` (or `--format mp3`) and `-b, --bitrate <kbps>` to output high-quality MP3 directly!

### Retime a WAV by BPM: `wav2tempo`

```bash
wav2tempo drum-loop.wav                       # detects BPM, then asks for a target
wav2tempo --target-bpm 128 drum-loop.wav
wav2tempo -m -t 128 drum-loop.wav             # retime and output directly to MP3
wav2tempo --bpm 92 -t 120 -o ./retimed song.wav
```

`wav2tempo` uses `aubio` to estimate the source BPM and FFmpeg’s pitch-preserving tempo filter to create a new WAV or MP3. Detection works best with a rhythmic loop or a track with a clear, steady beat. If detection is uncertain, use `--bpm` to enter the known source BPM yourself. Both period (`.`) and comma (`,`) decimal separators are supported regardless of system locale.

### Reverse a WAV: `wavreverse`

```bash
wavreverse riser.wav
wavreverse -m riser.wav                       # output reversed MP3
wavreverse -o ./reversed *.wav
wavreverse --dry-run samples/*.wav
```

Creates a full, sample-accurate reverse of each WAV and writes `<name>-reversed.wav` (or `<name>-reversed.mp3` with `-m/--mp3`) without modifying the original.

### Shift pitch: `wavpitch`

```bash
wavpitch -s +2 vocal.wav                     # shift up 2 semitones
wavpitch -m -s +2 vocal.wav                  # shift up 2 semitones to MP3
wavpitch --semitones -3 drumloop.wav         # shift down 3 semitones
wavpitch --varispeed -s -5 track.wav         # tape speed effect (pitch + playback speed)
```

`wavpitch` shifts WAV pitch by semitones while preserving tempo by default, or uses `--varispeed` to link pitch and speed for tape/vinyl drop effects.

### Normalize volume: `wavnorm`

```bash
wavnorm podcast.wav                          # default: -14 LUFS integrated loudness
wavnorm -m --lufs -16 podcast.wav            # normalize to -16 LUFS and save as MP3
wavnorm --lufs -16 interview.wav
wavnorm --peak 0 master.wav                  # peak normalize to 0 dBFS
```

`wavnorm` normalizes audio volume to standard EBU R128 integrated LUFS or sample-accurate peak dBFS levels.

### Fade in / fade out: `wavfade`

```bash
wavfade -i 0.1 -o 0.2 sample.wav             # 100ms fade-in, 200ms fade-out
wavfade -m -i 0.5 -o 1.0 synth-pad.wav       # smooth fade and output MP3
wavfade --in 0.5 --out 1.0 synth-pad.wav
wavfade -i 0.2 -o 0.5 --curve qsin *.wav
```

`wavfade` applies smooth fade envelopes to eliminate clicks and pops at sample boundaries.

### Trim silence: `wavtrim`

```bash
wavtrim sample.wav                           # strip silence below -50dB
wavtrim -m sample.wav                        # strip silence and save as MP3
wavtrim --threshold -40dB vocal.wav
wavtrim --start-only kick.wav                # trim leading silence only
```

`wavtrim` automatically detects and crops leading and trailing silence from WAV recordings.

### Audio effects & EQ: `wavfx`

```bash
wavfx --reverb room loop.wav                 # room, hall, or space reverb
wavfx -m --reverb hall vocal.wav             # hall reverb to MP3
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

## Interactive Website

The project includes an interactive web guide in `website/` designed in an ordered Bauhaus-brutalist and terminal aesthetic. It features:

- **Interactive Command Studio with Visual Reference Aids**: Tactile visual thumbnails and cards beside each effect preset (cinematic color grading, analog/digital glitch shaders, cut modes, video collages, and audio DSP curves), paired with a live visual reference deck displaying simulated output and exact FFmpeg filter graphs.
- **Visual indicators across the catalog & labs**: Bauhaus visual badges for all 27 CLI tools, plus interactive visual thumbnails on all Glitch Lab presets and Audio Waveform modes.
- **Live Terminal Simulator**: Interactive zsh simulator for testing `mytools` workflows and doctor healthchecks directly in the browser.
- **Visual Labs**: Real-time DSP audio waveform canvas and video glitch shader visualizer.
- **Searchable Technical Catalog**: Deep documentation covering all 27 commands with options, syntax signatures, and examples.
- **Color Themes**: Dark (Bauhaus Obsidian), Light (Gallery High-Contrast), and Amber phosphor CRT themes.

To run locally:

```bash
cd website
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

The site is automatically deployed to [GitHub Pages](https://cocreating.github.io/mytools/) via GitHub Actions (`.github/workflows/pages.yml`) on pushes to `main`.

## Finder Quick Actions

The `quick-actions/` directory includes ready-to-paste AppleScript templates for WebM, WebP, MP3, GIF, and audio extraction. Create a Finder Quick Action in Automator, set its input to the matching media type, add **Run AppleScript**, and paste the template. See [quick-actions/README.md](quick-actions/README.md).

## Shell completions

Installation links zsh completion definitions to `~/.zfunc`. Restart the terminal or run `source ~/.zshrc` after installation.
