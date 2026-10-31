/**
 * MYTOOLS — Minimalist Bauhaus-Brutalist Terminal Engine
 * Pure Vanilla JavaScript: Interactive CLI simulator, Command Studio,
 * Real-time Audio Waveform canvas, Glitch Canvas & fzf-style search.
 */

// ============================================================================
// 1. Tool Catalog & Detailed Documentation Database
// ============================================================================
const TOOLS_DATA = [
  {
    id: "mytools",
    name: "mytools",
    category: "core",
    signature: "mytools [command]",
    summary: "The interactive terminal launcher powered by fzf with multi-file Tab selection, subcommands, and cheat-sheets.",
    flags: [
      { flag: "help [tool]", desc: "Print categorized overview or detailed tool guide" },
      { flag: "guide", desc: "Interactive fzf help browser and cheat-sheets" },
      { flag: "doctor", desc: "Check and auto-install required Homebrew dependencies" },
      { flag: "config", desc: "Show or initialize preset configuration in ~/.config/mytools/config" },
      { flag: "<tool> [options]", desc: "Convenience wrapper that forwards custom flags to <tool>" }
    ],
    examples: [
      { cmd: "mytools", note: "Launch interactive menu with automatic terminal height expansion" },
      { cmd: "mytools help img2webp", note: "View dedicated documentation for img2webp" },
      { cmd: "mytools doctor --install", note: "Automatically install all missing Homebrew tools" }
    ],
    details: "mytools serves as your primary interactive terminal cockpit. Note: You do NOT need to type 'mytools' in front of individual tool commands when using custom flags—each tool (img2webp, vidglue, vid2webm, wav2mp3, etc.) is a standalone command that runs directly by its own name (though 'mytools <tool> [options]' also forwards automatically). Within the interactive launcher, use arrow keys to navigate and press [Tab] to mark multiple files simultaneously before hitting [Enter]."
  },
  {
    id: "img2webp",
    name: "img2webp",
    category: "image",
    signature: "img2webp [options] [image... or dir]",
    summary: "High-performance batch image transcoder for JPEG, PNG, GIF, TIFF, and HEIC into modern WebP.",
    flags: [
      { flag: "-i, --interactive", desc: "Interactive setup wizard (walks through options & prints equivalent command)" },
      { flag: "-q, --quality <0-100>", desc: "Compression quality (default: 85)" },
      { flag: "-w, --width <px>", desc: "Downscale image to maximum width" },
      { flag: "-H, --height <px>", desc: "Downscale image to maximum height" },
      { flag: "-l, --lossless", desc: "Lossless WebP compression mode" },
      { flag: "-a, --all", desc: "Process all images in the current folder" },
      { flag: "-R, --recursive", desc: "Recurse through subdirectories" },
      { flag: "-j, --jobs <N>", desc: "Parallel conversion threads for multicore CPUs" },
      { flag: "-o, --output-dir <d>", desc: "Destination folder for converted images" },
      { flag: "-f, --force", desc: "Overwrite existing output files" },
      { flag: "-n, --dry-run", desc: "Preview conversion count without processing" }
    ],
    examples: [
      { cmd: "img2webp -i", note: "Interactive setup wizard (easiest way to learn custom commands)" },
      { cmd: "img2webp -a", note: "Batch convert all images in current folder (run directly, no 'mytools' prefix needed)" },
      { cmd: "img2webp --width 1200 -q 90 -a", note: "Batch convert all images in folder to 1200px at 90% quality" },
      { cmd: "img2webp -R -j 4 -o ./webp ~/Pictures/Wallpapers", note: "Recursive 4-job parallel conversion" },
      { cmd: "img2webp -l artwork.png", note: "Lossless crisp PNG conversion" }
    ],
    details: "Supports JPEG, PNG, GIF, TIFF, HEIC/HEIF, and WebP. Important: Run 'img2webp' directly by name (no 'mytools' prefix required, and note the 'p' at the end — 'img2webp', not 'img2web'). First 'cd' into your images folder, then run 'img2webp -a' or 'img2webp -i' for the interactive wizard. Never overwrites existing files without `--force`."
  },
  {
    id: "ytdl",
    name: "ytdl",
    category: "web",
    signature: "ytdl [options] [URL]",
    summary: "Effortless media downloader powered by yt-dlp with automatic clipboard URL detection.",
    flags: [
      { flag: "--format <mp4|mp3>", desc: "Target output format (default: mp4)" },
      { flag: "--output-dir <d>", desc: "Custom destination directory" },
      { flag: "--playlist", desc: "Download entire playlist instead of single video" },
      { flag: "--subtitles", desc: "Download and embed video subtitles" }
    ],
    examples: [
      { cmd: "ytdl", note: "Grabs URL automatically from macOS clipboard" },
      { cmd: "ytdl 'https://youtu.be/dQw4w9WgXcQ'", note: "Direct URL video download" },
      { cmd: "ytdl --format mp3 --output-dir ~/Music 'https://example.com/stream'", note: "Extract crystal clear audio to ~/Music" },
      { cmd: "ytdl --playlist --subtitles 'https://example.com/playlist'", note: "Download complete playlist with subtitles" }
    ],
    details: "If you omit the URL, ytdl automatically inspects pbpaste for a valid URL or gracefully prompts you. Downloads single items by default to prevent accidental multi-gigabyte playlist downloads."
  },
  {
    id: "vidglue",
    name: "vidglue",
    category: "video",
    signature: "vidglue [options] <video1> [video2...]",
    summary: "Fuses multiple videos with zero-reencoding stream copy, smart resolution/audio normalization, xfade transitions, split-screen collages, or Boomerang bounce loops.",
    flags: [
      { flag: "-i, --interactive", desc: "Interactive guided setup wizard" },
      { flag: "-b, --bounce", desc: "Play forward then reverse (Boomerang loop effect)" },
      { flag: "-r, --reencode", desc: "Auto-normalize mixed resolutions, FPS & missing audio streams" },
      { flag: "--fit <pad|crop|blur>", desc: "Aspect ratio fit for mixed dimensions (black bars, crop, or blurred fill)" },
      { flag: "-t, --transition <type>", desc: "Crossfade transition (fade, fadeblack, wipeleft, pixelize, radial...)" },
      { flag: "--layout <hstack|vstack|2x2>", desc: "Spatial split-screen or 2x2 quad collage" },
      { flag: "-l, --loop <N>", desc: "Repeat the final glued sequence N times" },
      { flag: "-o, --output <file>", desc: "Target MP4 filename" }
    ],
    examples: [
      { cmd: "vidglue intro.mp4 main.mp4 outro.mp4", note: "Lightning stream-copy merge (-c copy)" },
      { cmd: "vidglue --bounce -l 3 video.mp4", note: "Forward + reversed bounce loop repeated 3x" },
      { cmd: "vidglue --reencode --fit blur horiz.mp4 vert.mp4", note: "Mix horizontal & vertical clips with blurred background" },
      { cmd: "vidglue -t fade --transition-duration 0.8 a.mp4 b.mp4", note: "Smooth 0.8s crossfade transition" },
      { cmd: "vidglue --layout hstack left.mp4 right.mp4", note: "Side-by-side split-screen collage" }
    ],
    details: "By default, vidglue performs ultra-fast stream copy without losing quality. When inputs differ in codec, dimensions, or audio tracks, `--reencode`, `-t`, or `--layout` automatically normalizes resolution and synthesizes silent audio for muted clips."
  },
  {
    id: "vid2webm",
    name: "vid2webm",
    category: "video",
    signature: "vid2webm [options] <video...>",
    summary: "Converts video files to modern WebM container with VP9 video and Opus audio codecs.",
    flags: [
      { flag: "-q, --quality <0-63>", desc: "VP9 CRF quality (default: 30; lower is higher quality)" },
      { flag: "-w, --width <px>", desc: "Downscale video to target width" },
      { flag: "--from <time>", desc: "Start trim timestamp (HH:MM:SS or seconds)" },
      { flag: "--to <time>", desc: "End trim timestamp (HH:MM:SS or seconds)" },
      { flag: "-o, --output-dir <d>", desc: "Target directory" }
    ],
    examples: [
      { cmd: "vid2webm screen-recording.mov", note: "Convert QuickTime screen capture to web-ready WebM" },
      { cmd: "vid2webm -q 24 -w 1280 clip.mp4", note: "High-quality 720p WebM encoding" },
      { cmd: "vid2webm --from 00:00:15 --to 00:00:45 video.mp4", note: "Trim 30-second highlight directly" }
    ],
    details: "VP9 and Opus provide state-of-the-art compression efficiency for modern browsers, blogs, and documentation sites."
  },
  {
    id: "vid2gif",
    name: "vid2gif",
    category: "video",
    signature: "vid2gif [options] <video...>",
    summary: "Creates buttery-smooth animated GIFs with 2-pass custom color palette generation.",
    flags: [
      { flag: "-w, --width <px>", desc: "Maximum GIF width in pixels (default: 480)" },
      { flag: "-r, --fps <N>", desc: "Frames per second (default: 12)" },
      { flag: "--from <time>", desc: "Start time offset" },
      { flag: "--to <time>", desc: "End time offset" },
      { flag: "-o, --output-dir <d>", desc: "Output folder" }
    ],
    examples: [
      { cmd: "vid2gif screencast.mov", note: "Convert to crisp animated GIF" },
      { cmd: "vid2gif -w 600 -r 15 --from 00:00:03 --to 00:00:08 demo.mp4", note: "Smooth 15fps 5-second demo" },
      { cmd: "vid2gif -o ./gifs *.mov", note: "Batch convert all MOV files" }
    ],
    details: "Uses FFmpeg palettegen and paletteuse filters to generate an optimal 256-color palette specific to each video clip, avoiding standard dither banding."
  },
  {
    id: "videoWithoutAudio",
    name: "videoWithoutAudio",
    category: "video",
    signature: "videoWithoutAudio [options] <video...>",
    summary: "Creates an audio-less video copy; optionally preserves every source audio stream as lossless .mka files.",
    flags: [
      { flag: "--extract-audio", desc: "Preserve every audio track into <name>-audio-track-01.mka" },
      { flag: "-o, --output-dir <d>", desc: "Destination folder" },
      { flag: "-n, --dry-run", desc: "Preview operation without modifying disks" }
    ],
    examples: [
      { cmd: "videoWithoutAudio interview.mp4", note: "Outputs interview-without-audio.mp4" },
      { cmd: "videoWithoutAudio --extract-audio recording.mov", note: "Mutes video + extracts all audio streams" },
      { cmd: "videoWithoutAudio -o ./clean *.mp4", note: "Batch mute all MP4s into ./clean" }
    ],
    details: "Source files are never modified. Uses zero-loss stream copy (`-an -c:v copy` and `-vn -c:a copy`) for instantaneous processing."
  },
  {
    id: "vidoptim",
    name: "vidoptim",
    category: "video",
    signature: "vidoptim [options] <video...>",
    summary: "Re-encodes video for web, social media, or archival using customizable preset standards.",
    flags: [
      { flag: "-p, --preset <name>", desc: "Preset name: web | social | archive (default: web)" },
      { flag: "-o, --output-dir <d>", desc: "Target output folder" },
      { flag: "-f, --force", desc: "Overwrite existing target" },
      { flag: "-n, --dry-run", desc: "Preview preset configuration and paths" }
    ],
    examples: [
      { cmd: "vidoptim capture.mov", note: "Default 'web' preset: H.264, CRF 23, max 1080p" },
      { cmd: "vidoptim --preset social -o ./social promo.mov", note: "'social' preset: H.264, CRF 25, max 720p" },
      { cmd: "vidoptim --preset archive master.mp4", note: "'archive' preset: H.265 (HEVC), CRF 26, native resolution" }
    ],
    details: "Presets are fully user-customizable in `~/.config/mytools/config`. Override codec, CRF, or width per preset section."
  },
  {
    id: "vidglitch",
    name: "vidglitch",
    category: "video",
    signature: "vidglitch [options] <video...>",
    summary: "Applies 11 digital/analog visual & audio glitch presets: RGB split, VHS tracking, CRT, 8-bit, cyberpunk, datamosh, nightvision, gameboy & matrix.",
    flags: [
      { flag: "-p, --preset <name>", desc: "Preset: rgb-split | vhs | crt | 8bit | cyberpunk | badsignal | tear | datamosh | nightvision | gameboy | matrix" },
      { flag: "-I, --intensity <level>", desc: "Effect intensity: low, med, high, or 1-100" },
      { flag: "--organic-burst", desc: "Erratic, organic hardware fault bursts" },
      { flag: "-A, --audio-glitch", desc: "Synchronized audio bitcrushing / tape flutter corruption" },
      { flag: "--tracking", desc: "Add scrolling VHS tracking distortion bar" },
      { flag: "--osd", desc: "Add retro camcorder viewfinder HUD & blinking REC indicator" },
      { flag: "--burst", desc: "Periodic pulse every 2s" },
      { flag: "-i, --interactive", desc: "Guided preset selection wizard" }
    ],
    examples: [
      { cmd: "vidglitch clip.mp4", note: "Default RGB chromatic aberration" },
      { cmd: "vidglitch --preset vhs --audio-glitch --osd recording.mov", note: "VHS tape + tape flutter audio + camcorder HUD" },
      { cmd: "vidglitch --preset cyberpunk --organic-burst promo.mp4", note: "Erratic neon chromatic glitches" },
      { cmd: "vidglitch --preset datamosh -I high dance.mp4", note: "Intense motion pixel smear & ghost trails" }
    ],
    details: "Constructed using advanced FFmpeg video and audio filter graphs. Combine visual presets with `--audio-glitch` for synchronized bitcrushed 8-bit audio or analog VHS tape wow-and-flutter."
  },
  {
    id: "vidcuts",
    name: "vidcuts",
    category: "video",
    signature: "vidcuts [options] <video...>",
    summary: "Physical cut-film, BPM beat cutter, freeze-cut stop-motion, and automatic vlog silence jump-cut generator.",
    flags: [
      { flag: "-p, --percent <N>", desc: "Percentage of frames to remove (1-90, default: 20)" },
      { flag: "-m, --mode <mode>", desc: "Mode: frames | jumps | stutter | freeze (keeps duration) | beat (BPM sync) | silence (vlog auto-cut)" },
      { flag: "--bpm <N>", desc: "Target BPM for rhythmic '--mode beat' cuts" },
      { flag: "--film-burn", desc: "Warm orange/amber celluloid light-leak burn flashes" },
      { flag: "--scratches", desc: "Vertical 16mm film scratches" },
      { flag: "--super8", desc: "Dark Super-8 film gate border & vignette" },
      { flag: "--jitter / --grain / --flash", desc: "Projector gate weave, film grain & white splice flashes" },
      { flag: "-i, --interactive", desc: "Guided excision wizard" }
    ],
    examples: [
      { cmd: "vidcuts clip.mp4", note: "20% random missing celluloid frames" },
      { cmd: "vidcuts -p 40 --mode freeze --film-burn musicvideo.mp4", note: "Freeze-cuts keeping original duration & song intact" },
      { cmd: "vidcuts --mode beat --bpm 128 --flash dance.mp4", note: "Rhythmic cuts synced to 128 BPM" },
      { cmd: "vidcuts --mode silence interview.mp4", note: "Automatically strip silent dead-air pauses" }
    ],
    details: "Supports both timeline-shortening jump cuts (with audio trimmed in lockstep) and constant-duration `--mode freeze` cuts that hold frames so background music stays 100% continuous."
  },
  {
    id: "videoeffects",
    name: "videoeffects",
    category: "video",
    signature: "videoeffects [options] <video...>  (alias: vidfx)",
    summary: "Modular cinematic color grading, speed/slow-mo, reverse playback, optical bloom, tilt-shift, kaleidoscope mirrors & CinemaScope framing.",
    flags: [
      { flag: "-p, --preset <name>", desc: "Look: cinema | noir | vintage | kodak | dream | synthwave | thermal | bleach | sepia" },
      { flag: "--speed <0.25..4.0>", desc: "Playback speed multiplier with synced audio tempo" },
      { flag: "--smooth-slowmo", desc: "Optical-flow motion interpolation (minterpolate)" },
      { flag: "--reverse", desc: "Reverse video and audio streams backward in time" },
      { flag: "--stopmotion <fps>", desc: "Claymation / anime frame-step look (e.g. 8 or 12 fps)" },
      { flag: "--trails <1-10>", desc: "Motion ghosting / phosphor persistence trails" },
      { flag: "--bloom / --vignette / --tilt-shift", desc: "Soft highlight glow, optical vignette & miniature focus band" },
      { flag: "--mirror <h|v|quad>", desc: "Bilateral symmetry or 4-way kaleidoscope mirror" },
      { flag: "--zoom <in|out>", desc: "Smooth Ken Burns push-in or pull-out" },
      { flag: "--letterbox <2.35|1.85|4:3>", desc: "CinemaScope widescreen bars or 4:3 pillarbox" },
      { flag: "--fade-in / --fade-out <sec>", desc: "Smooth video & audio fade from/to black" }
    ],
    examples: [
      { cmd: "videoeffects --preset cinema --letterbox 2.35 clip.mp4", note: "Widescreen blockbuster teal & orange look" },
      { cmd: "videoeffects --speed 0.5 --smooth-slowmo action.mp4", note: "Silky 2x optical-flow slow motion" },
      { cmd: "videoeffects --mirror quad --preset synthwave dance.mp4", note: "4-way neon kaleidoscope" },
      { cmd: "vidfx --reverse --bloom --trails 6 dream.mov", note: "Reversed ethereal motion trails" }
    ],
    details: "The video counterpart to wavfx. Chain color presets, temporal speed ramps, lens optics, symmetry mirrors, and widescreen letterboxing in a single FFmpeg filtergraph."
  },
  {
    id: "videorandfram",
    name: "videorandfram",
    category: "video",
    signature: "videorandfram [options] <video...>  (alias: vidrandfram)",
    summary: "Randomize video frame order, scramble temporal sequences, stop-motion stutter, micro-jitter & surreal time-warp loops.",
    flags: [
      { flag: "-p, --preset <name>", desc: "Preset: shuffle | jitter | stutter | vortex | chaos | flicker | reverse | burst" },
      { flag: "-w, --window <N>", desc: "Frame cache window size (2 to 512 frames)" },
      { flag: "-s, --seed <int>", desc: "Deterministic random seed for reproducible cuts" },
      { flag: "--fps <N>", desc: "Target output frame rate (e.g. 12 or 15 for stop-motion)" },
      { flag: "--trails <1-10>", desc: "Motion ghosting trails between randomized frames" },
      { flag: "--audio <mode>", desc: "Audio mode: keep (default) | mute | stutter | crush" },
      { flag: "--rgb-split [px]", desc: "Chromatic aberration channel shift" },
      { flag: "--flash / --grain / --super8", desc: "White splice flashes, 16mm grain & vintage Super-8 frame" },
      { flag: "-i, --interactive", desc: "Interactive guided randomization wizard" }
    ],
    examples: [
      { cmd: "videorandfram clip.mp4", note: "30-frame temporal shuffle" },
      { cmd: "videorandfram -p jitter recording.mov", note: "High-speed micro-jitter shutter" },
      { cmd: "videorandfram -p stutter --fps 12 dance.mp4", note: "Stop-motion 12fps breakbeat stutter" },
      { cmd: "videorandfram -p vortex --trails 5 --audio keep promo.mp4", note: "Dreamlike surreal time warp + trails" },
      { cmd: "videorandfram -p burst --audio stutter action.mp4", note: "Periodic frantic scramble bursts + choppy audio" }
    ],
    details: "Leverages FFmpeg's frame-caching and permutation engines to reorder video frames non-linearly while maintaining smooth progressive playback timing or syncing audio modulation."
  },
  {
    id: "vid2audio",
    name: "vid2audio",
    category: "audio",
    signature: "vid2audio [options] <video...>",
    summary: "Extracts pristine audio streams out of video files into uncompressed WAV or bitrate-tailored MP3.",
    flags: [
      { flag: "--format <wav|mp3>", desc: "Audio container format (default: wav)" },
      { flag: "--bitrate <kbps>", desc: "Bitrate for MP3 encoding (e.g. 192, 256, 320)" },
      { flag: "-o, --output-dir <d>", desc: "Destination folder" }
    ],
    examples: [
      { cmd: "vid2audio trailer.mov", note: "Extracts trailer.wav (PCM 16-bit uncompressed)" },
      { cmd: "vid2audio --format mp3 --bitrate 256 recording.mp4", note: "256kbps high quality MP3" },
      { cmd: "vid2audio -o ./tracks *.mp4", note: "Batch extract all videos in folder" }
    ],
    details: "WAV mode preserves exact original audio fidelity for DAW editing, while MP3 creates lightweight shares."
  },
  {
    id: "wav2mp3",
    name: "wav2mp3",
    category: "audio",
    signature: "wav2mp3 [options] <wav...>",
    summary: "Converts heavy uncompressed WAV audio into compact, high-quality MP3 files.",
    flags: [
      { flag: "--bitrate <kbps>", desc: "Audio bitrate in kbps (default: 192)" },
      { flag: "-o, --output-dir <d>", desc: "Output directory" },
      { flag: "-n, --dry-run", desc: "Preview files to be converted" }
    ],
    examples: [
      { cmd: "wav2mp3 master.wav", note: "Standard 192kbps MP3 conversion" },
      { cmd: "wav2mp3 --bitrate 320 album-track.wav", note: "Maximum fidelity 320kbps MP3" },
      { cmd: "wav2mp3 -o ./mp3 *.wav", note: "Batch convert folder into ./mp3" }
    ],
    details: "Powered by libmp3lame with optimal VBR/CBR handling. Never touches source WAV files."
  },
  {
    id: "wav2tempo",
    name: "wav2tempo",
    category: "audio",
    signature: "wav2tempo [options] <wav...>",
    summary: "Detects audio BPM using aubio and retimes tempo pitch-preservingly via FFmpeg rubberband/atempo.",
    flags: [
      { flag: "--target-bpm <BPM>", desc: "Desired target tempo in BPM" },
      { flag: "--bpm <sourceBPM>", desc: "Manually specify source BPM if aubio detection is ambiguous" },
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" },
      { flag: "-o, --output-dir <d>", desc: "Output folder" }
    ],
    examples: [
      { cmd: "wav2tempo drum-loop.wav", note: "Detects current BPM, then prompts for target" },
      { cmd: "wav2tempo --target-bpm 128 loop.wav", note: "Retime detected loop directly to 128 BPM" },
      { cmd: "wav2tempo --bpm 90 -t 120 sample.wav", note: "Explicit source and target tempo retiming" }
    ],
    details: "Uses aubio track tempo estimation. Retimes audio while keeping musical pitch 100% intact. Handles decimal tempos (e.g. 124.5 BPM) and both comma and dot locales."
  },
  {
    id: "wavreverse",
    name: "wavreverse",
    category: "audio",
    signature: "wavreverse [options] <wav...>",
    summary: "Creates a sample-accurate backwards reverse of each WAV file.",
    flags: [
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" },
      { flag: "-o, --output-dir <d>", desc: "Output directory" },
      { flag: "-n, --dry-run", desc: "Preview output paths" }
    ],
    examples: [
      { cmd: "wavreverse riser.wav", note: "Creates riser-reversed.wav" },
      { cmd: "wavreverse -o ./reversed cymbal.wav snare.wav", note: "Batch reverse drum samples" }
    ],
    details: "Uses FFmpeg's `areverse` filter. Essential for sound designers crafting build-ups, swells, and backward vocal effects."
  },
  {
    id: "wavpitch",
    name: "wavpitch",
    category: "audio",
    signature: "wavpitch [options] <wav...>",
    summary: "Shifts WAV pitch by musical semitones (pitch-only with tempo locked, or tape-style varispeed).",
    flags: [
      { flag: "-s, --semitones <N>", desc: "Semitone offset: positive (+2) or negative (-3)" },
      { flag: "--varispeed", desc: "Link pitch and playback speed (tape/vinyl speed drop effect)" },
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" },
      { flag: "-o, --output-dir <d>", desc: "Output directory" }
    ],
    examples: [
      { cmd: "wavpitch -s +2 vocal.wav", note: "Shift vocal up 2 semitones without changing duration" },
      { cmd: "wavpitch --semitones -3 synth.wav", note: "Shift down 3 semitones (darker timbre)" },
      { cmd: "wavpitch --varispeed -s -5 drop.wav", note: "Classic slow tape/turntable slowdown" }
    ],
    details: "By default, preserves playback length and BPM using FFmpeg's rubberband/asetrate filters. With `--varispeed`, simulates analog pitch-speed linkage."
  },
  {
    id: "wavnorm",
    name: "wavnorm",
    category: "audio",
    signature: "wavnorm [options] <wav...>",
    summary: "Normalizes WAV audio loudness to industry EBU R128 LUFS or sample-accurate peak dBFS levels.",
    flags: [
      { flag: "--lufs <n>", desc: "Integrated loudness target in LUFS (default: -14)" },
      { flag: "--peak <dB>", desc: "Peak volume normalization in dBFS (e.g. 0 or -1)" },
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" },
      { flag: "-o, --output-dir <d>", desc: "Output directory" }
    ],
    examples: [
      { cmd: "wavnorm podcast.wav", note: "Broadcast standard -14 LUFS loudness normalization" },
      { cmd: "wavnorm --lufs -16 interview.wav", note: "Apple Podcasts / YouTube target (-16 LUFS)" },
      { cmd: "wavnorm --peak 0 master.wav", note: "Sample peak normalize to 0 dBFS ceiling" }
    ],
    details: "Uses FFmpeg's `loudnorm` filter (dual-pass EBU R128 algorithm). Eliminates sudden volume jumps across podcast episodes or audio samples."
  },
  {
    id: "wavfade",
    name: "wavfade",
    category: "audio",
    signature: "wavfade [options] <wav...>",
    summary: "Applies smooth fade-in and fade-out volume envelopes to eliminate clicks and pops at sample boundaries.",
    flags: [
      { flag: "-i, --in <sec>", desc: "Fade-in duration in seconds (e.g. 0.1 for 100ms)" },
      { flag: "-o, --out <sec>", desc: "Fade-out duration in seconds" },
      { flag: "--curve <type>", desc: "Fade curve: qsin (quarter sine) | tri | esin | log | hsin" },
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" }
    ],
    examples: [
      { cmd: "wavfade -i 0.1 -o 0.2 sample.wav", note: "100ms fade-in, 200ms fade-out" },
      { cmd: "wavfade --in 0.5 --out 1.0 synth-pad.wav", note: "Smooth musical ambient envelope" },
      { cmd: "wavfade -i 0.05 -o 0.05 --curve qsin *.wav", note: "Batch click-free de-popping" }
    ],
    details: "Automates the tedious task of trimming zero-crossings and fading sample clips. Calculates exact sample duration to apply the tail fade accurately."
  },
  {
    id: "wavtrim",
    name: "wavtrim",
    category: "audio",
    signature: "wavtrim [options] <wav...>",
    summary: "Automatically detects and crops leading and trailing silence below a decibel threshold.",
    flags: [
      { flag: "--threshold <dB>", desc: "Silence threshold in decibels (default: -50dB)" },
      { flag: "--start-only", desc: "Strip leading silence only, keep trailing tail" },
      { flag: "--end-only", desc: "Strip trailing silence only" },
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" }
    ],
    examples: [
      { cmd: "wavtrim vocal-take.wav", note: "Strip dead air before and after recording" },
      { cmd: "wavtrim --threshold -40dB drum.wav", note: "Aggressive silence crop for punchy transients" },
      { cmd: "wavtrim --start-only kick.wav", note: "Immediate attack transient at time 0" }
    ],
    details: "Utilizes FFmpeg's `silenceremove` filter. Guarantees tight sample starts without manual zoom-in editing in a DAW."
  },
  {
    id: "wavfx",
    name: "wavfx",
    category: "audio",
    signature: "wavfx [options] <wav...>",
    summary: "Applies studio DSP audio effects: room/hall/space reverb presets, echo delays, and low/high-pass EQ filters.",
    flags: [
      { flag: "--reverb <room|hall|space>", desc: "Spatial reverberation preset" },
      { flag: "--delay <ms>", desc: "Echo feedback delay in milliseconds (e.g. 250)" },
      { flag: "--lowpass <Hz>", desc: "Low-pass filter cutoff frequency (e.g. 800)" },
      { flag: "--highpass <Hz>", desc: "High-pass filter cutoff frequency (e.g. 150)" },
      { flag: "-m, --mp3", desc: "Output as MP3 instead of WAV (supports -b <kbps>)" }
    ],
    examples: [
      { cmd: "wavfx --reverb room loop.wav", note: "Warm studio room ambiance" },
      { cmd: "wavfx --delay 250 --reverb hall guitar.wav", note: "250ms echo delay + majestic hall reverb" },
      { cmd: "wavfx --lowpass 700 synth.wav", note: "Lo-fi underwater muffled aesthetic" },
      { cmd: "wavfx --highpass 150 vocal.wav", note: "Cut microphone rumble below 150 Hz" }
    ],
    details: "Combines FFmpeg's `aecho`, `aresample`, and `equalizer` modules to provide quick sonic sculpting right from the terminal."
  },
  {
    id: "media-info",
    name: "media-info",
    category: "inspect",
    signature: "media-info <file...>",
    summary: "Instant FFprobe technical inspection report: video/audio codecs, resolution, bitrate, duration, and file size.",
    flags: [
      { flag: "<file...>", desc: "One or more audio or video files to inspect" }
    ],
    examples: [
      { cmd: "media-info interview.mp4 song.m4a", note: "Detailed codec and container breakdown" },
      { cmd: "media-info *.mov", note: "Batch inspect all video files in directory" }
    ],
    details: "Provides clean human-readable summaries without the verbose spam of raw FFprobe. Checks video streams, color space, fps, audio samplerates, and bit depths."
  },
  {
    id: "thumloc",
    name: "thumloc",
    category: "finder",
    signature: "thumloc [options] <directory>",
    summary: "Generates native Finder thumbnail previews for macOS .webloc URL bookmark files using setWeblocThumb.",
    flags: [
      { flag: "-f, --force", desc: "Regenerate thumbnails even if already cached" },
      { flag: "<directory>", desc: "Path containing .webloc files" }
    ],
    examples: [
      { cmd: "thumloc ~/Downloads/Bookmarks", note: "Generates website preview icons in Finder" },
      { cmd: "thumloc --force ~/Desktop/Links", note: "Force refresh all bookmark icons" }
    ],
    details: "Turns blank generic macOS safari bookmark icons into live webpage screenshots visible directly in Finder icon and gallery views."
  },
  {
    id: "webloc2md",
    name: "webloc2md",
    category: "finder",
    signature: "webloc2md <directory> [output.md]",
    summary: "Scans a folder of .webloc bookmarks and compiles an organized, readable Markdown link index.",
    flags: [
      { flag: "<directory>", desc: "Source folder containing .webloc files" },
      { flag: "[output.md]", desc: "Destination markdown file (default: bookmarks.md)" }
    ],
    examples: [
      { cmd: "webloc2md ~/Downloads/Bookmarks", note: "Compiles bookmarks.md in current directory" },
      { cmd: "webloc2md ~/Projects/Research research-links.md", note: "Export research links to custom markdown file" }
    ],
    details: "Extracts URLs directly from Apple plist XML binary structures and parses clean page titles, outputting GitHub-ready markdown lists."
  },
  {
    id: "guide",
    name: "mytools guide",
    category: "core",
    signature: "mytools guide [--interactive]",
    summary: "Interactive terminal guide browser with cheat-sheets, pro tips, and preview window.",
    flags: [
      { flag: "-i, --interactive", desc: "Launch interactive fzf guide browser with live preview" },
      { flag: "<tool>", desc: "Display full manual page for specific tool (e.g. mytools guide vidcuts)" }
    ],
    examples: [
      { cmd: "mytools guide", note: "Interactive cheat-sheet browser with live right-hand preview" },
      { cmd: "mytools help vidglitch", note: "Display command synopsis and preset options" }
    ],
    details: "Interactive documentation system built with fzf. Supports fuzzy search across all tools, instant syntax references, and terminal tips."
  },
  {
    id: "doctor",
    name: "mytools doctor",
    category: "core",
    signature: "mytools doctor [--install]",
    summary: "Performs full diagnostic checks on PATH, Homebrew, and all optional dependencies with 1-step remediation.",
    flags: [
      { flag: "--install", desc: "Automatically installs all missing packages via brew install" }
    ],
    examples: [
      { cmd: "mytools doctor", note: "Check presence of ffmpeg, cwebp, aubio, yt-dlp, fzf, setweblocthumb" },
      { cmd: "mytools doctor --install", note: "Auto-prescribe and install all missing dependencies" }
    ],
    details: "Diagnostic tool that inspects binaries and their absolute executable paths. Safe to run anytime."
  },
  {
    id: "config",
    name: "mytools config",
    category: "core",
    signature: "mytools config [--init|--path|--list]",
    summary: "Manages user configuration and customizable vidoptim quality presets in ~/.config/mytools/config.",
    flags: [
      { flag: "--path", desc: "Print absolute path to configuration file" },
      { flag: "--init", desc: "Initialize default configuration file if missing" },
      { flag: "--list", desc: "Print all active configuration sections" }
    ],
    examples: [
      { cmd: "mytools config", note: "Display current config settings and presets" },
      { cmd: "mytools config --path", note: "Outputs ~/.config/mytools/config for editing in nano/vim" }
    ],
    details: "Stores default quality, parallel job defaults, and preset overrides for `web`, `social`, and `archive` video encoding profiles."
  }
];

// ============================================================================
// 2. Interactive Terminal Simulator Engine
// ============================================================================
class TerminalSimulator {
  constructor(containerId, inputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    if (!this.input || !this.container) return;

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.execute(cmd);
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
      } else if (e.key === "ArrowUp") {
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
        e.preventDefault();
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autocomplete();
      }
    });

    // Initial greeting
    this.appendLine("mytools v2.5 (macOS terminal toolbox — 27 tools)", "color: var(--text-muted-on-terminal);");
    this.appendLine("Type 'help', 'mytools', or 'videoeffects -i' to test. Click any chip below for quick demo.", "color: var(--color-terminal-green);");
  }

  autocomplete() {
    const val = this.input.value.trim();
    if (!val) return;
    const candidates = TOOLS_DATA.map(t => t.name).concat(["vidfx", "videoglue", "videoglitch", "videocuts", "help", "clear", "doctor", "config", "guide"]);
    const match = candidates.find(c => c.startsWith(val));
    if (match) {
      this.input.value = match;
    }
  }

  appendLine(text, style = "") {
    const line = document.createElement("div");
    line.className = "terminal-log";
    if (style) line.setAttribute("style", style);
    line.textContent = text;
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  execute(cmdText) {
    // Print the command line
    this.appendLine(`❯ ${cmdText}`, "color: var(--text-on-terminal); font-weight: 600;");

    const parts = cmdText.split(/\s+/);
    const main = parts[0];
    const sub = parts[1];

    if (cmdText === "clear") {
      this.container.innerHTML = "";
      return;
    }

    if (cmdText === "help") {
      this.appendLine(`Available commands:
  mytools         - Interactive fzf media launcher with live preview
  mytools cs      - Short Code Sheets & one-liner recipes (all|video|audio|image|recipes)
  mytools guide   - Interactive help browser, recipe copier & wizard launcher
  mytools doctor  - Dependency diagnostic health check
  mytools config  - View/edit presets (~/.config/mytools/config)
  img2webp        - Batch image to WebP converter (supports -i wizard)
  vidglue         - Glue, crossfade (-t), collage (--layout) or --bounce (alias: videoglue)
  vidglitch       - 11 analog/digital visual & audio glitch presets (alias: videoglitch)
  vidcuts         - Frame, BPM beat, freeze & silence jump-cut generator (alias: videocuts)
  videoeffects    - Cinematic color grading, speed, optics & mirrors (alias: vidfx)
  videorandfram   - Randomize frame order & temporal glitch (alias: vidrandfram)
  wav2tempo       - Aubio BPM retiming (supports -m / --mp3 output)
  wavreverse      - Reverse audio playback (supports -m / --mp3 output)
  wavnorm         - EBU R128 LUFS volume normalizer (supports -m / --mp3 output)
  wavpitch        - Pitch shifter & varispeed tape drop (supports -m / --mp3 output)
  wavfade         - De-popping fade-in/out envelopes (supports -m / --mp3 output)
  wavtrim         - Automatic silence cropper (supports -m / --mp3 output)
  wavfx           - DSP reverb, delay, EQ filters (supports -m / --mp3 output)
  ytdl            - Video/audio clipboard grabber
  media-info      - Quick FFprobe inspector
  thumloc         - Finder .webloc thumbnailer
  theme [dark|light|amber] - Switch terminal theme`, "color: var(--text-code-on-terminal);");
      return;
    }

    if (cmdText.startsWith("mytools cs") || cmdText.startsWith("mytools cheatsheet") || cmdText === "cheatsheet" || cmdText === "cs") {
      this.appendLine(`⚡ MYTOOLS — SHORT CODE SHEETS & ONE-LINER RECIPES
────────────────────────────────────────────────────────────────────────
Universal Flags:  -i (Wizard)  -n (Dry-Run)  -f (Force)  -d DIR (Out Dir)
WAV/MP3 Flags:    -m, --mp3    --format mp3  -b 320 (Bitrate kbps)
────────────────────────────────────────────────────────────────────────
🎬 VIDEO
  videoeffects --preset cinema --letterbox 2.35 clip.mp4
  vidglitch --preset cyberpunk --organic-burst --audio-glitch clip.mp4
  vidcuts --mode silence clip.mp4
  vidglue -t fade -d 0.8 part1.mp4 part2.mp4
🎵 AUDIO (WAV & MP3)
  wavnorm -m -l -16 podcast.wav             # Podcast LUFS -> MP3
  wav2tempo -t 128 -m -b 320 drumloop.wav   # BPM sync -> 320k MP3
  wavtrim -m --threshold -45dB voice.wav    # Trim silence -> MP3
  wavfx --reverb hall --delay 300 -m vox.wav # Hall reverb -> MP3
🖼️ IMAGE & WEB
  img2webp -a -q 82 --width 1600            # Folder to WebP
  ytdl --format mp3                         # Clipboard URL -> MP3
────────────────────────────────────────────────────────────────────────
💡 Scroll down to the Short Code Sheets section for 1-click copy!`, "color: var(--color-terminal-green);");
      return;
    }

    if (main === "theme" && sub) {
      if (["dark", "light", "amber"].includes(sub)) {
        setTheme(sub);
        this.appendLine(`✅ Theme switched to: ${sub}`, "color: var(--color-terminal-green);");
      } else {
        this.appendLine(`Unknown theme. Choose: dark, light, or amber.`, "color: var(--color-bauhaus-red);");
      }
      return;
    }

    if (cmdText === "mytools" || cmdText === "mytools guide") {
      this.appendLine(`🧰 MYTOOLS LAUNCHER (fzf simulated + live right-hand preview)
────────────────────────────────────────────────────────
 > videoeffects      🎬 Cinematic color grading, speed & optical FX (vidfx)
   vidglue           🎞️ Glue, crossfade & collage MP4 videos (videoglue)
   vidglitch         ⚡ Glitch, VHS & retro visual/audio FX (videoglitch)
   vidcuts           ✂️ Cut film, BPM beat cuts & silence remover (videocuts)
   videorandfram     🎲 Randomize frame order & temporal glitch (vidrandfram)
   img2webp          📸 Image to WebP batch transcoder
   vid2webm          🌐 Video to VP9 WebM
   vid2gif           👾 Video to palette-optimized GIF
   vid2audio         🔊 Extract audio to WAV / MP3
   wav2tempo         🥁 Retime WAV by BPM (aubio)
   wavnorm           🎚️ EBU R128 LUFS normalizer
   wavpitch          🎼 Semitone pitch shifter
   wavfade           📈 De-popping fade envelopes
   wavtrim           ✂️ Strip leading/trailing silence
   wavfx             🎛️ Audio DSP effects & EQ
   ytdl              📥 Download web media (yt-dlp)
   media-info        🕵️ FFprobe metadata inspector
   thumloc           🖼️ Finder .webloc thumbnails
────────────────────────────────────────────────────────
💡 Pro Tip: Press [Tab] to mark multiple files with live ffprobe preview!`, "color: var(--text-accent-on-terminal);");
      return;
    }

    if (cmdText === "mytools doctor" || cmdText === "doctor") {
      this.appendLine(`🩺 mytools doctor
  ✅ ffmpeg          /opt/homebrew/bin/ffmpeg
  ✅ cwebp           /opt/homebrew/bin/cwebp
  ✅ aubio           /opt/homebrew/bin/aubio
  ✅ yt-dlp          /opt/homebrew/bin/yt-dlp
  ✅ fzf             /opt/homebrew/bin/fzf
  ✅ setWeblocThumb  /opt/homebrew/bin/setWeblocThumb

Everything needed by the installed commands is available.
Ready for production media workflows! 🚀`, "color: var(--color-terminal-green);");
      return;
    }

    // Handle 'help <tool>', 'mytools help <tool>', or '<tool> --help' / '-h'
    let helpTarget = "";
    if (main === "help" && sub) helpTarget = sub;
    else if (main === "mytools" && (sub === "help" || sub === "guide") && parts[2]) helpTarget = parts[2];
    else if (parts.includes("--help") || parts.includes("-h")) helpTarget = (main === "mytools" && sub) ? sub : main;

    if (helpTarget) {
      const targetTool = TOOLS_DATA.find(t => t.id === helpTarget || t.name === helpTarget);
      if (targetTool) {
        const flagsText = (targetTool.flags || []).map(f => `  ${f.flag.padEnd(28)} ${f.desc}`).join("\n");
        const exText = (targetTool.examples || []).map(e => `  ${e.cmd}   # ${e.note}`).join("\n");
        this.appendLine(`📖 ${targetTool.name} — ${targetTool.summary}
Usage:
  ${targetTool.signature}

Description:
  ${targetTool.details}

Flags & Options:
${flagsText}

Short Code Sheet:
${exText}
💡 Highlight any text above to copy-paste (⌘C) or click COPY in the terminal header!`, "color: var(--text-code-on-terminal);");
        return;
      }
    }

    // Handle 'mytools <tool> ...' or 'img2web' typo with helpful hints
    let effectiveCmd = cmdText;
    if (main === "mytools" && sub && sub !== "help" && sub !== "config") {
      const rest = parts.slice(1).join(" ");
      if (sub === "img2web") {
        const fixedRest = ["img2webp", ...parts.slice(2)].join(" ");
        this.appendLine(`💡 Note: The image tool ends with a 'p' ('img2webp'), and each tool runs directly without 'mytools' in front: ${fixedRest}`, "color: var(--color-bauhaus-yellow);");
        effectiveCmd = fixedRest;
      } else {
        this.appendLine(`💡 Tip: Each tool is a standalone command — you can run '${rest}' directly without 'mytools' in front!`, "color: var(--color-bauhaus-yellow);");
        effectiveCmd = rest;
      }
    } else if (main === "img2web") {
      effectiveCmd = ["img2webp", ...parts.slice(1)].join(" ");
      this.appendLine(`💡 Note: The image tool ends with a 'p' — running '${effectiveCmd}'`, "color: var(--color-bauhaus-yellow);");
    }

    if ( effectiveCmd.startsWith("videoeffects") || effectiveCmd.startsWith("vidfx") ) {
      this.appendLine(`🎬 [videoeffects] Building cinematic filtergraph...
  - Input: clip.mp4 (1920x1080 @ 30fps)
  - Active pipeline: preset=cinema + letterbox=2.35 + bloom
  - Progress: [====================] 100%
  ✅ Output saved: clip-cinema.mp4
  ✨ Cinematic grade and optics applied!`, "color: var(--color-bauhaus-yellow);");
      return;
    }

    if ( effectiveCmd.startsWith("videorandfram") || effectiveCmd.startsWith("vidrandfram") ) {
      this.appendLine(`🎲 [videorandfram] Shuffling frame order timeline...
  - Input: clip.mp4 (1920x1080 @ 30fps)
  - Active pipeline: preset=shuffle (window=30) + trails=3
  - Progress: [====================] 100%
  ✅ Output saved: clip-randfram.mp4
  ⚡ Temporal frame randomization complete!`, "color: var(--color-bauhaus-yellow);");
      return;
    }

    if (effectiveCmd.startsWith("vidcuts") || effectiveCmd.startsWith("videocuts")) {
      this.appendLine(`✂️ [vidcuts] Processing timeline cuts...
  - Input: clip.mp4 (1920x1080 @ 30fps, stereo audio)
  - Mode: freeze-hold + film-burn + Super-8 gate
  - Progress: [====================] 100%
  ✅ Output saved: clip-freezecut20.mp4
  🎞️ Celluloid cut-film aesthetic complete!`, "color: var(--color-bauhaus-red);");
      return;
    }

    if (effectiveCmd.startsWith("vidglitch") || effectiveCmd.startsWith("videoglitch")) {
      this.appendLine(`⚡ [vidglitch] Analyzing video & audio streams...
  - Input: demo.mp4 (1920x1080 @ 60fps)
  - Active preset: cyberpunk (organic-burst + rgbashift + shufflepixels)
  - Progress: [====================] 100%
  ✅ Output saved: demo-cyberpunk.mp4 (18.4 MB)
  🎉 Glitch effects applied seamlessly!`, "color: var(--color-terminal-magenta);");
      return;
    }

    if (effectiveCmd.startsWith("vidglue") || effectiveCmd.startsWith("videoglue")) {
      this.appendLine(`🎞️ [vidglue] Fusing media streams...
  - Mode: Crossfade transition (fade, 0.5s, auto-normalized 1080p)
  - Merging part1.mp4 + part2.mp4 → part1-xfade.mp4
  - Progress: [====================] 100%
  ✅ Output saved: part1-xfade.mp4
  🚀 Seamless transition complete!`, "color: var(--color-terminal-cyan);");
      return;
    }

    if (effectiveCmd.startsWith("img2webp")) {
      this.appendLine(`📸 [img2webp] Processing batch conversion...
  - Input: photo.jpg (4.2 MB, JPEG 4032x3024)
  - Options: quality=85 width=1200
  - Output: photo.webp (380 KB, WebP 1200x900)
  📉 Size reduced by 90.9% (saved 3.82 MB)!
  ✅ Done.`, "color: var(--color-terminal-green);");
      return;
    }

    const isMp3Out = /(?:^|\s)(-m|--mp3|--format\s+mp3)(?:\s|$)/.test(effectiveCmd);
    const outExt = isMp3Out ? "mp3" : "wav";

    if (effectiveCmd.startsWith("wav2tempo")) {
      this.appendLine(`🥁 [wav2tempo] Running aubio tempo detector...
  - Estimated source tempo: 112.4 BPM
  - Target requested tempo: 128.0 BPM
  - Speed multiplier: 1.1387x
  - Applying pitch-preserving tempo filter (rubberband)...
  ✅ Output saved: drum-loop-128bpm.${outExt}
  🎶 Timing synchronized to grid!`, "color: var(--color-bauhaus-yellow);");
      return;
    }

    if (effectiveCmd.startsWith("wavreverse")) {
      this.appendLine(`⏪ [wavreverse] Reversing audio waveform...
  - Filter: areverse
  ✅ Output saved: sample-reversed.${outExt}
  🔄 Reverse playback exported!`, "color: var(--color-terminal-cyan);");
      return;
    }

    if (effectiveCmd.startsWith("wavnorm")) {
      this.appendLine(`🎚️ [wavnorm] Analyzing integrated loudness...
  - Measured: -21.4 LUFS (LRA 8.2 LU)
  - Target: ${effectiveCmd.includes("-16") ? "-16.0" : "-14.0"} LUFS (EBU R128)
  - Applied gain: +7.4 dB
  ✅ Output saved: track-norm.${outExt}
  🔊 Volume balanced for streaming!`, "color: var(--color-terminal-green);");
      return;
    }

    if (effectiveCmd.startsWith("wavpitch")) {
      this.appendLine(`🎼 [wavpitch] Applying semitone shift...
  - Shift: +2 semitones
  - Mode: Pitch-shift (tempo preserved)
  ✅ Output saved: vocal-pitch+2.${outExt}`, "color: var(--color-terminal-cyan);");
      return;
    }

    if (effectiveCmd.startsWith("wavfade")) {
      this.appendLine(`📈 [wavfade] Applying fade envelopes...
  - Fade-in: 0.10s (qsin curve)
  - Fade-out: 0.20s (qsin curve)
  ✅ Output saved: sample-faded.${outExt}
  🔇 Pops and clicks eradicated!`, "color: var(--color-terminal-green);");
      return;
    }

    if (effectiveCmd.startsWith("wavtrim")) {
      this.appendLine(`✂️ [wavtrim] Scanning for silence...
  - Threshold: -50dB
  - Trimmed leading: 0.45s
  - Trimmed trailing: 1.12s
  ✅ Output saved: vocal-trimmed.${outExt}`, "color: var(--color-terminal-green);");
      return;
    }

    if (effectiveCmd.startsWith("wavfx")) {
      this.appendLine(`🎛️ [wavfx] Applying multi-effect DSP filter chain...
  - Reverb: hall + Delay: 250ms
  ✅ Output saved: loop-fx.${outExt}`, "color: var(--color-terminal-magenta);");
      return;
    }

    if (effectiveCmd.startsWith("ytdl")) {
      this.appendLine(`📥 [ytdl] Inspecting clipboard URL...
  - Found: https://example.com/stream
  - Fetching bestvideo+bestaudio...
  - Merging into MP4...
  ✅ Download complete: stream.mp4`, "color: var(--color-terminal-green);");
      return;
    }

    // Fallback response for other tools
    const effectiveMain = effectiveCmd.split(/\s+/)[0];
    const matchTool = TOOLS_DATA.find(t => t.id === effectiveMain || t.name === effectiveMain);
    if (matchTool) {
      this.appendLine(`⚙️ [${matchTool.name}] ${matchTool.summary}
Usage: ${matchTool.signature}
Run '${matchTool.name} --help' or check the documentation below for options.`, "color: var(--text-code-on-terminal);");
    } else {
      this.appendLine(`❓ Unknown command: ${effectiveMain}. Type 'help' to see all available tools.`, "color: var(--color-bauhaus-red);");
    }
  }
}

// ============================================================================
// 2.5 Visual Aids & Reference Library (Bauhaus-Brutalist Visual System)
// High-precision vector SVGs and metadata for tools, effects, color grading, and DSP.
// ============================================================================
const VISUAL_AIDS = {
  tools: {
    mytools: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#090b0e"/><circle cx="8" cy="8" r="3" fill="#ff3344"/><rect x="15" y="5" width="5" height="5" fill="#ffb703"/><polygon points="26,5 29,10 23,10" fill="#2563eb"/><path d="M7 17 L15 23 L7 29" stroke="#00f59b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="18" y1="29" x2="26" y2="29" stroke="#f0f4fc" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    img2webp: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="4" y="6" width="24" height="20" rx="3" stroke="#2563eb" stroke-width="1.8"/><circle cx="10" cy="12" r="2.5" fill="#f59e0b"/><polygon points="8,22 15,14 20,18 24,13 26,22" fill="#00f59b"/><rect x="15" y="18" width="13" height="8" rx="2" fill="#2563eb"/><text x="17" y="24" fill="#fff" font-size="5" font-weight="900" font-family="monospace">WEBP</text></svg>`,
    vidglue: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="4" y="7" width="11" height="18" rx="2" fill="#2563eb" stroke="#38bdf8" stroke-width="1.2"/><rect x="17" y="7" width="11" height="18" rx="2" fill="#ec4899" stroke="#f43f5e" stroke-width="1.2"/><line x1="14" y1="16" x2="18" y2="16" stroke="#00f59b" stroke-width="2.5" stroke-linecap="round"/><circle cx="16" cy="16" r="2.5" fill="#f59e0b"/></svg>`,
    vidglitch: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="4" y="5" width="24" height="22" rx="3" stroke="#ff3344" stroke-width="1.5"/><line x1="6" y1="11" x2="26" y2="11" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="3,2"/><line x1="6" y1="21" x2="26" y2="21" stroke="#ff3344" stroke-width="1.5" stroke-dasharray="4,2"/><polyline points="18,8 12,17 19,17 14,24" stroke="#00f59b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    vidcuts: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="4" y="8" width="24" height="16" rx="2" fill="#1e2638" stroke="#64748b" stroke-width="1.5"/><circle cx="8" cy="11" r="1.5" fill="#f59e0b"/><circle cx="16" cy="11" r="1.5" fill="#f59e0b"/><circle cx="24" cy="11" r="1.5" fill="#f59e0b"/><line x1="16" y1="5" x2="16" y2="27" stroke="#ff3344" stroke-width="2" stroke-dasharray="3,2"/><text x="19" y="22" fill="#ff3344" font-size="8">✂</text></svg>`,
    videoeffects: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="4" y="7" width="24" height="18" rx="2" stroke="#f59e0b" stroke-width="1.5"/><circle cx="16" cy="16" r="6" stroke="#00f59b" stroke-width="1.5"/><polygon points="16,10 21,19 11,19" fill="#2563eb" opacity="0.8"/><rect x="4" y="7" width="24" height="3" fill="#ff3344"/><rect x="4" y="22" width="24" height="3" fill="#ff3344"/></svg>`,
    videorandfram: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="5" y="5" width="9" height="9" rx="2" fill="#2563eb"/><rect x="18" y="5" width="9" height="9" rx="2" fill="#f59e0b"/><rect x="5" y="18" width="9" height="9" rx="2" fill="#00f59b"/><rect x="18" y="18" width="9" height="9" rx="2" fill="#ff3344"/><circle cx="9.5" cy="9.5" r="1.5" fill="#fff"/><circle cx="22.5" cy="9.5" r="1.5" fill="#fff"/><circle cx="9.5" cy="22.5" r="1.5" fill="#fff"/><circle cx="22.5" cy="22.5" r="1.5" fill="#fff"/></svg>`,
    vidoptim: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><circle cx="16" cy="16" r="10" stroke="#333f52" stroke-width="2"/><path d="M 9 22 A 10 10 0 1 1 23 22" stroke="#00f59b" stroke-width="2.5" stroke-linecap="round"/><line x1="16" y1="16" x2="21" y2="12" stroke="#ff3344" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="2.5" fill="#f0f4fc"/></svg>`,
    wav2tempo: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><polygon points="9,26 13,8 19,8 23,26" stroke="#f59e0b" stroke-width="1.5" fill="none"/><line x1="16" y1="24" x2="22" y2="11" stroke="#00f59b" stroke-width="2" stroke-linecap="round"/><circle cx="20" cy="13" r="2" fill="#ff3344"/><line x1="6" y1="26" x2="26" y2="26" stroke="#333f52" stroke-width="2"/></svg>`,
    wavpitch: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><line x1="6" y1="10" x2="26" y2="10" stroke="#333f52" stroke-width="1"/><line x1="6" y1="16" x2="26" y2="16" stroke="#333f52" stroke-width="1"/><line x1="6" y1="22" x2="26" y2="22" stroke="#333f52" stroke-width="1"/><circle cx="11" cy="20" r="3" fill="#2563eb"/><line x1="14" y1="20" x2="14" y2="8" stroke="#2563eb" stroke-width="1.5"/><circle cx="21" cy="14" r="3" fill="#00f59b"/><line x1="24" y1="14" x2="24" y2="6" stroke="#00f59b" stroke-width="1.5"/><path d="M 14 9 L 24 6" stroke="#00f59b" stroke-width="2"/></svg>`,
    wavnorm: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="8" y="7" width="6" height="18" rx="1" fill="#1e2638" stroke="#333f52" stroke-width="1"/><rect x="18" y="7" width="6" height="18" rx="1" fill="#1e2638" stroke="#333f52" stroke-width="1"/><rect x="9" y="13" width="4" height="11" fill="#00f59b"/><rect x="19" y="11" width="4" height="13" fill="#00f59b"/><line x1="6" y1="12" x2="26" y2="12" stroke="#ff3344" stroke-width="1.5" stroke-dasharray="2,2"/><text x="14" y="6" fill="#f0f4fc" font-size="4" font-family="monospace">-14</text></svg>`,
    wavfade: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><path d="M 5 24 Q 13 24 16 16 T 27 8" stroke="#00f59b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M 5 8 Q 13 8 16 16 T 27 24" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2,2" fill="none"/><line x1="5" y1="26" x2="27" y2="26" stroke="#333f52" stroke-width="1.5"/></svg>`,
    wavtrim: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><path d="M 5 16 L 8 16 L 11 9 L 14 23 L 18 10 L 21 21 L 24 16 L 27 16" stroke="#00f59b" stroke-width="1.8" fill="none" stroke-linecap="round"/><line x1="9" y1="7" x2="9" y2="25" stroke="#ff3344" stroke-width="1.5" stroke-dasharray="2,2"/><line x1="23" y1="7" x2="23" y2="25" stroke="#ff3344" stroke-width="1.5" stroke-dasharray="2,2"/><text x="4" y="10" fill="#ff3344" font-size="7">✂</text></svg>`,
    wavfx: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><polygon points="7,12 12,12 17,7 17,25 12,20 7,20" fill="#2563eb"/><path d="M 20 12 A 5 5 0 0 1 20 20" stroke="#00f59b" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M 23 9 A 9 9 0 0 1 23 23" stroke="#f59e0b" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M 26 6 A 13 13 0 0 1 26 26" stroke="#ec4899" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`,
    ytdl: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><path d="M 9 14 A 5 5 0 0 1 19 12 A 4 4 0 0 1 24 16 A 4 4 0 0 1 22 20 L 10 20 A 4 4 0 0 1 9 14" fill="#1e2638" stroke="#38bdf8" stroke-width="1.5"/><line x1="16" y1="13" x2="16" y2="24" stroke="#00f59b" stroke-width="2.5" stroke-linecap="round"/><polyline points="12,20 16,24 20,20" stroke="#00f59b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="8" y1="27" x2="24" y2="27" stroke="#333f52" stroke-width="2" stroke-linecap="round"/></svg>`,
    vid2webm: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="5" y="8" width="22" height="16" rx="2" stroke="#06b6d4" stroke-width="1.5"/><polygon points="13,12 21,16 13,20" fill="#00f59b"/><text x="7" y="27" fill="#06b6d4" font-size="5" font-family="monospace" font-weight="bold">WEBM</text></svg>`,
    vid2gif: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="5" y="7" width="22" height="18" rx="2" stroke="#ec4899" stroke-width="1.5"/><circle cx="16" cy="16" r="5" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/><text x="10" y="28" fill="#ec4899" font-size="5" font-family="monospace" font-weight="bold">GIF</text></svg>`,
    videoWithoutAudio: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><polygon points="7,12 12,12 17,7 17,25 12,20 7,20" fill="#64748b"/><line x1="6" y1="6" x2="26" y2="26" stroke="#ff3344" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    vid2audio: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="4" y="6" width="14" height="20" rx="2" fill="#1e2638" stroke="#333f52" stroke-width="1.2"/><circle cx="23" cy="20" r="3" fill="#00f59b"/><line x1="26" y1="20" x2="26" y2="10" stroke="#00f59b" stroke-width="2"/><line x1="12" y1="16" x2="20" y2="16" stroke="#ffb703" stroke-width="1.5" stroke-dasharray="2,2"/></svg>`,
    wav2mp3: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><circle cx="16" cy="16" r="10" stroke="#2563eb" stroke-width="1.5"/><circle cx="16" cy="16" r="3" fill="#ffb703"/><text x="9" y="28" fill="#f0f4fc" font-size="5" font-family="monospace" font-weight="bold">MP3</text></svg>`,
    wavreverse: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><path d="M 24 16 L 8 16" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/><polyline points="13,11 8,16 13,21" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="19,11 14,16 19,21" stroke="#ff3344" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    "media-info": `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><circle cx="16" cy="16" r="10" stroke="#00f59b" stroke-width="1.5"/><line x1="16" y1="16" x2="22" y2="10" stroke="#00f59b" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="2" fill="#ff3344"/><text x="13" y="26" fill="#00f59b" font-size="5" font-family="monospace">FF</text></svg>`,
    thumloc: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="6" y="6" width="20" height="15" rx="2" fill="#1e2638" stroke="#38bdf8" stroke-width="1.2"/><path d="M 16 18 C 14 18 12 20 12 23 C 12 26 16 29 16 29 C 16 29 20 26 20 23 C 20 20 18 18 16 18 Z" fill="#ff3344"/><circle cx="16" cy="22" r="1.5" fill="#fff"/></svg>`,
    webloc2md: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="6" y="5" width="20" height="22" rx="2" stroke="#94a3b8" stroke-width="1.5"/><line x1="10" y1="10" x2="22" y2="10" stroke="#2563eb" stroke-width="1.5"/><line x1="10" y1="15" x2="22" y2="15" stroke="#f59e0b" stroke-width="1.5"/><line x1="10" y1="20" x2="18" y2="20" stroke="#00f59b" stroke-width="1.5"/><text x="14" y="26" fill="#fff" font-size="5" font-family="monospace">MD</text></svg>`,
    guide: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="6" y="6" width="20" height="20" rx="3" stroke="#f59e0b" stroke-width="1.5"/><circle cx="16" cy="16" r="6" stroke="#00f59b" stroke-width="1.5"/><polygon points="16,12 18,16 16,20 14,16" fill="#ff3344"/></svg>`,
    doctor: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><rect x="6" y="6" width="20" height="20" rx="4" stroke="#00f59b" stroke-width="1.5"/><rect x="13" y="10" width="6" height="12" fill="#00f59b"/><rect x="10" y="13" width="12" height="6" fill="#00f59b"/></svg>`,
    config: `<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="4" fill="#10141b"/><line x1="6" y1="10" x2="26" y2="10" stroke="#333f52" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="#2563eb"/><line x1="6" y1="16" x2="26" y2="16" stroke="#333f52" stroke-width="2"/><circle cx="20" cy="16" r="3" fill="#f59e0b"/><line x1="6" y1="22" x2="26" y2="22" stroke="#333f52" stroke-width="2"/><circle cx="14" cy="22" r="3" fill="#00f59b"/></svg>`
  },

  effects: {
    videoeffects: [
      {
        id: "cinema",
        name: "Cinema",
        sub: "Teal & Orange, 2.35:1",
        badge: "CINEMA LOOK",
        filter: "colorbalance=rs=-0.1:gs=0:bs=0.2:rh=0.15:gh=0.05:bh=-0.1",
        desc: "Blockbuster cinematic grade: cool deep teal shadows contrasted with warm golden-amber skin tones and CinemaScope letterbox bars.",
        useCase: "Action movies, trailers, narrative film & cinematic B-roll",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#070a0f"/><rect x="0" y="8" width="80" height="34" fill="#082b47"/><circle cx="58" cy="22" r="14" fill="#f59e0b" opacity="0.85"/><polygon points="8,42 32,20 48,32 64,16 78,42" fill="#031b30"/><rect x="0" y="0" width="80" height="8" fill="#000"/><rect x="0" y="42" width="80" height="8" fill="#000"/><text x="4" y="6" fill="#00f59b" font-size="5" font-family="monospace">2.35:1</text><line x1="0" y1="8" x2="80" y2="8" stroke="#ffb703" stroke-width="0.8"/></svg>`
      },
      {
        id: "noir",
        name: "Noir",
        sub: "Chiaroscuro B&W",
        badge: "MONOCHROME",
        filter: "colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.45",
        desc: "Dramatic high-contrast black & white with Venetian blind chiaroscuro shadows and razor-sharp tonal separation.",
        useCase: "Crime thrillers, moody street photography, art-house films",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#040507"/><polygon points="18,0 52,0 76,50 32,50" fill="#f0f4fc" opacity="0.28"/><circle cx="46" cy="24" r="10" fill="#121720" stroke="#f0f4fc" stroke-width="1.2"/><line x1="0" y1="12" x2="80" y2="12" stroke="#000" stroke-width="2.5"/><line x1="0" y1="26" x2="80" y2="26" stroke="#000" stroke-width="2.5"/><line x1="0" y1="40" x2="80" y2="40" stroke="#000" stroke-width="2.5"/><text x="6" y="46" fill="#94a3b8" font-size="5" font-family="monospace">NOIR</text></svg>`
      },
      {
        id: "vintage",
        name: "Vintage",
        sub: "1970s Kodachrome",
        badge: "RETRO FILM",
        filter: "curves=vintage,eq=saturation=1.2:gamma=1.1,vignette=PI/4",
        desc: "Warm 1970s Kodachrome emulsion with rich amber midtones, faded cyan skies, and Super-8 aperture gate vignette.",
        useCase: "Nostalgic montages, travel journals, retro music videos",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#1a1109"/><rect x="4" y="4" width="72" height="42" rx="7" fill="#d97706" opacity="0.85"/><circle cx="40" cy="24" r="13" fill="#ea580c" opacity="0.8"/><polygon points="6,46 30,28 48,38 68,22 74,46" fill="#78350f"/><rect x="0" y="0" width="80" height="50" fill="none" stroke="#291508" stroke-width="4"/><text x="8" y="12" fill="#fef3c7" font-size="5" font-family="monospace">1970</text></svg>`
      },
      {
        id: "kodak",
        name: "Kodak",
        sub: "35mm Golden Warmth",
        badge: "35MM GRAIN",
        filter: "colorbalance=rh=0.12:gh=0.03:bh=-0.08:rs=0.05,noise=alls=12",
        desc: "Golden 35mm motion picture stock tone with organic film grain, saturated reds, and gentle highlight roll-off.",
        useCase: "Documentaries, cinematic lifestyle reels, portrait videos",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#180e06"/><rect x="4" y="4" width="72" height="42" fill="#b45309"/><circle cx="52" cy="22" r="13" fill="#dc2626" opacity="0.85"/><polygon points="8,46 34,26 50,36 70,18 76,46" fill="#451a03"/><rect x="6" y="6" width="14" height="6" fill="#b91c1c"/><text x="8" y="11" fill="#fff" font-size="4" font-family="monospace" font-weight="bold">35mm</text></svg>`
      },
      {
        id: "dream",
        name: "Dream",
        sub: "Highlight Bloom",
        badge: "ETHEREAL",
        filter: "split[a][b];[b]boxblur=15:1[b];[a][b]blend=all_mode='screen':all_opacity=0.45",
        desc: "Dreamy soft-focus optical diffusion with ethereal highlight halos and low-contrast pastel glow.",
        useCase: "Fantasy sequences, flashbacks, romantic edits, ethereal music",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#100b1e"/><circle cx="40" cy="25" r="20" fill="#c084fc" opacity="0.35"/><circle cx="40" cy="25" r="10" fill="#f472b6" opacity="0.6"/><circle cx="40" cy="25" r="4" fill="#fff"/><circle cx="22" cy="18" r="8" fill="#38bdf8" opacity="0.4"/><circle cx="58" cy="30" r="10" fill="#ec4899" opacity="0.4"/><text x="24" y="46" fill="#e9d5ff" font-size="5" font-family="monospace">BLOOM</text></svg>`
      },
      {
        id: "synthwave",
        name: "Synthwave",
        sub: "Neon Magenta & Cyan",
        badge: "RETRO 80s",
        filter: "colorchannelmixer=1:0:0:0:0:0.4:0.8:0:0.8:0:1:0,eq=contrast=1.3",
        desc: "1980s retro grid aesthetic with electric magenta highlights, deep cyan shadows, and high-contrast saturation.",
        useCase: "EDM clips, gaming montages, retro car edits, cyberpunk",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#0d0221"/><circle cx="40" cy="20" r="13" fill="#f43f5e"/><line x1="0" y1="28" x2="80" y2="28" stroke="#06b6d4" stroke-width="1.5"/><line x1="40" y1="28" x2="0" y2="50" stroke="#ec4899" stroke-width="1"/><line x1="40" y1="28" x2="20" y2="50" stroke="#ec4899" stroke-width="1"/><line x1="40" y1="28" x2="40" y2="50" stroke="#ec4899" stroke-width="1"/><line x1="40" y1="28" x2="60" y2="50" stroke="#ec4899" stroke-width="1"/><line x1="40" y1="28" x2="80" y2="50" stroke="#ec4899" stroke-width="1"/><line x1="0" y1="35" x2="80" y2="35" stroke="#06b6d4" stroke-width="0.75"/><line x1="0" y1="43" x2="80" y2="43" stroke="#06b6d4" stroke-width="0.75"/></svg>`
      },
      {
        id: "thermal",
        name: "Thermal",
        sub: "FLIR Heat Vision",
        badge: "INFRARED",
        filter: "lutrgb=r='val*1.8':g='abs(val-128)*2':b='255-val'",
        desc: "Predator-style tactical heat vision false-color gradient mapping luminance into blue, green, yellow and red.",
        useCase: "Sci-fi HUDs, surveillance sequences, tactical POV footage",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><defs><linearGradient id="tg1" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="30%" stop-color="#2563eb"/><stop offset="55%" stop-color="#22c55e"/><stop offset="75%" stop-color="#eab308"/><stop offset="90%" stop-color="#ef4444"/><stop offset="100%" stop-color="#ffffff"/></linearGradient></defs><rect width="80" height="50" fill="url(#tg1)"/><circle cx="40" cy="25" r="14" fill="#ef4444" stroke="#fff" stroke-width="1.5"/><circle cx="40" cy="25" r="5" fill="#fff"/><text x="4" y="10" fill="#fff" font-size="5" font-family="monospace">FLIR 37°C</text></svg>`
      },
      {
        id: "bleach",
        name: "Bleach",
        sub: "Bleach Bypass",
        badge: "GRITTY WAR",
        filter: "split[a][b];[b]format=gray[b];[a][b]blend=all_mode='overlay':all_opacity=0.7",
        desc: "Silver-retention bleach bypass look with crushed blacks, desaturated colors, and stark high-contrast grit.",
        useCase: "War films, post-apocalyptic thrillers, hyper-realistic documentaries",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#181c20"/><rect x="4" y="4" width="72" height="42" fill="#334155"/><polygon points="8,46 32,22 50,34 68,14 76,46" fill="#0f172a"/><circle cx="56" cy="18" r="8" fill="#94a3b8" opacity="0.6"/><text x="6" y="12" fill="#cbd5e1" font-size="5" font-family="monospace">BLEACH</text></svg>`
      },
      {
        id: "sepia",
        name: "Sepia",
        sub: "Historic 1890 Tone",
        badge: "ANTIQUE",
        filter: "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",
        desc: "Antique sepia toning evoking late 19th-century silver gelatin photographic prints with warm amber patina.",
        useCase: "Archival footage, historical retrospectives, western themes",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#2c1a0e"/><rect x="4" y="4" width="72" height="42" fill="#784b28"/><circle cx="50" cy="22" r="12" fill="#a46d3e"/><polygon points="8,46 36,24 52,36 72,18 76,46" fill="#4a2e18"/><text x="6" y="12" fill="#fed7aa" font-size="5" font-family="monospace">1890</text></svg>`
      }
    ],

    vidglitch: [
      {
        id: "rgb-split",
        name: "RGB Split",
        sub: "Chromatic Aberration",
        badge: "CHANNEL SHIFT",
        filter: "split[a][b];[a]lutrgb=r=0:g=0[r];[b]lutrgb=b=0:g=0[b];[r][b]overlay=x=8:y=0",
        desc: "Spatial displacement of red and cyan/blue color channels, mimicking extreme chromatic lens aberration or faulty video sync cables.",
        useCase: "Action impacts, camera shake tremors, digital shockwaves",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><text x="14" y="33" fill="#ff0055" font-size="22" font-family="monospace" font-weight="900" opacity="0.85">RGB</text><text x="22" y="33" fill="#00f5ff" font-size="22" font-family="monospace" font-weight="900" opacity="0.85">RGB</text><text x="18" y="33" fill="#ffffff" font-size="22" font-family="monospace" font-weight="900">RGB</text><line x1="0" y1="18" x2="80" y2="18" stroke="#00f5ff" stroke-width="1" stroke-dasharray="8,4"/><line x1="0" y1="36" x2="80" y2="36" stroke="#ff0055" stroke-width="1" stroke-dasharray="12,6"/></svg>`
      },
      {
        id: "vhs",
        name: "VHS Tape",
        sub: "Tracking & Scanlines",
        badge: "ANALOG TAPE",
        filter: "curves=vintage,drawbox=y=ih-12:h=8:c=white@0.4:t=fill,noise=c1s=20",
        desc: "Authentic 1990s magnetic tape flutter with rolling bottom tracking noise bar, VHS color bleed, and camcorder timestamp HUD.",
        useCase: "Found-footage horror, 90s aesthetic videos, retro home tapes",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#0a0c10"/><line x1="0" y1="38" x2="80" y2="38" stroke="#fff" stroke-width="3" stroke-dasharray="10,2,6,4,14,3"/><text x="6" y="14" fill="#00f59b" font-size="7" font-family="monospace">▶ PLAY</text><text x="6" y="24" fill="#f0f4fc" font-size="5" font-family="monospace">SP 0:12:44</text><line x1="0" y1="6" x2="80" y2="6" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="0" y1="16" x2="80" y2="16" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="0" y1="28" x2="80" y2="28" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="0" y1="46" x2="80" y2="46" stroke="rgba(255,255,255,0.15)" stroke-width="1"/></svg>`
      },
      {
        id: "crt",
        name: "Arcade CRT",
        sub: "Curved Scanlines",
        badge: "PHOSPHOR CRT",
        filter: "drawgrid=w=iw:h=2:t=1:c=black@0.5,eq=saturation=1.4",
        desc: "Curved cathode-ray tube phosphor screen with horizontal scanline raster grid and high-saturation arcade glow.",
        useCase: "Arcade cabinet emulation, retro video games, tech console screens",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" rx="8" fill="#061208" stroke="#166534" stroke-width="2"/><g stroke="#22c55e" stroke-width="0.75" opacity="0.6"><line x1="0" y1="8" x2="80" y2="8"/><line x1="0" y1="16" x2="80" y2="16"/><line x1="0" y1="24" x2="80" y2="24"/><line x1="0" y1="32" x2="80" y2="32"/><line x1="0" y1="40" x2="80" y2="40"/></g><circle cx="40" cy="24" r="10" fill="none" stroke="#4ade80" stroke-width="2"/><text x="31" y="27" fill="#4ade80" font-size="7" font-family="monospace">CRT</text></svg>`
      },
      {
        id: "8bit",
        name: "8-Bit Retro",
        sub: "Pixelated Mosaic",
        badge: "CHIPTUNE 8-BIT",
        filter: "scale=iw/8:ih/8:flags=neighbor,scale=iw*8:ih*8:flags=neighbor",
        desc: "Nearest-neighbor downsampling to blocky 8x8 pixel grid with a restricted retro color palette.",
        useCase: "Pixel art projects, chiptune music videos, vintage gaming clips",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#0f172a"/><rect x="8" y="7" width="11" height="11" fill="#f43f5e"/><rect x="21" y="7" width="11" height="11" fill="#38bdf8"/><rect x="34" y="7" width="11" height="11" fill="#fbbf24"/><rect x="47" y="7" width="11" height="11" fill="#4ade80"/><rect x="60" y="7" width="11" height="11" fill="#a855f7"/><rect x="8" y="20" width="11" height="11" fill="#38bdf8"/><rect x="21" y="20" width="11" height="11" fill="#f43f5e"/><rect x="34" y="20" width="11" height="11" fill="#4ade80"/><rect x="47" y="20" width="11" height="11" fill="#fbbf24"/><rect x="60" y="20" width="11" height="11" fill="#f43f5e"/><rect x="8" y="33" width="11" height="11" fill="#a855f7"/><rect x="21" y="33" width="11" height="11" fill="#fbbf24"/><rect x="34" y="33" width="11" height="11" fill="#38bdf8"/><rect x="47" y="33" width="11" height="11" fill="#f43f5e"/><rect x="60" y="33" width="11" height="11" fill="#4ade80"/></svg>`
      },
      {
        id: "cyberpunk",
        name: "Cyberpunk",
        sub: "Digital Tearing & Neon",
        badge: "CYBERPUNK",
        filter: "hue=s=1.8,eq=contrast=1.3,drawbox=x=0:y=ih*0.4:w=iw:h=20:c=cyan@0.6",
        desc: "Overdriven neon cyan and magenta palette with high-speed digital horizontal tears and static displacement.",
        useCase: "Dystopian sci-fi trailers, rave visualizers, high-energy intros",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#0b0813"/><rect x="6" y="12" width="48" height="12" fill="#06b6d4" opacity="0.8"/><rect x="24" y="20" width="50" height="14" fill="#f43f5e" opacity="0.8"/><rect x="14" y="16" width="40" height="10" fill="#fef08a" opacity="0.9"/><text x="17" y="24" fill="#000" font-size="7" font-family="monospace" font-weight="900">CYBER</text><line x1="0" y1="8" x2="80" y2="8" stroke="#f43f5e" stroke-width="1"/><line x1="0" y1="42" x2="80" y2="42" stroke="#06b6d4" stroke-width="1"/></svg>`
      },
      {
        id: "badsignal",
        name: "Bad Signal",
        sub: "RF Static Snow",
        badge: "NO SIGNAL",
        filter: "noise=alls=40:allf=t+u,eq=contrast=0.85:brightness=0.1",
        desc: "Heavy broadcast transmission interference with analog television static snow, vertical sync rolls, and RF noise.",
        useCase: "Broken transmission scenes, lost downlink effects, spooky transitions",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#111827"/><line x1="0" y1="12" x2="80" y2="24" stroke="#fff" stroke-width="3" stroke-dasharray="4,8,12,6,3"/><line x1="0" y1="32" x2="80" y2="44" stroke="#94a3b8" stroke-width="4" stroke-dasharray="10,6,4,14"/><circle cx="20" cy="18" r="1.5" fill="#fff"/><circle cx="50" cy="12" r="1.5" fill="#fff"/><circle cx="65" cy="38" r="2" fill="#fff"/><text x="18" y="30" fill="#ef4444" font-size="8" font-family="monospace" font-weight="bold">NO SIGNAL</text></svg>`
      },
      {
        id: "tear",
        name: "Data Tear",
        sub: "Frame Displacement",
        badge: "DATA TEAR",
        filter: "split[a][b];[b]crop=iw:40:0:ih*0.3[c];[a][c]overlay=x=15:y=ih*0.3",
        desc: "Horizontal band slicing where segments of the picture slip left and right due to buffer timing errors.",
        useCase: "Digital glitch art, glitch-hop music beats, dramatic stutters",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="12" y="8" width="58" height="10" fill="#2563eb"/><rect x="2" y="20" width="60" height="10" fill="#2563eb"/><rect x="18" y="32" width="56" height="10" fill="#2563eb"/><line x1="0" y1="19" x2="80" y2="19" stroke="#ff3344" stroke-width="1.5"/><line x1="0" y1="31" x2="80" y2="31" stroke="#00f59b" stroke-width="1.5"/></svg>`
      },
      {
        id: "datamosh",
        name: "Datamosh",
        sub: "Motion Vector Bleed",
        badge: "DATAMOSH",
        filter: "fps=15,tblend=all_mode='average',eq=saturation=1.6",
        desc: "Simulated I-frame drop resulting in motion vector pixel smearing, ghost trails, and melted compression artifacts.",
        useCase: "Viral TikTok/Reel transitions, trippy music videos, dream edits",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="4" y="6" width="30" height="38" fill="#3b82f6"/><rect x="24" y="10" width="28" height="34" fill="#ec4899" opacity="0.8"/><rect x="42" y="14" width="34" height="30" fill="#10b981" opacity="0.75"/><rect x="16" y="20" width="58" height="6" fill="#facc15" opacity="0.9"/><rect x="8" y="30" width="66" height="5" fill="#06b6d4" opacity="0.85"/></svg>`
      },
      {
        id: "nightvision",
        name: "Nightvision",
        sub: "Tactical Phosphor Green",
        badge: "NIGHTVISION",
        filter: "colorchannelmixer=0:0:0:0:0:1.3:0:0:0:0:0:0,vignette=PI/3,noise=alls=25",
        desc: "Generation-3 tactical night vision viewfinder with circular ocular vignette, electronic amplification noise, and green phosphor glow.",
        useCase: "Military simulations, tactical game footage, found footage movies",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#031508"/><circle cx="40" cy="25" r="21" fill="#052e16" stroke="#22c55e" stroke-width="1.5"/><line x1="40" y1="6" x2="40" y2="44" stroke="#4ade80" stroke-width="0.75"/><line x1="20" y1="25" x2="60" y2="25" stroke="#4ade80" stroke-width="0.75"/><circle cx="40" cy="25" r="6" fill="none" stroke="#86efac" stroke-width="1"/><text x="4" y="10" fill="#4ade80" font-size="5" font-family="monospace">NV-GEN3</text></svg>`
      },
      {
        id: "gameboy",
        name: "GameBoy",
        sub: "4-Shade Olive Green LCD",
        badge: "RETRO LCD",
        filter: "format=gray,lutrgb=r='clip((val/64)*64,0,255)':g='clip((val/64)*70,0,255)':b='15'",
        desc: "Classic 1989 handheld gaming console aesthetic with 4-shade reflective olive-green STN LCD dot matrix.",
        useCase: "Nostalgic game clips, chiptune visualizers, retro tech showcases",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#8b956d"/><rect x="6" y="6" width="68" height="38" fill="#9bbc0f" stroke="#0f380f" stroke-width="1.5"/><circle cx="30" cy="25" r="10" fill="#306230"/><rect x="45" y="15" width="20" height="20" fill="#0f380f"/><text x="8" y="14" fill="#0f380f" font-size="5" font-family="monospace">4-SHADE LCD</text></svg>`
      },
      {
        id: "matrix",
        name: "Matrix",
        sub: "Green Code Rain",
        badge: "DIGITAL RAIN",
        filter: "colorchannelmixer=0:0:0:0:0:1.2:0:0:0:0:0:0,eq=contrast=1.6:brightness=-0.1",
        desc: "High-contrast terminal hacker code stream with cascading green phosphor characters and digital glow.",
        useCase: "Hacker console scenes, cyber security presentations, tech backgrounds",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#020a04"/><text x="8" y="12" fill="#22c55e" font-size="7" font-family="monospace">0 1 0 1</text><text x="8" y="22" fill="#86efac" font-size="7" font-family="monospace">1 0 1 0</text><text x="8" y="32" fill="#22c55e" font-size="7" font-family="monospace">0 0 1 1</text><text x="8" y="42" fill="#15803d" font-size="7" font-family="monospace">1 1 0 0</text><text x="44" y="16" fill="#86efac" font-size="7" font-family="monospace">日 本 語</text><text x="44" y="28" fill="#22c55e" font-size="7" font-family="monospace">マ ト リ</text><text x="44" y="40" fill="#16a34a" font-size="7" font-family="monospace">0 1 X 9</text></svg>`
      }
    ],

    vidcuts: [
      {
        id: "frames",
        name: "Frames",
        sub: "Celluloid Drops",
        badge: "FRAME DROP",
        filter: "select='not(mod(n\,12))',setpts=N/FRAME_RATE/TB",
        desc: "Organic celluloid projection failure where random missing frames create a mechanical stutter with black splice gaps.",
        useCase: "Vintage cinema projector feel, tension building, aggressive cuts",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="4" y="10" width="20" height="30" fill="#1e293b" stroke="#475569" stroke-width="1"/><rect x="28" y="10" width="22" height="30" fill="#020617" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,2"/><rect x="54" y="10" width="22" height="30" fill="#1e293b" stroke="#475569" stroke-width="1"/><circle cx="14" cy="5" r="2" fill="#fff"/><circle cx="39" cy="5" r="2" fill="#ef4444"/><circle cx="65" cy="5" r="2" fill="#fff"/><text x="31" y="28" fill="#ef4444" font-size="7" font-family="monospace">CUT</text></svg>`
      },
      {
        id: "jumps",
        name: "Jumps",
        sub: "0.2s Micro Skips",
        badge: "JUMP CUTS",
        filter: "aselect='not(between(t\,2\,2.2))',select='not(between(t\,2\,2.2))'",
        desc: "Rhythmic jump-cut excision trimming small chunks of time to accelerate pacing while preserving speech intelligibility.",
        useCase: "Modern YouTube/TikTok pacing, tutorial compression, talking-head vlogs",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><line x1="4" y1="25" x2="76" y2="25" stroke="#475569" stroke-width="2"/><circle cx="16" cy="25" r="6" fill="#3b82f6"/><path d="M 22 25 Q 36 6 50 25" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,2"/><circle cx="56" cy="25" r="6" fill="#10b981"/><polygon points="48,22 56,25 48,28" fill="#f59e0b"/><text x="24" y="44" fill="#f59e0b" font-size="6" font-family="monospace">JUMP &gt;&gt;</text></svg>`
      },
      {
        id: "stutter",
        name: "Stutter",
        sub: "Rapid Skips",
        badge: "STUTTER SKIP",
        filter: "select='trunc(n/4)*4',setpts=N/FRAME_RATE/TB",
        desc: "Rapid stutter cuts where short micro-segments repeat before jumping ahead, creating a machine-gun edit rhythm.",
        useCase: "Glitch music breaks, intense action trailers, rhythmic impact shots",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="10" y="10" width="24" height="30" fill="#3b82f6" opacity="0.35"/><rect x="24" y="10" width="24" height="30" fill="#3b82f6" opacity="0.65"/><rect x="38" y="10" width="24" height="30" fill="#3b82f6"/><text x="14" y="46" fill="#60a5fa" font-size="5" font-family="monospace">14-FRAME STUTTER</text></svg>`
      },
      {
        id: "freeze",
        name: "Freeze",
        sub: "Hold Frame (Audio Safe)",
        badge: "FREEZE HOLD",
        filter: "tpad=stop_mode=clone:stop_duration=0.5",
        desc: "Holds video frames static without modifying timeline duration, allowing audio tracks and background music to remain 100% intact.",
        useCase: "Music videos, commentary pause punches, comedy timing freeze-frames",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="68" height="24" fill="#0284c7"/><rect x="32" y="14" width="4" height="12" fill="#fff"/><rect x="42" y="14" width="4" height="12" fill="#fff"/><path d="M 6 42 Q 18 34 26 42 T 44 42 T 62 42 T 74 42" fill="none" stroke="#00f59b" stroke-width="2"/><text x="8" y="48" fill="#00f59b" font-size="5" font-family="monospace">AUDIO CONTINUOUS</text></svg>`
      },
      {
        id: "beat",
        name: "Beat",
        sub: "BPM Rhythmic Cuts",
        badge: "BPM SYNC",
        filter: "select='bitor(gte(t\,0)\,mod(t\,(60/128)))'",
        desc: "Rhythmically excises frames synchronized precisely to a target musical BPM (e.g. 128 BPM), snapping edits to musical beats.",
        useCase: "Dance choreographies, music video cuts, electronic beat drops",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><line x1="16" y1="6" x2="16" y2="44" stroke="#ec4899" stroke-width="1.5"/><line x1="36" y1="6" x2="36" y2="44" stroke="#ec4899" stroke-width="1.5"/><line x1="56" y1="6" x2="56" y2="44" stroke="#ec4899" stroke-width="1.5"/><line x1="76" y1="6" x2="76" y2="44" stroke="#ec4899" stroke-width="1.5"/><polyline points="6,34 16,10 26,34 36,10 46,34 56,10 66,34 76,10" fill="none" stroke="#facc15" stroke-width="2"/><text x="18" y="46" fill="#ec4899" font-size="6" font-family="monospace">128 BPM</text></svg>`
      },
      {
        id: "silence",
        name: "Silence",
        sub: "Auto Strip Pauses",
        badge: "SMART VLOG",
        filter: "silenceremove=start_periods=1:start_threshold=-45dB",
        desc: "Analyzes audio waveforms to automatically detect dead-air pauses and cuts them out cleanly in a single pass.",
        useCase: "Podcasts, screencasts, long interviews, video lectures",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><path d="M 4 25 Q 12 12 18 25 T 30 25" fill="none" stroke="#00f59b" stroke-width="2"/><line x1="30" y1="25" x2="52" y2="25" stroke="#ef4444" stroke-width="2" stroke-dasharray="2,2"/><path d="M 52 25 Q 60 12 66 25 T 76 25" fill="none" stroke="#00f59b" stroke-width="2"/><text x="32" y="18" fill="#ef4444" font-size="10">✂</text><text x="24" y="40" fill="#ef4444" font-size="5" font-family="monospace">STRIP SILENCE</text></svg>`
      }
    ],

    vidglue: [
      {
        id: "concat",
        name: "Concat",
        sub: "Zero-Loss Copy",
        badge: "STREAM COPY",
        filter: "-c copy -f concat",
        desc: "Lightning stream-copy merge. If clips share codecs and frame rates, gigabytes join in hundreds of milliseconds with zero re-encoding.",
        useCase: "Joining split camera files, drone footage reels, game captures",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="12" width="30" height="26" fill="#2563eb"/><rect x="44" y="12" width="30" height="26" fill="#10b981"/><line x1="36" y1="25" x2="44" y2="25" stroke="#facc15" stroke-width="3"/><text x="14" y="28" fill="#fff" font-size="8" font-family="monospace">A</text><text x="56" y="28" fill="#fff" font-size="8" font-family="monospace">B</text><text x="18" y="46" fill="#facc15" font-size="6" font-family="monospace">STREAM COPY</text></svg>`
      },
      {
        id: "bounce",
        name: "Bounce",
        sub: "Forward + Reverse Loop",
        badge: "BOOMERANG",
        filter: "split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=1",
        desc: "Plays clip forward then immediately reverses backward to the start, creating a seamless Boomerang ping-pong loop.",
        useCase: "Instagram / TikTok reels, product turntables, continuous gifs",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="12" width="68" height="26" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/><path d="M 20 20 L 50 20 L 44 14 M 50 20 L 44 26" fill="none" stroke="#00f59b" stroke-width="2"/><path d="M 60 30 L 30 30 L 36 24 M 30 30 L 36 36" fill="none" stroke="#ec4899" stroke-width="2"/><text x="18" y="46" fill="#38bdf8" font-size="6" font-family="monospace">BOOMERANG LOOP</text></svg>`
      },
      {
        id: "reencode",
        name: "Re-encode",
        sub: "Smart Aspect Fit",
        badge: "AUTO NORMALIZE",
        filter: "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080",
        desc: "Safely merges clips with mismatched frame rates, dimensions, or missing audio streams using blurred background fill or padding.",
        useCase: "Mixing vertical phone clips with horizontal 4K video",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="68" height="34" fill="#334155" opacity="0.6"/><rect x="26" y="8" width="28" height="34" fill="#2563eb"/><text x="18" y="48" fill="#93c5fd" font-size="5" font-family="monospace">BLUR FILL / FIT</text></svg>`
      },
      {
        id: "xfade",
        name: "Crossfade",
        sub: "Smooth Blend (-t fade)",
        badge: "CROSSFADE",
        filter: "xfade=transition=fade:duration=1.0:offset=4.0",
        desc: "Overlaps video tails and heads with hardware-accelerated opacity dissolves for seamless cinematic continuity.",
        useCase: "Short films, wedding videos, scene transitions, corporate promos",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="10" width="38" height="30" fill="#2563eb" opacity="0.8"/><rect x="36" y="10" width="38" height="30" fill="#ec4899" opacity="0.8"/><text x="36" y="28" fill="#fff" font-size="9" font-family="monospace">⤬</text><text x="22" y="46" fill="#e2e8f0" font-size="5" font-family="monospace">CROSSFADE</text></svg>`
      },
      {
        id: "hstack",
        name: "Split-Screen",
        sub: "Side-by-Side (50/50)",
        badge: "SPLIT SCREEN",
        filter: "hstack=inputs=2",
        desc: "Arranges two videos horizontally side-by-side with synchronized audio and normalized vertical dimensions.",
        useCase: "Before/after grading comparisons, podcast dual view, reaction videos",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="32" height="34" fill="#2563eb"/><rect x="42" y="8" width="32" height="34" fill="#ec4899"/><text x="18" y="28" fill="#fff" font-size="8" font-family="monospace">L</text><text x="54" y="28" fill="#fff" font-size="8" font-family="monospace">R</text></svg>`
      },
      {
        id: "2x2",
        name: "Quad 2x2",
        sub: "4-Way Grid Collage",
        badge: "QUAD COLLAGE",
        filter: "xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0",
        desc: "Combines 4 videos into a 2x2 quadrant security/multi-cam grid with combined audio mix.",
        useCase: "Multi-instrument music videos, multi-cam sports, surveillance layouts",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="6" width="32" height="17" fill="#2563eb"/><rect x="42" y="6" width="32" height="17" fill="#ec4899"/><rect x="6" y="27" width="32" height="17" fill="#10b981"/><rect x="42" y="27" width="32" height="17" fill="#f59e0b"/><text x="18" y="18" fill="#fff" font-size="6">1</text><text x="54" y="18" fill="#fff" font-size="6">2</text><text x="18" y="39" fill="#fff" font-size="6">3</text><text x="54" y="39" fill="#fff" font-size="6">4</text></svg>`
      }
    ],

    videorandfram: [
      {
        id: "shuffle",
        name: "Shuffle",
        sub: "30-Frame Scramble",
        badge: "FRAME SHUFFLE",
        filter: "random=frames=30",
        desc: "Balanced 30-frame shuffle scramble giving a rhythmic, experimental mosaic look without losing narrative flow.",
        useCase: "Teaser montages, music video drops, experimental cinema",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="8" y="8" width="14" height="34" fill="#2563eb"/><rect x="26" y="8" width="14" height="34" fill="#f59e0b"/><rect x="44" y="8" width="14" height="34" fill="#00f59b"/><rect x="62" y="8" width="10" height="34" fill="#ec4899"/><text x="12" y="28" fill="#fff" font-size="8">3</text><text x="30" y="28" fill="#fff" font-size="8">1</text><text x="48" y="28" fill="#fff" font-size="8">4</text></svg>`
      },
      {
        id: "jitter",
        name: "Jitter",
        sub: "4-Frame Shutter Tremor",
        badge: "SHUTTER JITTER",
        filter: "random=frames=4",
        desc: "High-frequency 4-frame jitter micro-tremor giving a physical projector gate weave or earthquake tremor.",
        useCase: "High-adrenaline suspense, physical shockwaves, horror jump scares",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="10" y="12" width="60" height="26" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/><line x1="6" y1="18" x2="74" y2="18" stroke="#ff3344" stroke-width="1.5"/><line x1="6" y1="32" x2="74" y2="32" stroke="#00f59b" stroke-width="1.5"/><text x="18" y="44" fill="#f59e0b" font-size="6" font-family="monospace">4-FRAME JITTER</text></svg>`
      },
      {
        id: "stutter",
        name: "Stutter",
        sub: "Breakbeat 14-Frame",
        badge: "STEP CADENCE",
        filter: "fps=12,random=frames=14",
        desc: "14-frame breakbeat stop-motion look with claymation step cadence and anime action pacing.",
        useCase: "Anime fights, hip-hop music videos, stylized fashion edits",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="10" y="10" width="24" height="30" fill="#3b82f6" opacity="0.35"/><rect x="24" y="10" width="24" height="30" fill="#3b82f6" opacity="0.65"/><rect x="38" y="10" width="24" height="30" fill="#3b82f6"/><text x="14" y="46" fill="#60a5fa" font-size="5" font-family="monospace">14-FRAME STUTTER</text></svg>`
      },
      {
        id: "vortex",
        name: "Vortex",
        sub: "120-Frame Time Loop",
        badge: "TIME VORTEX",
        filter: "random=frames=120",
        desc: "Surreal 120-frame non-linear loop cycling temporal chunks forward and backward like a time vortex.",
        useCase: "Psychedelic sequences, memory lapses, time-travel themes",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><circle cx="40" cy="25" r="18" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="8,4"/><circle cx="40" cy="25" r="11" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="6,3"/><circle cx="40" cy="25" r="4" fill="#00f59b"/><text x="18" y="46" fill="#c084fc" font-size="6" font-family="monospace">120F VORTEX</text></svg>`
      },
      {
        id: "chaos",
        name: "Chaos",
        sub: "300+ Frame Explosion",
        badge: "CHAOS MOSAIC",
        filter: "random=frames=320",
        desc: "Extreme temporal explosion scattering frames across 10+ seconds for a totally non-linear abstract experience.",
        useCase: "Experimental video art, climax breakdown scenes, abstract visualizers",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="8" y="6" width="16" height="16" fill="#ef4444"/><rect x="28" y="14" width="14" height="22" fill="#3b82f6"/><rect x="46" y="6" width="26" height="14" fill="#f59e0b"/><rect x="12" y="26" width="22" height="18" fill="#10b981"/><rect x="48" y="24" width="24" height="20" fill="#ec4899"/></svg>`
      },
      {
        id: "flicker",
        name: "Flicker",
        sub: "50/60fps Strobe",
        badge: "STROBE FLASH",
        filter: "select='mod(n\,2)'",
        desc: "Rapid-fire 50/60Hz frame alternation generating an intense photographic flash and strobe effect.",
        useCase: "Rave visuals, horror impacts, high-voltage electricity FX",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="14" height="34" fill="#fff"/><rect x="24" y="8" width="14" height="34" fill="#000" stroke="#333" stroke-width="1"/><rect x="42" y="8" width="14" height="34" fill="#fff"/><rect x="60" y="8" width="14" height="34" fill="#000" stroke="#333" stroke-width="1"/><text x="14" y="47" fill="#facc15" font-size="6" font-family="monospace">STROBE 60Hz</text></svg>`
      },
      {
        id: "reverse",
        name: "Reverse",
        sub: "Periodic Rewind Blocks",
        badge: "REWIND CHUNKS",
        filter: "reverse blocks",
        desc: "Takes 8-frame blocks and plays them in reverse order, creating a turntablist DJ scratching motion.",
        useCase: "Glitch hop edits, time-rewind cues, dance turntable accents",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><path d="M 50 18 L 30 25 L 50 32 Z" fill="#f59e0b"/><path d="M 68 18 L 48 25 L 68 32 Z" fill="#ff3344"/><rect x="12" y="10" width="8" height="30" fill="#00f59b"/><text x="14" y="46" fill="#f59e0b" font-size="6" font-family="monospace">REWIND 8F</text></svg>`
      },
      {
        id: "burst",
        name: "Burst",
        sub: "Scramble Pulses",
        badge: "BURST PULSE",
        filter: "periodic shuffle bursts",
        desc: "Intermittent pulses where calm video suddenly scrambles violently before returning to normal playback.",
        useCase: "Bass-drop accents, gunshots, high-tension trailer beats",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><circle cx="40" cy="25" r="16" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/><circle cx="40" cy="25" r="8" fill="#f59e0b"/><line x1="20" y1="25" x2="60" y2="25" stroke="#fff" stroke-width="1.5"/><text x="22" y="46" fill="#ef4444" font-size="6" font-family="monospace">PULSE BURST</text></svg>`
      }
    ],

    wavfade: [
      {
        id: "qsin",
        name: "Quarter Sine",
        sub: "Gentle S-Curve (qsin)",
        badge: "ORGANIC FADE",
        filter: "afade=t=in:curve=qsin",
        desc: "Gentle quarter-sine mathematical envelope producing smooth, natural acoustic fades with zero abrupt level steps.",
        useCase: "Vocal recordings, acoustic instruments, master track fade-ins",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><path d="M 10 40 Q 35 40 45 25 T 70 10" stroke="#00f59b" stroke-width="3" fill="none" stroke-linecap="round"/><line x1="10" y1="42" x2="70" y2="42" stroke="#333f52" stroke-width="1.5"/><text x="12" y="18" fill="#00f59b" font-size="7" font-family="monospace">QSIN S-CURVE</text></svg>`
      },
      {
        id: "tri",
        name: "Triangle",
        sub: "Linear Ramp (tri)",
        badge: "LINEAR RAMP",
        filter: "afade=t=in:curve=tri",
        desc: "Constant-rate linear decibel ramp for clean, predictable crossfades and electronic transitions.",
        useCase: "Electronic dance loops, synth stems, crossfader DJ simulation",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><line x1="10" y1="40" x2="70" y2="10" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/><line x1="10" y1="42" x2="70" y2="42" stroke="#333f52" stroke-width="1.5"/><text x="12" y="18" fill="#38bdf8" font-size="7" font-family="monospace">LINEAR TRI</text></svg>`
      },
      {
        id: "esin",
        name: "Exponential",
        sub: "Steep Envelope (esin)",
        badge: "EXPONENTIAL",
        filter: "afade=t=in:curve=esin",
        desc: "Steep exponential rise that remains quiet before surging upward rapidly at the end of the envelope.",
        useCase: "Dramatic audio build-ups, riser effects, impactful vocal punches",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><path d="M 10 40 Q 55 40 70 10" stroke="#ec4899" stroke-width="3" fill="none" stroke-linecap="round"/><line x1="10" y1="42" x2="70" y2="42" stroke="#333f52" stroke-width="1.5"/><text x="12" y="18" fill="#ec4899" font-size="7" font-family="monospace">EXPONENTIAL</text></svg>`
      },
      {
        id: "log",
        name: "Logarithmic",
        sub: "Fast Attack (log)",
        badge: "FAST ATTACK",
        filter: "afade=t=in:curve=log",
        desc: "Instantaneous fast volume rise that flattens out smoothly, preventing digital click pops at clip boundaries.",
        useCase: "Trimming sample slices, eliminating transient click noise",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><path d="M 10 40 Q 25 10 70 10" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/><line x1="10" y1="42" x2="70" y2="42" stroke="#333f52" stroke-width="1.5"/><text x="12" y="18" fill="#f59e0b" font-size="7" font-family="monospace">LOGARITHMIC</text></svg>`
      }
    ],

    wavfx: [
      {
        id: "room",
        name: "Warm Room",
        sub: "Intimate Reflection",
        badge: "ROOM REVERB",
        filter: "aecho=0.8:0.88:40:0.4",
        desc: "Short 40ms acoustic delay simulating an intimate cedar studio room with tight presence and minimal mud.",
        useCase: "Podcast dialogue, dry snare drums, vocal warmth",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="15" y="10" width="50" height="30" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/><circle cx="40" cy="25" r="4" fill="#00f59b"/><path d="M 32 20 A 10 10 0 0 1 48 20" stroke="#38bdf8" stroke-width="1.5" fill="none"/><text x="20" y="46" fill="#38bdf8" font-size="5" font-family="monospace">WARM ROOM (40ms)</text></svg>`
      },
      {
        id: "hall",
        name: "Concert Hall",
        sub: "Spacious Echo",
        badge: "HALL REVERB",
        filter: "aecho=0.8:0.88:120:0.5|250:0.35",
        desc: "Dual 120ms and 250ms stereo reflections creating the expansive, lush decay of a classical concert hall.",
        useCase: "Orchestral strings, acoustic guitars, cinematic backing vocals",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><polygon points="10,40 25,12 55,12 70,40" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/><circle cx="40" cy="30" r="5" fill="#f59e0b"/><path d="M 28 22 A 15 15 0 0 1 52 22" stroke="#f59e0b" stroke-width="1.5" fill="none"/><text x="18" y="46" fill="#f59e0b" font-size="5" font-family="monospace">CONCERT HALL</text></svg>`
      },
      {
        id: "space",
        name: "Deep Space",
        sub: "Infinite Echo Rings",
        badge: "COSMIC REVERB",
        filter: "aecho=0.8:0.9:500:0.6|1000:0.45",
        desc: "Massive 500ms and 1000ms delay clusters with long feedback tails creating an infinite cosmic reverb cavern.",
        useCase: "Ambient synth soundscapes, sci-fi FX, dramatic drone drops",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><circle cx="40" cy="25" r="5" fill="#ec4899"/><circle cx="40" cy="25" r="12" fill="none" stroke="#a855f7" stroke-width="1.5"/><circle cx="40" cy="25" r="19" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4,2"/><text x="18" y="46" fill="#ec4899" font-size="5" font-family="monospace">DEEP SPACE (1s)</text></svg>`
      }
    ],

    wavnorm: [
      {
        id: "lufs",
        name: "EBU R128 LUFS",
        sub: "Broadcast -14 LUFS",
        badge: "BROADCAST COMPLIANT",
        filter: "loudnorm=I=-14:LRA=11:TP=-1.5",
        desc: "Two-pass integrated loudness normalization conforming strictly to the EBU R128 and ITU-R BS.1770 broadcast standard.",
        useCase: "YouTube, Spotify, Apple Podcasts, television broadcasting",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="15" y="10" width="20" height="28" fill="#1e293b" stroke="#333f52" stroke-width="1"/><rect x="45" y="10" width="20" height="28" fill="#1e293b" stroke="#333f52" stroke-width="1"/><rect x="18" y="18" width="14" height="18" fill="#00f59b"/><rect x="48" y="16" width="14" height="20" fill="#00f59b"/><line x1="10" y1="18" x2="70" y2="18" stroke="#ff3344" stroke-width="1.5" stroke-dasharray="4,2"/><text x="24" y="44" fill="#00f59b" font-size="6" font-family="monospace">-14 LUFS</text></svg>`
      },
      {
        id: "peak",
        name: "Peak Normalization",
        sub: "dBFS True-Peak",
        badge: "PEAK CEILING",
        filter: "volume=-0.5dB",
        desc: "Instantaneous peak volume scaling ensuring loudest transients reach exactly -0.5 dBFS without dynamic compression.",
        useCase: "Sample packs, quick mastering level checks, audio stems",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><polyline points="10,38 22,12 34,36 46,14 58,32 70,20" fill="none" stroke="#38bdf8" stroke-width="2.5"/><line x1="8" y1="12" x2="72" y2="12" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,2"/><text x="22" y="45" fill="#38bdf8" font-size="6" font-family="monospace">0.0 dBFS PEAK</text></svg>`
      }
    ],

    img2webp: [
      {
        id: "lossy",
        name: "WebP Quality (85)",
        sub: "85% Size Reduction",
        badge: "HIGH EFFICIENCY",
        filter: "cwebp -q 85 photo.jpg -o photo.webp",
        desc: "Modern predictive lossy encoding reducing JPEG/PNG file size by ~85% with zero perceivable compression artifacts.",
        useCase: "Responsive websites, photography portfolios, blog hero images",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="68" height="34" rx="4" fill="#1e293b" stroke="#2563eb" stroke-width="1.5"/><circle cx="24" cy="20" r="6" fill="#f59e0b"/><polygon points="12,38 32,24 44,32 58,20 68,38" fill="#00f59b"/><rect x="42" y="10" width="28" height="12" rx="2" fill="#2563eb"/><text x="45" y="19" fill="#fff" font-size="6" font-family="monospace" font-weight="bold">-85%</text></svg>`
      },
      {
        id: "lossless",
        name: "WebP Lossless",
        sub: "Pixel-Perfect PNG (-l)",
        badge: "BIT-EXACT",
        filter: "cwebp -lossless graphic.png -o graphic.webp",
        desc: "Mathematical lossless transform preserving 100% bit-exact alpha channel transparency and sharp vector raster lines.",
        useCase: "UI screenshots, logos, transparency icons, crisp technical diagrams",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="68" height="34" rx="4" fill="#1e293b" stroke="#00f59b" stroke-width="1.5"/><line x1="16" y1="16" x2="64" y2="16" stroke="#f0f4fc" stroke-width="2"/><line x1="16" y1="25" x2="64" y2="25" stroke="#f0f4fc" stroke-width="2"/><line x1="16" y1="34" x2="48" y2="34" stroke="#f0f4fc" stroke-width="2"/><text x="46" y="40" fill="#00f59b" font-size="6" font-family="monospace" font-weight="bold">LOSSLESS</text></svg>`
      }
    ],

    ytdl: [
      {
        id: "mp4",
        name: "Video MP4",
        sub: "1080p Stream + AAC",
        badge: "VIDEO DOWNLOAD",
        filter: "yt-dlp -f 'bv*+ba/b' --merge-output-format mp4",
        desc: "Downloads the highest available resolution video stream merged with crystal-clear audio into a universal MP4 container.",
        useCase: "Offline research, archival video storage, video editing B-roll",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><rect x="6" y="8" width="68" height="34" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/><polygon points="34,18 50,25 34,32" fill="#00f59b"/><text x="12" y="40" fill="#38bdf8" font-size="5" font-family="monospace">1080P MP4</text></svg>`
      },
      {
        id: "mp3",
        name: "Audio MP3",
        sub: "320kbps Audio Stems",
        badge: "AUDIO EXTRACT",
        filter: "yt-dlp -x --audio-format mp3 --audio-quality 0",
        desc: "Strips the video stream and converts the soundtrack into a pristine 320kbps MP3 audio file with metadata.",
        useCase: "Soundtracks, speech lectures, music sampling, offline listening",
        svg: `<svg viewBox="0 0 80 50" width="100%" height="100%"><rect width="80" height="50" fill="#090b0e"/><circle cx="40" cy="25" r="14" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/><circle cx="40" cy="25" r="4" fill="#f59e0b"/><text x="24" y="46" fill="#ec4899" font-size="6" font-family="monospace">320K MP3</text></svg>`
      }
    ]
  },

  getToolSvg(toolId) {
    return this.tools[toolId] || this.tools.mytools;
  },

  getEffectSvg(toolId, effectId) {
    const list = this.effects[toolId];
    if (list) {
      const match = list.find(e => e.id === effectId);
      if (match) return match.svg;
      if (list[0]) return list[0].svg;
    }
    return this.getToolSvg(toolId);
  },

  getEffectData(toolId, effectId) {
    const list = this.effects[toolId];
    if (list) {
      const match = list.find(e => e.id === effectId);
      if (match) return match;
      if (list[0]) return list[0];
    }
    return {
      id: toolId,
      name: toolId,
      sub: "Terminal Command",
      badge: toolId.toUpperCase(),
      filter: "native unix stream execution",
      desc: "Standard high-precision macOS terminal toolbox operation.",
      useCase: "High-precision media transcoding and workflow automation",
      svg: this.getToolSvg(toolId)
    };
  }
};

// ============================================================================
// 3. Interactive Command Studio (Flag Builder / Generator)
// ============================================================================
class CommandStudio {
  constructor(selectContainerId, controlsContainerId, outputBoxId, copyBtnId) {
    this.selectContainer = document.getElementById(selectContainerId);
    this.controlsContainer = document.getElementById(controlsContainerId);
    this.outputBox = document.getElementById(outputBoxId);
    this.copyBtn = document.getElementById(copyBtnId);
    this.currentTool = "img2webp";
    this.state = {};
    this.init();
  }

  init() {
    if (!this.selectContainer || !this.controlsContainer) return;
    this.renderToolSelector();
    this.selectTool("img2webp");

    if (this.copyBtn) {
      this.copyBtn.addEventListener("click", () => {
        const cmd = this.outputBox.textContent.replace("❯ ", "").trim();
        copyToClipboard(cmd, "Command copied to clipboard!");
      });
    }

    const simBtn = document.getElementById("studioSimBtn");
    if (simBtn) {
      simBtn.addEventListener("click", () => {
        const cmd = this.outputBox.textContent.replace("❯ ", "").trim();
        if (window.terminalSim) {
          window.terminalSim.execute(cmd);
          document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });
          showToast(`Simulated: ${cmd}`);
        }
      });
    }
  }

  renderToolSelector() {
    const featured = [
      "img2webp", "vidglue", "vidglitch", "vidcuts", "videoeffects", "videorandfram",
      "vidoptim", "vid2webm", "vid2gif", "vid2audio", "videoWithoutAudio",
      "wav2tempo", "wavreverse", "wavpitch", "wavnorm", "wavfade", "wavtrim", "wavfx", "wav2mp3",
      "ytdl", "media-info"
    ];
    this.selectContainer.innerHTML = "";

    featured.forEach(id => {
      const tool = TOOLS_DATA.find(t => t.id === id);
      if (!tool) return;
      const btn = document.createElement("button");
      btn.className = `studio-tool-btn ${id === this.currentTool ? "active" : ""}`;
      btn.dataset.tool = id;
      btn.innerHTML = `
        <div class="studio-tool-thumb" aria-hidden="true">
          ${VISUAL_AIDS.getToolSvg(id)}
        </div>
        <div class="studio-tool-btn-info">
          <span><strong>${tool.name}</strong></span>
          <span class="btn-cat">${tool.category}</span>
        </div>
      `;
      btn.addEventListener("click", () => {
        this.selectTool(id);
      });
      this.selectContainer.appendChild(btn);
    });
  }

  selectTool(id) {
    this.currentTool = id;
    document.querySelectorAll(".studio-tool-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tool === id);
    });

    const tool = TOOLS_DATA.find(t => t.id === id);
    if (!tool) return;

    this.renderControls(tool);
    this.updateCommand();
  }

  renderEffectPicker(toolId, activeId, labelText = "Visual Effect Reference (Click to apply):") {
    const list = VISUAL_AIDS.effects[toolId];
    if (!list || list.length === 0) return "";

    const activeItem = list.find(e => e.id === activeId) || list[0];

    return `
      <div class="control-group" style="grid-column: 1 / -1;">
        <label class="control-label">
          <span>${labelText}</span>
          <span class="val-badge" id="c_active_effect_label">${activeItem.name}</span>
        </label>
        <div class="visual-effect-grid" id="visual_effect_grid">
          ${list.map(fx => `
            <div class="visual-effect-card ${fx.id === activeId ? 'active' : ''}" data-fx-id="${fx.id}" title="${fx.name}: ${fx.sub}">
              <div class="visual-effect-thumb">
                ${fx.svg}
              </div>
              <div class="visual-effect-meta">
                <span class="visual-effect-name">${fx.name}</span>
                <span class="visual-effect-sub">${fx.sub}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  bindEffectCards(selectElementId) {
    const grid = this.controlsContainer.querySelector("#visual_effect_grid");
    if (!grid) return;

    const selectEl = document.getElementById(selectElementId);

    grid.querySelectorAll(".visual-effect-card").forEach(card => {
      card.addEventListener("click", () => {
        const fxId = card.dataset.fxId;
        grid.querySelectorAll(".visual-effect-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        if (selectEl) {
          selectEl.value = fxId;
          selectEl.dispatchEvent(new Event("change"));
        } else {
          this.updateCommand();
        }
      });
    });

    if (selectEl) {
      selectEl.addEventListener("change", () => {
        const val = selectEl.value;
        grid.querySelectorAll(".visual-effect-card").forEach(c => {
          c.classList.toggle("active", c.dataset.fxId === val);
        });
      });
    }
  }

  renderWavOutputControls() {
    return `
      <div class="control-group">
        <label class="control-label">Output Format (-m / -b):</label>
        <select class="control-select" id="c_wav_outfmt">
          <option value="wav">WAV (Lossless 16-bit PCM)</option>
          <option value="mp3">MP3 192kbps (-m)</option>
          <option value="mp3_320">MP3 320kbps (-m -b 320)</option>
          <option value="mp3_128">MP3 128kbps (-m -b 128)</option>
        </select>
      </div>
    `;
  }

  appendWavOutputFlags(cmd) {
    const outFmt = document.getElementById("c_wav_outfmt")?.value || "wav";
    if (outFmt === "mp3") cmd += " -m";
    else if (outFmt === "mp3_320") cmd += " -m -b 320";
    else if (outFmt === "mp3_128") cmd += " -m -b 128";
    return cmd;
  }

  renderControls(tool) {
    const quickRecipesHtml = (tool.examples && tool.examples.length > 0) ? `
      <div class="studio-quick-recipes">
        <span class="studio-quick-recipes-label">⚡ Quick Recipes:</span>
        ${tool.examples.map(ex => `
          <button type="button" class="studio-recipe-pill" data-recipe-cmd="${ex.cmd.replace(/"/g, '&quot;')}" title="${ex.cmd}">
            <span>${ex.note}</span>
            <code>${ex.cmd.split(" ").slice(0, 3).join(" ")}…</code>
          </button>
        `).join("")}
      </div>
    ` : "";

    let html = `
      <div class="studio-tool-header">
        <div class="studio-tool-title">
          <div class="tool-card-visual-badge" style="width: 28px; height: 28px; min-width: 28px; padding: 2px;">
            ${VISUAL_AIDS.getToolSvg(tool.id)}
          </div>
          <span>${tool.name}</span>
        </div>
        <div class="studio-tool-summary">${tool.summary}</div>
      </div>

      ${quickRecipesHtml}

      <!-- Live Visual Reference Monitor -->
      <div class="studio-visual-monitor" id="studioVisualMonitor">
        <!-- Injected dynamically by updateVisualMonitor -->
      </div>

      <div class="controls-grid">
    `;

    if (tool.id === "img2webp") {
      html += `
        ${this.renderEffectPicker("img2webp", "lossy", "Compression Mode:")}
        <div class="control-group">
          <label class="control-label">Quality (0-100): <span class="val-badge" id="c_q_val">85</span></label>
          <input type="range" class="control-input" id="c_q" min="1" max="100" value="85">
        </div>
        <div class="control-group">
          <label class="control-label">Max Width (px):</label>
          <input type="number" class="control-input" id="c_width" placeholder="1200" value="1200">
        </div>
        <div class="control-group">
          <label class="control-label">Input Source:</label>
          <input type="text" class="control-input" id="c_input" value="photo.jpg">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_lossless"> Lossless Mode (-l)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_all"> All images in folder (-a)
          </label>
        </div>
      `;
    } else if (tool.id === "vidglue") {
      html += `
        ${this.renderEffectPicker("vidglue", "concat", "Merge / Layout Mode:")}
        <div class="control-group">
          <label class="control-label">Mode Selector:</label>
          <select class="control-select" id="c_mode">
            <option value="concat">Concatenate Files (Fast copy)</option>
            <option value="bounce">Bounce Loop (--bounce)</option>
            <option value="reencode">Smart Normalize (--reencode)</option>
            <option value="xfade">Crossfade Transition (-t fade)</option>
            <option value="hstack">Side-by-Side Split (--layout hstack)</option>
            <option value="2x2">Quad 2x2 Grid (--layout 2x2)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Aspect Fit (when re-encoding):</label>
          <select class="control-select" id="c_fit">
            <option value="pad">Black Bars (pad)</option>
            <option value="crop">Center Fill (crop)</option>
            <option value="blur">Blurred Background (blur)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Input Files:</label>
          <input type="text" class="control-input" id="c_input" value="part1.mp4 part2.mp4">
        </div>
        <div class="control-group">
          <label class="control-label">Loop Count (-l):</label>
          <input type="number" class="control-input" id="c_loop" min="1" max="10" value="1">
        </div>
      `;
    } else if (tool.id === "vidglitch") {
      html += `
        ${this.renderEffectPicker("vidglitch", "rgb-split", "Glitch Presets (Click to preview & apply):")}
        <div class="control-group">
          <label class="control-label">Preset Selector:</label>
          <select class="control-select" id="c_preset">
            <option value="rgb-split">RGB Split (Chromatic Aberration)</option>
            <option value="vhs">VHS Analog Tape + Tracking</option>
            <option value="crt">Arcade CRT Scanlines</option>
            <option value="8bit">8-bit Pixelated Retro</option>
            <option value="cyberpunk">Cyberpunk Neon Tearing</option>
            <option value="badsignal">Bad Signal Heavy Noise</option>
            <option value="tear">Data Glitch Tear</option>
            <option value="datamosh">Datamosh Motion Trails</option>
            <option value="nightvision">Tactical Nightvision</option>
            <option value="gameboy">GameBoy 4-Shade LCD</option>
            <option value="matrix">Matrix Code Phosphor</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Intensity:</label>
          <select class="control-select" id="c_intensity">
            <option value="med">Medium (Default)</option>
            <option value="low">Low (Subtle)</option>
            <option value="high">High (Extreme)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Video Input:</label>
          <input type="text" class="control-input" id="c_input" value="promo.mp4">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_organic_burst" checked> Organic Burst (--organic-burst)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_audio_glitch"> Audio Glitch (--audio-glitch)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_osd"> Camcorder HUD (--osd)
          </label>
        </div>
      `;
    } else if (tool.id === "vidcuts") {
      html += `
        ${this.renderEffectPicker("vidcuts", "frames", "Cut & Excision Mode:")}
        <div class="control-group">
          <label class="control-label">Cut Percentage: <span class="val-badge" id="c_pct_val">25%</span></label>
          <input type="range" class="control-input" id="c_pct" min="5" max="80" value="25">
        </div>
        <div class="control-group">
          <label class="control-label">Cut Mode Selector:</label>
          <select class="control-select" id="c_cut_mode">
            <option value="frames">Single Random Frames (Celluloid drops)</option>
            <option value="jumps">Micro-Chunks (~0.2s jump cuts)</option>
            <option value="stutter">Rapid Stutter Skips</option>
            <option value="freeze">Freeze-Hold (Keeps duration & audio!)</option>
            <option value="beat">BPM Rhythmic Cuts (--mode beat)</option>
            <option value="silence">Auto Strip Silence (--mode silence)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Video Input:</label>
          <input type="text" class="control-input" id="c_input" value="action.mp4">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_jitter" checked> Gate Jitter (--jitter)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_burn"> Film Burn (--film-burn)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_super8"> Super-8 Gate (--super8)
          </label>
        </div>
      `;
    } else if (tool.id === "videoeffects") {
      html += `
        ${this.renderEffectPicker("videoeffects", "cinema", "Cinematic Look Presets (Click to preview & apply):")}
        <div class="control-group">
          <label class="control-label">Color Look Preset:</label>
          <select class="control-select" id="c_fx_preset">
            <option value="cinema">Cinema (Teal & Orange)</option>
            <option value="noir">Film Noir (High-Contrast B&W)</option>
            <option value="vintage">Vintage 1970s Kodachrome</option>
            <option value="kodak">Kodak Golden 35mm</option>
            <option value="dream">Dreamy Highlight Bloom</option>
            <option value="synthwave">Synthwave Neon Split</option>
            <option value="thermal">Thermal Infrared Vision</option>
            <option value="bleach">Gritty Bleach Bypass</option>
            <option value="sepia">Historic 1890 Sepia</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Speed / Motion:</label>
          <select class="control-select" id="c_fx_speed">
            <option value="">1.0x Normal Speed</option>
            <option value="0.5">0.5x Slow Motion</option>
            <option value="2.0">2.0x Fast Forward</option>
            <option value="reverse">Reverse Playback (--reverse)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Mirror / Framing:</label>
          <select class="control-select" id="c_fx_extra">
            <option value="letterbox">2.35:1 CinemaScope Bars</option>
            <option value="mirror-quad">4-Way Kaleidoscope (--mirror quad)</option>
            <option value="tilt-shift">Miniature Tilt-Shift (--tilt-shift)</option>
            <option value="zoom-in">Ken Burns Push-In (--zoom in)</option>
            <option value="none">None</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Video Input:</label>
          <input type="text" class="control-input" id="c_input" value="cinema.mp4">
        </div>
      `;
    } else if (tool.id === "videorandfram") {
      html += `
        ${this.renderEffectPicker("videorandfram", "shuffle", "Randomization Presets:")}
        <div class="control-group">
          <label class="control-label">Randomization Preset:</label>
          <select class="control-select" id="c_vrf_preset">
            <option value="shuffle">Shuffle (30-frame balanced scramble)</option>
            <option value="jitter">Jitter (4-frame micro shutter tremor)</option>
            <option value="stutter">Stutter (14-frame stop-motion breakbeat)</option>
            <option value="vortex">Vortex (120-frame surreal time loop)</option>
            <option value="chaos">Chaos (300+ frame non-linear explosion)</option>
            <option value="flicker">Flicker (50/60fps frame alternation)</option>
            <option value="reverse">Reverse (8-frame periodic rewind chunks)</option>
            <option value="burst">Burst (Intermittent scramble bursts)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Audio Handling:</label>
          <select class="control-select" id="c_vrf_audio">
            <option value="keep">Keep Continuous Audio (--audio keep)</option>
            <option value="stutter">Tremolo Gating (--audio stutter)</option>
            <option value="crush">Bitcrush 8-bit (--audio crush)</option>
            <option value="mute">Mute Audio Track (--mute)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Extras & Flavor:</label>
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_vrf_trails"> Ghosting Trails (--trails 3)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_vrf_rgb"> Chromatic Aberration (--rgb-split 8)
          </label>
          <label class="control-checkbox-label" style="margin-top: 8px;">
            <input type="checkbox" id="c_vrf_grain"> Film Grain (--grain)
          </label>
        </div>
        <div class="control-group">
          <label class="control-label">Video Input:</label>
          <input type="text" class="control-input" id="c_input" value="clip.mp4">
        </div>
      `;
    } else if (tool.id === "vidoptim" || tool.id === "vid2webm" || tool.id === "vid2gif") {
      html += `
        <div class="control-group">
          <label class="control-label">CRF Quality (Lower = Better): <span class="val-badge" id="c_crf_val">23</span></label>
          <input type="range" class="control-input" id="c_crf" min="16" max="36" value="23">
        </div>
        <div class="control-group">
          <label class="control-label">Max Width (px, optional):</label>
          <input type="number" class="control-input" id="c_width" placeholder="1920">
        </div>
        <div class="control-group">
          <label class="control-label">Video Input:</label>
          <input type="text" class="control-input" id="c_input" value="clip.mp4">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_all"> All videos in folder (-a)
          </label>
        </div>
      `;
    } else if (tool.id === "vid2audio") {
      html += `
        <div class="control-group">
          <label class="control-label">Output Audio Format:</label>
          <select class="control-select" id="c_v2a_fmt">
            <option value="wav">WAV (Lossless PCM)</option>
            <option value="mp3">MP3 192kbps (--format mp3)</option>
            <option value="mp3_320">MP3 320kbps (--format mp3 -b 320)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Video Input:</label>
          <input type="text" class="control-input" id="c_input" value="interview.mp4">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_all"> All videos in folder (-a)
          </label>
        </div>
      `;
    } else if (tool.id === "wav2tempo") {
      html += `
        <div class="control-group">
          <label class="control-label">Target BPM:</label>
          <input type="number" class="control-input" id="c_target_bpm" value="128" placeholder="128">
        </div>
        <div class="control-group">
          <label class="control-label">Known Source BPM (optional):</label>
          <input type="number" class="control-input" id="c_source_bpm" placeholder="auto-detect">
        </div>
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Input WAV:</label>
          <input type="text" class="control-input" id="c_input" value="drumloop.wav">
        </div>
      `;
    } else if (tool.id === "wavreverse") {
      html += `
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Input WAV:</label>
          <input type="text" class="control-input" id="c_input" value="cymbal.wav">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_all"> All WAVs in folder (-a)
          </label>
        </div>
      `;
    } else if (tool.id === "wavpitch") {
      html += `
        <div class="control-group">
          <label class="control-label">Semitones: <span class="val-badge" id="c_semi_val">+2</span></label>
          <input type="range" class="control-input" id="c_semitones" min="-12" max="12" value="2">
        </div>
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Audio File:</label>
          <input type="text" class="control-input" id="c_input" value="vocal.wav">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_varispeed"> Tape Varispeed (Pitch + Tempo linked)
          </label>
        </div>
      `;
    } else if (tool.id === "wavnorm") {
      html += `
        ${this.renderEffectPicker("wavnorm", "lufs", "Loudness Target Standard:")}
        <div class="control-group">
          <label class="control-label">Normalization Standard:</label>
          <select class="control-select" id="c_norm_mode">
            <option value="lufs">EBU R128 Integrated LUFS</option>
            <option value="peak">Peak dBFS Normalization</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Target Value:</label>
          <input type="number" class="control-input" id="c_target_val" value="-14">
        </div>
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="podcast.wav">
        </div>
      `;
    } else if (tool.id === "wavfade") {
      html += `
        ${this.renderEffectPicker("wavfade", "qsin", "Fade Mathematical Curves:")}
        <div class="control-group">
          <label class="control-label">Fade In Duration (sec):</label>
          <input type="number" step="0.05" class="control-input" id="c_fade_in" value="0.1">
        </div>
        <div class="control-group">
          <label class="control-label">Fade Out Duration (sec):</label>
          <input type="number" step="0.05" class="control-input" id="c_fade_out" value="0.2">
        </div>
        <div class="control-group">
          <label class="control-label">Curve Type Selector:</label>
          <select class="control-select" id="c_curve">
            <option value="qsin">Quarter Sine (qsin)</option>
            <option value="tri">Linear Triangle (tri)</option>
            <option value="esin">Exponential Sine (esin)</option>
            <option value="log">Logarithmic (log)</option>
          </select>
        </div>
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="sample.wav">
        </div>
      `;
    } else if (tool.id === "wavtrim") {
      html += `
        <div class="control-group">
          <label class="control-label">Threshold (dB):</label>
          <input type="text" class="control-input" id="c_threshold" value="-50dB">
        </div>
        <div class="control-group">
          <label class="control-label">Scope:</label>
          <select class="control-select" id="c_trim_scope">
            <option value="both">Both Ends (Start & End)</option>
            <option value="start">Start Only (--start-only)</option>
            <option value="end">End Only (--end-only)</option>
          </select>
        </div>
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="recording.wav">
        </div>
      `;
    } else if (tool.id === "wavfx") {
      html += `
        ${this.renderEffectPicker("wavfx", "room", "Acoustic Space Reverb Presets:")}
        <div class="control-group">
          <label class="control-label">Reverb Preset:</label>
          <select class="control-select" id="c_reverb">
            <option value="none">None</option>
            <option value="room" selected>Warm Room</option>
            <option value="hall">Spacious Hall</option>
            <option value="space">Deep Space</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Echo Delay (ms):</label>
          <input type="number" class="control-input" id="c_delay" placeholder="e.g. 250" value="250">
        </div>
        <div class="control-group">
          <label class="control-label">Lowpass Filter (Hz):</label>
          <input type="number" class="control-input" id="c_lowpass" placeholder="e.g. 800">
        </div>
        ${this.renderWavOutputControls()}
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="loop.wav">
        </div>
      `;
    } else if (tool.id === "wav2mp3") {
      html += `
        <div class="control-group">
          <label class="control-label">MP3 Bitrate (kbps):</label>
          <select class="control-select" id="c_w2m_bitrate">
            <option value="192">192 kbps (Standard)</option>
            <option value="320" selected>320 kbps (Mastering / Archival)</option>
            <option value="128">128 kbps (Compact Voice)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Input WAV:</label>
          <input type="text" class="control-input" id="c_input" value="master.wav">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_all"> All WAVs in folder (-a)
          </label>
        </div>
      `;
    } else if (tool.id === "ytdl") {
      html += `
        ${this.renderEffectPicker("ytdl", "mp4", "Target Media Format:")}
        <div class="control-group">
          <label class="control-label">Format:</label>
          <select class="control-select" id="c_format">
            <option value="mp4">Video MP4</option>
            <option value="mp3">Audio MP3</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Destination Folder:</label>
          <input type="text" class="control-input" id="c_outdir" value="~/Downloads">
        </div>
        <div class="control-group">
          <label class="control-label">Target URL (Leave empty for clipboard):</label>
          <input type="text" class="control-input" id="c_url" placeholder="https://youtube.com/watch?v=...">
        </div>
        <div class="control-group" style="justify-content: center;">
          <label class="control-checkbox-label">
            <input type="checkbox" id="c_subtitles"> Embed Subtitles
          </label>
        </div>
      `;
    } else {
      html += `
        <div class="control-group">
          <label class="control-label">Input Files:</label>
          <input type="text" class="control-input" id="c_input" value="input.mp4">
        </div>
      `;
    }

    html += `</div>`;
    this.controlsContainer.innerHTML = html;

    // Bind quick recipe pills
    this.controlsContainer.querySelectorAll(".studio-recipe-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const recipeCmd = pill.dataset.recipeCmd;
        if (recipeCmd && this.outputBox) {
          this.outputBox.innerHTML = `<span class="prompt-symbol">❯</span> ${recipeCmd}`;
          copyToClipboard(recipeCmd, "Preset recipe loaded & copied!");
        }
      });
    });

    // Connect visual effect card grids to select dropdowns
    if (tool.id === "videoeffects") this.bindEffectCards("c_fx_preset");
    else if (tool.id === "vidglitch") this.bindEffectCards("c_preset");
    else if (tool.id === "vidcuts") this.bindEffectCards("c_cut_mode");
    else if (tool.id === "vidglue") this.bindEffectCards("c_mode");
    else if (tool.id === "videorandfram") this.bindEffectCards("c_vrf_preset");
    else if (tool.id === "wavfade") this.bindEffectCards("c_curve");
    else if (tool.id === "wavfx") this.bindEffectCards("c_reverb");
    else if (tool.id === "wavnorm") this.bindEffectCards("c_norm_mode");
    else if (tool.id === "ytdl") this.bindEffectCards("c_format");
    else if (tool.id === "img2webp") {
      const grid = this.controlsContainer.querySelector("#visual_effect_grid");
      const losslessCheckbox = document.getElementById("c_lossless");
      if (grid && losslessCheckbox) {
        grid.querySelectorAll(".visual-effect-card").forEach(c => {
          c.addEventListener("click", () => {
            const isLossless = c.dataset.fxId === "lossless";
            grid.querySelectorAll(".visual-effect-card").forEach(x => x.classList.remove("active"));
            c.classList.add("active");
            losslessCheckbox.checked = isLossless;
            losslessCheckbox.dispatchEvent(new Event("change"));
          });
        });
        losslessCheckbox.addEventListener("change", () => {
          const target = losslessCheckbox.checked ? "lossless" : "lossy";
          grid.querySelectorAll(".visual-effect-card").forEach(x => {
            x.classList.toggle("active", x.dataset.fxId === target);
          });
        });
      }
    }

    // Attach dynamic listeners to inputs & selects
    this.controlsContainer.querySelectorAll("input, select").forEach(el => {
      el.addEventListener("input", () => this.updateCommand());
      el.addEventListener("change", () => this.updateCommand());
    });

    this.updateVisualMonitor(tool);
  }

  updateVisualMonitor(tool = null) {
    const monitor = document.getElementById("studioVisualMonitor");
    if (!monitor) return;

    const toolObj = tool || TOOLS_DATA.find(t => t.id === this.currentTool) || { id: this.currentTool, name: this.currentTool, category: "core" };
    let effectId = "default";

    if (this.currentTool === "videoeffects") {
      effectId = document.getElementById("c_fx_preset")?.value || "cinema";
    } else if (this.currentTool === "vidglitch") {
      effectId = document.getElementById("c_preset")?.value || "rgb-split";
    } else if (this.currentTool === "vidcuts") {
      effectId = document.getElementById("c_cut_mode")?.value || "frames";
    } else if (this.currentTool === "vidglue") {
      effectId = document.getElementById("c_mode")?.value || "concat";
    } else if (this.currentTool === "videorandfram") {
      effectId = document.getElementById("c_vrf_preset")?.value || "shuffle";
    } else if (this.currentTool === "wavfade") {
      effectId = document.getElementById("c_curve")?.value || "qsin";
    } else if (this.currentTool === "wavfx") {
      effectId = document.getElementById("c_reverb")?.value || "room";
    } else if (this.currentTool === "wavnorm") {
      effectId = document.getElementById("c_norm_mode")?.value || "lufs";
    } else if (this.currentTool === "img2webp") {
      effectId = document.getElementById("c_lossless")?.checked ? "lossless" : "lossy";
    } else if (this.currentTool === "ytdl") {
      effectId = document.getElementById("c_format")?.value || "mp4";
    }

    const data = VISUAL_AIDS.getEffectData(this.currentTool, effectId);
    const activeLabel = document.getElementById("c_active_effect_label");
    if (activeLabel && data.name) activeLabel.textContent = data.name;

    monitor.innerHTML = `
      <div class="monitor-screen-wrap">
        <div class="monitor-screen-overlay">
          <span class="monitor-screen-badge rec">● LIVE REF</span>
          <span class="monitor-screen-badge">${data.badge || this.currentTool.toUpperCase()}</span>
        </div>
        <div class="monitor-screen-art">
          ${data.svg}
        </div>
      </div>
      <div class="monitor-spec-pane">
        <div class="monitor-spec-head">
          <div>
            <div class="monitor-spec-title">${data.name}</div>
            <div class="monitor-spec-sub" style="font-size: 0.75rem; color: var(--color-terminal-green); font-family: var(--font-mono); margin-top: 2px;">
              ${data.sub}
            </div>
          </div>
          <span class="monitor-spec-badge">${toolObj.category}</span>
        </div>
        <p class="monitor-spec-desc">${data.desc}</p>
        <div class="monitor-spec-details">
          <div><strong>FILTER GRAPH:</strong> <code>${data.filter}</code></div>
          <div><strong>RECOMMENDED FOR:</strong> ${data.useCase}</div>
        </div>
      </div>
    `;
  }

  updateCommand() {
    let cmd = this.currentTool;

    if (this.currentTool === "img2webp") {
      const q = document.getElementById("c_q")?.value || "85";
      const qValBadge = document.getElementById("c_q_val");
      if (qValBadge) qValBadge.textContent = q;

      const w = document.getElementById("c_width")?.value;
      const lossless = document.getElementById("c_lossless")?.checked;
      const all = document.getElementById("c_all")?.checked;
      const inp = document.getElementById("c_input")?.value || "photo.jpg";

      if (lossless) cmd += " -l";
      if (q && !lossless) cmd += ` -q ${q}`;
      if (w) cmd += ` --width ${w}`;
      if (all) cmd += " -a";
      if (!all && inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "vidglue") {
      const mode = document.getElementById("c_mode")?.value;
      const fit = document.getElementById("c_fit")?.value;
      const loop = document.getElementById("c_loop")?.value;
      const inp = document.getElementById("c_input")?.value || "part1.mp4 part2.mp4";

      if (mode === "bounce") cmd += " --bounce";
      if (mode === "reencode") cmd += " --reencode";
      if (mode === "xfade") cmd += " -t fade";
      if (mode === "hstack" || mode === "2x2") cmd += ` --layout ${mode}`;
      if (fit && fit !== "pad" && mode !== "concat") cmd += ` --fit ${fit}`;
      if (loop && parseInt(loop, 10) > 1) cmd += ` -l ${loop}`;
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "vidglitch") {
      const preset = document.getElementById("c_preset")?.value || "rgb-split";
      const intensity = document.getElementById("c_intensity")?.value || "med";
      const orgBurst = document.getElementById("c_organic_burst")?.checked;
      const audioGlitch = document.getElementById("c_audio_glitch")?.checked;
      const osd = document.getElementById("c_osd")?.checked;
      const inp = document.getElementById("c_input")?.value || "promo.mp4";

      cmd += ` --preset ${preset}`;
      if (intensity !== "med") cmd += ` -I ${intensity}`;
      if (orgBurst) cmd += " --organic-burst";
      if (audioGlitch) cmd += " --audio-glitch";
      if (osd) cmd += " --osd";
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "vidcuts") {
      const pct = document.getElementById("c_pct")?.value || "25";
      const pctBadge = document.getElementById("c_pct_val");
      if (pctBadge) pctBadge.textContent = `${pct}%`;

      const mode = document.getElementById("c_cut_mode")?.value;
      const jitter = document.getElementById("c_jitter")?.checked;
      const burn = document.getElementById("c_burn")?.checked;
      const super8 = document.getElementById("c_super8")?.checked;
      const inp = document.getElementById("c_input")?.value || "action.mp4";

      if (mode !== "silence") cmd += ` -p ${pct}`;
      if (mode && mode !== "frames") cmd += ` --mode ${mode}`;
      if (jitter) cmd += " --jitter";
      if (burn) cmd += " --film-burn";
      if (super8) cmd += " --super8";
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "videoeffects") {
      const preset = document.getElementById("c_fx_preset")?.value || "cinema";
      const speed = document.getElementById("c_fx_speed")?.value || "";
      const extra = document.getElementById("c_fx_extra")?.value || "";
      const inp = document.getElementById("c_input")?.value || "cinema.mp4";

      if (preset) cmd += ` --preset ${preset}`;
      if (speed === "reverse") cmd += " --reverse";
      else if (speed) cmd += ` --speed ${speed}`;
      if (extra === "letterbox") cmd += " --letterbox 2.35";
      else if (extra === "mirror-quad") cmd += " --mirror quad";
      else if (extra === "tilt-shift") cmd += " --tilt-shift";
      else if (extra === "zoom-in") cmd += " --zoom in";
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "videorandfram") {
      const preset = document.getElementById("c_vrf_preset")?.value || "shuffle";
      const audio = document.getElementById("c_vrf_audio")?.value || "keep";
      const trails = document.getElementById("c_vrf_trails")?.checked;
      const rgb = document.getElementById("c_vrf_rgb")?.checked;
      const grain = document.getElementById("c_vrf_grain")?.checked;
      const inp = document.getElementById("c_input")?.value || "clip.mp4";

      if (preset && preset !== "shuffle") cmd += ` -p ${preset}`;
      if (audio === "mute") cmd += " --mute";
      else if (audio && audio !== "keep") cmd += ` --audio ${audio}`;
      if (trails) cmd += " --trails 3";
      if (rgb) cmd += " --rgb-split 8";
      if (grain) cmd += " --grain";
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "vidoptim" || this.currentTool === "vid2webm" || this.currentTool === "vid2gif") {
      const crf = document.getElementById("c_crf")?.value || "23";
      const crfBadge = document.getElementById("c_crf_val");
      if (crfBadge) crfBadge.textContent = crf;
      const w = document.getElementById("c_width")?.value;
      const all = document.getElementById("c_all")?.checked;
      const inp = document.getElementById("c_input")?.value || "clip.mp4";

      if (this.currentTool !== "vid2gif" && crf !== "23") cmd += ` --crf ${crf}`;
      if (w) cmd += ` --width ${w}`;
      if (all) cmd += " -a";
      if (!all && inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "vid2audio") {
      const fmt = document.getElementById("c_v2a_fmt")?.value || "wav";
      const all = document.getElementById("c_all")?.checked;
      const inp = document.getElementById("c_input")?.value || "interview.mp4";

      if (fmt === "mp3") cmd += " --format mp3";
      else if (fmt === "mp3_320") cmd += " --format mp3 -b 320";
      if (all) cmd += " -a";
      if (!all && inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wav2tempo") {
      const tbpm = document.getElementById("c_target_bpm")?.value;
      const sbpm = document.getElementById("c_source_bpm")?.value;
      const inp = document.getElementById("c_input")?.value || "drumloop.wav";

      if (tbpm) cmd += ` --target-bpm ${tbpm}`;
      if (sbpm) cmd += ` --bpm ${sbpm}`;
      cmd = this.appendWavOutputFlags(cmd);
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavreverse") {
      const all = document.getElementById("c_all")?.checked;
      const inp = document.getElementById("c_input")?.value || "cymbal.wav";

      cmd = this.appendWavOutputFlags(cmd);
      if (all) cmd += " -a";
      if (!all && inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavpitch") {
      const semi = document.getElementById("c_semitones")?.value || "2";
      const semiBadge = document.getElementById("c_semi_val");
      if (semiBadge) semiBadge.textContent = (semi > 0 ? `+${semi}` : semi);

      const varispeed = document.getElementById("c_varispeed")?.checked;
      const inp = document.getElementById("c_input")?.value || "vocal.wav";

      if (varispeed) cmd += " --varispeed";
      cmd += ` -s ${semi > 0 ? `+${semi}` : semi}`;
      cmd = this.appendWavOutputFlags(cmd);
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavnorm") {
      const mode = document.getElementById("c_norm_mode")?.value;
      const val = document.getElementById("c_target_val")?.value || "-14";
      const inp = document.getElementById("c_input")?.value || "podcast.wav";

      if (mode === "lufs") cmd += ` --lufs ${val}`;
      else cmd += ` --peak ${val}`;
      cmd = this.appendWavOutputFlags(cmd);
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavfade") {
      const fi = document.getElementById("c_fade_in")?.value;
      const fo = document.getElementById("c_fade_out")?.value;
      const curve = document.getElementById("c_curve")?.value;
      const inp = document.getElementById("c_input")?.value || "sample.wav";

      if (fi) cmd += ` -i ${fi}`;
      if (fo) cmd += ` -o ${fo}`;
      if (curve && curve !== "qsin") cmd += ` --curve ${curve}`;
      cmd = this.appendWavOutputFlags(cmd);
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavtrim") {
      const th = document.getElementById("c_threshold")?.value;
      const scope = document.getElementById("c_trim_scope")?.value;
      const inp = document.getElementById("c_input")?.value || "recording.wav";

      if (th) cmd += ` --threshold ${th}`;
      if (scope === "start") cmd += " --start-only";
      if (scope === "end") cmd += " --end-only";
      cmd = this.appendWavOutputFlags(cmd);
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavfx") {
      const rev = document.getElementById("c_reverb")?.value;
      const del = document.getElementById("c_delay")?.value;
      const lp = document.getElementById("c_lowpass")?.value;
      const inp = document.getElementById("c_input")?.value || "loop.wav";

      if (rev && rev !== "none") cmd += ` --reverb ${rev}`;
      if (del) cmd += ` --delay ${del}`;
      if (lp) cmd += ` --lowpass ${lp}`;
      cmd = this.appendWavOutputFlags(cmd);
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wav2mp3") {
      const br = document.getElementById("c_w2m_bitrate")?.value || "320";
      const all = document.getElementById("c_all")?.checked;
      const inp = document.getElementById("c_input")?.value || "master.wav";

      if (br !== "192") cmd += ` -b ${br}`;
      if (all) cmd += " -a";
      if (!all && inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "ytdl") {
      const fmt = document.getElementById("c_format")?.value;
      const outdir = document.getElementById("c_outdir")?.value;
      const sub = document.getElementById("c_subtitles")?.checked;
      const url = document.getElementById("c_url")?.value;

      if (fmt && fmt !== "mp4") cmd += ` --format ${fmt}`;
      if (outdir && outdir !== "~/Downloads") cmd += ` --output-dir ${outdir}`;
      if (sub) cmd += " --subtitles";
      if (url) cmd += ` '${url}'`;
    }

    if (this.outputBox) {
      this.outputBox.innerHTML = `<span class="prompt-symbol">❯</span> ${cmd}`;
    }

    this.updateVisualMonitor();
  }
}
// ============================================================================
// 4. Interactive Visual Labs (Audio Waveform & Glitch Canvas)
// ============================================================================
class AudioWaveformLab {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.mode = "normal"; // normal, fade, trim, pitch
    this.animationFrame = null;
    this.t = 0;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());

    document.querySelectorAll(".audio-btn").forEach(btn => {
      const mode = btn.dataset.mode;
      if (!btn.querySelector(".lab-btn-thumb")) {
        const thumb = document.createElement("span");
        thumb.className = "lab-btn-thumb";
        let svg = "";
        if (mode === "fade") svg = `<svg viewBox="0 0 20 12" fill="none"><path d="M 2 10 Q 7 10 10 6 T 18 2" stroke="#ffb703" stroke-width="1.8" fill="none"/></svg>`;
        else if (mode === "trim") svg = `<svg viewBox="0 0 20 12" fill="none"><path d="M 4 6 L 6 3 L 8 9 L 10 4 L 12 8 L 14 6" stroke="#64748b" stroke-width="1.5" fill="none"/><line x1="4" y1="2" x2="4" y2="10" stroke="#ff3344" stroke-width="1" stroke-dasharray="1,1"/><line x1="16" y1="2" x2="16" y2="10" stroke="#ff3344" stroke-width="1" stroke-dasharray="1,1"/></svg>`;
        else if (mode === "pitch") svg = `<svg viewBox="0 0 20 12" fill="none"><path d="M 2 6 Q 6 1 10 6 T 18 6" stroke="#38bdf8" stroke-width="1.8" fill="none"/></svg>`;
        else svg = `<svg viewBox="0 0 20 12" fill="none"><path d="M 2 6 L 5 2 L 8 10 L 11 3 L 14 9 L 18 6" stroke="#00f59b" stroke-width="1.8" fill="none"/></svg>`;
        thumb.innerHTML = svg;
        btn.prepend(thumb);
      }
      btn.addEventListener("click", () => {
        document.querySelectorAll(".audio-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.mode = btn.dataset.mode;
      });
    });

    this.render();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    this.width = rect.width;
    this.height = rect.height;
  }

  render() {
    this.t += 0.04;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const midY = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Draw center technical grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    // Bars count
    const numBars = Math.floor(w / 7);
    const barWidth = 4;
    const gap = 3;

    for (let i = 0; i < numBars; i++) {
      const x = i * (barWidth + gap);
      const normX = i / numBars; // 0.0 to 1.0

      // Base synthetic waveform amplitude
      let amp = Math.sin(normX * 18 + this.t) * 0.4 +
                Math.sin(normX * 36 - this.t * 1.5) * 0.3 +
                Math.cos(normX * 6 + this.t * 0.5) * 0.3;
      amp = Math.abs(amp);

      // Apply effect modifiers
      if (this.mode === "fade") {
        // Enforce fade in first 20%, fade out last 25%
        let envelope = 1.0;
        if (normX < 0.2) envelope = normX / 0.2;
        else if (normX > 0.75) envelope = (1.0 - normX) / 0.25;
        amp *= envelope;
      } else if (this.mode === "trim") {
        // Flat silence at edges
        if (normX < 0.15 || normX > 0.85) {
          amp = 0.01;
        } else {
          amp *= 1.25;
        }
      } else if (this.mode === "pitch") {
        // Higher frequency oscillations
        amp = Math.abs(Math.sin(normX * 42 + this.t * 2.2) * 0.6 + Math.cos(normX * 80 + this.t) * 0.35);
      }

      const barHeight = Math.max(3, amp * (h * 0.78));

      // Bar color
      if (this.mode === "trim" && (normX < 0.15 || normX > 0.85)) {
        ctx.fillStyle = "rgba(100, 116, 139, 0.3)";
      } else if (this.mode === "fade" && (normX < 0.2 || normX > 0.75)) {
        ctx.fillStyle = "#ffb703";
      } else if (this.mode === "pitch") {
        ctx.fillStyle = "#38bdf8";
      } else {
        ctx.fillStyle = "#00f59b";
      }

      ctx.fillRect(x, midY - barHeight / 2, barWidth, barHeight);
    }

    this.animationFrame = requestAnimationFrame(() => this.render());
  }
}

// ============================================================================
// 5. Glitch Visual Lab Controller
// ============================================================================
class GlitchLab {
  constructor(screenContentId) {
    this.content = document.getElementById(screenContentId);
    this.init();
  }

  init() {
    if (!this.content) return;
    document.querySelectorAll(".glitch-btn").forEach(btn => {
      const preset = btn.dataset.preset;
      if (!btn.querySelector(".lab-btn-thumb")) {
        const thumb = document.createElement("span");
        thumb.className = "lab-btn-thumb";
        thumb.innerHTML = VISUAL_AIDS.getEffectSvg("vidglitch", preset);
        btn.prepend(thumb);
      }
      btn.addEventListener("click", () => {
        document.querySelectorAll(".glitch-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.setPreset(preset);
      });
    });
  }

  setPreset(preset) {
    this.content.className = `glitch-screen-content preset-${preset}`;
    const sub = this.content.querySelector(".sub");
    if (sub) {
      sub.textContent = `PRESET: ${preset.toUpperCase()} [FFMPEG ACTIVE]`;
    }
  }
}

// ============================================================================
// 6. Tool Catalog Renderer & Live Search
// ============================================================================
class CatalogController {
  constructor(gridId, searchInputId, tabsContainerId) {
    this.grid = document.getElementById(gridId);
    this.searchInput = document.getElementById(searchInputId);
    this.tabsContainer = document.getElementById(tabsContainerId);
    this.currentCategory = "all";
    this.searchQuery = "";
    this.init();
  }

  init() {
    if (!this.grid) return;
    this.renderTabs();
    this.renderCards();

    const searchBox = this.searchInput?.closest(".search-box");
    const clearBtn = document.getElementById("catalogSearchClearBtn");

    const updateSearchState = () => {
      this.searchQuery = this.searchInput?.value.toLowerCase().trim() || "";
      if (searchBox) {
        searchBox.classList.toggle("has-query", !!this.searchQuery);
      }
      this.renderCards();
    };

    if (this.searchInput) {
      this.searchInput.addEventListener("input", updateSearchState);
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (this.searchInput) {
          this.searchInput.value = "";
          updateSearchState();
          this.searchInput.focus();
        }
      });
    }

    // Keyboard shortcut '/' to focus search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.searchInput && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        this.searchInput?.focus();
      } else if (e.key === "Escape") {
        if (this.searchInput && document.activeElement === this.searchInput) {
          this.searchInput.value = "";
          updateSearchState();
          this.searchInput.blur();
        }
        closeModal();
      }
    });
  }

  renderTabs() {
    const categories = [
      { id: "all", name: "All Tools" },
      { id: "video", name: "Video" },
      { id: "audio", name: "Audio" },
      { id: "image", name: "Image" },
      { id: "web", name: "Web / yt-dlp" },
      { id: "inspect", name: "Inspection" },
      { id: "finder", name: "Finder & Bookmarks" },
      { id: "core", name: "System & Core" }
    ];

    this.tabsContainer.innerHTML = "";

    categories.forEach(cat => {
      const count = cat.id === "all" 
        ? TOOLS_DATA.length 
        : TOOLS_DATA.filter(t => t.category === cat.id).length;

      const btn = document.createElement("button");
      btn.className = `cat-tab ${cat.id === this.currentCategory ? "active" : ""}`;
      btn.innerHTML = `${cat.name} <span class="tab-count">(${count})</span>`;
      btn.addEventListener("click", () => {
        this.currentCategory = cat.id;
        document.querySelectorAll(".cat-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.renderCards();
      });
      this.tabsContainer.appendChild(btn);
    });
  }

  renderCards() {
    const filtered = TOOLS_DATA.filter(tool => {
      const matchesCat = this.currentCategory === "all" || tool.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        tool.name.toLowerCase().includes(this.searchQuery) ||
        tool.summary.toLowerCase().includes(this.searchQuery) ||
        tool.details.toLowerCase().includes(this.searchQuery) ||
        tool.flags.some(f => f.flag.toLowerCase().includes(this.searchQuery) || f.desc.toLowerCase().includes(this.searchQuery));
      return matchesCat && matchesSearch;
    });

    this.grid.innerHTML = "";

    if (filtered.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1/-1; padding: 3rem; text-align: center; font-family: var(--font-mono); color: var(--text-muted); border: 2px dashed var(--border-bold); border-radius: var(--radius-sm);">
          🔍 No tools matching "<span style="color: var(--color-accent-green-surface);">${this.searchQuery}</span>". Press Esc to clear search.
        </div>
      `;
      return;
    }

    filtered.forEach(tool => {
      const card = document.createElement("div");
      card.className = "tool-card";
      card.id = `tool-${tool.id}`;

      let catBadgeClass = "badge-blue";
      if (tool.category === "video") catBadgeClass = "badge-red";
      else if (tool.category === "audio") catBadgeClass = "badge-green";
      else if (tool.category === "image") catBadgeClass = "badge-yellow";

      const topExample = tool.examples[0] || { cmd: tool.signature, note: "" };

      card.innerHTML = `
        <div>
          <div class="tool-card-head">
            <div class="tool-card-identity">
              <div class="tool-card-visual-badge" title="${tool.name} visual signature">
                ${VISUAL_AIDS.getToolSvg(tool.id)}
              </div>
              <div class="tool-name-wrap">
                <div class="tool-name">${tool.name}</div>
                <div class="tool-cmd-signature">${tool.signature}</div>
              </div>
            </div>
            <span class="tool-category-badge ${catBadgeClass}">${tool.category}</span>
          </div>
          <p class="tool-desc" style="margin-top: 0.85rem;">${tool.summary}</p>
        </div>

        <div>
          <div class="tool-flags-wrap" style="margin-bottom: 0.85rem;">
            ${tool.flags.slice(0, 3).map(f => `<span class="flag-pill"><strong>${f.flag.split(' ')[0]}</strong></span>`).join("")}
            ${tool.flags.length > 3 ? `<span class="flag-pill">+${tool.flags.length - 3} more</span>` : ""}
          </div>

          <div class="code-box">
            <div class="code-content"><span class="code-prompt">❯</span>${topExample.cmd}</div>
            <button class="copy-mini-btn" title="Copy command" data-copy="${topExample.cmd}">COPY</button>
          </div>
        </div>

        <div class="tool-card-footer">
          <button class="tool-doc-link" data-tool="${tool.id}">
            <span>Full Guide & Options</span> <span>→</span>
          </button>
          <button class="studio-load-btn" data-load="${tool.id}">
            Studio
          </button>
        </div>
      `;

      // Copy mini button
      card.querySelector(".copy-mini-btn")?.addEventListener("click", (e) => {
        const text = e.target.dataset.copy;
        copyToClipboard(text, "Command copied!");
      });

      // View details in modal
      card.querySelector(".tool-doc-link")?.addEventListener("click", () => {
        openModal(tool);
      });

      // Load in command studio
      card.querySelector(".studio-load-btn")?.addEventListener("click", () => {
        window.commandStudio?.selectTool(tool.id);
        document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
      });

      this.grid.appendChild(card);
    });
  }
}

// ============================================================================
// 6.5 Short Code Sheets & One-Liner Recipes Controller
// ============================================================================
const CHEATSHEET_DATA = [
  // Video
  { category: "video", tool: "videoeffects", alias: "vidfx", goal: "Cinematic Teal & Orange grade + 2.35:1 CinemaScope bars", cmd: "videoeffects --preset cinema --letterbox 2.35 clip.mp4" },
  { category: "video", tool: "videoeffects", alias: "vidfx", goal: "Vintage 1970s Kodachrome + 4-way kaleidoscope mirror", cmd: "vidfx --preset vintage --mirror quad --fade-in 1.0 clip.mp4" },
  { category: "video", tool: "videoeffects", alias: "vidfx", goal: "Half-speed dreamy slow-motion with highlight bloom", cmd: "vidfx --speed 0.5 --preset dream --vignette clip.mp4" },
  { category: "video", tool: "vidglitch", alias: "videoglitch", goal: "Cyberpunk neon tearing + organic bursts + audio stutter", cmd: "vidglitch --preset cyberpunk --organic-burst --audio-glitch clip.mp4" },
  { category: "video", tool: "vidglitch", alias: "videoglitch", goal: "1990s VHS tape tracking with camcorder HUD overlay", cmd: "vidglitch --preset vhs --osd -I high clip.mp4" },
  { category: "video", tool: "vidcuts", alias: "videocuts", goal: "Auto-strip dead air / silence pauses from vlogs or lectures", cmd: "vidcuts --mode silence clip.mp4" },
  { category: "video", tool: "vidcuts", alias: "videocuts", goal: "Freeze-hold 20% cuts with film burn & Super-8 gate (keeps audio sync)", cmd: "vidcuts -p 20 --mode freeze --film-burn --super8 clip.mp4" },
  { category: "video", tool: "vidcuts", alias: "videocuts", goal: "BPM-synced rhythmic jump cuts using aubio beat detection", cmd: "vidcuts -p 30 --mode beat clip.mp4" },
  { category: "video", tool: "vidglue", alias: "videoglue", goal: "Crossfade two clips with 0.8s smooth fade transition", cmd: "vidglue -t fade -d 0.8 part1.mp4 part2.mp4" },
  { category: "video", tool: "vidglue", alias: "videoglue", goal: "Seamless forward + backward boomerang loop", cmd: "vidglue --bounce clip.mp4" },
  { category: "video", tool: "vidglue", alias: "videoglue", goal: "2x2 Quad Split-Screen grid from 4 clips", cmd: "vidglue --layout 2x2 a.mp4 b.mp4 c.mp4 d.mp4" },
  { category: "video", tool: "videorandfram", alias: "vidrandfram", goal: "Stutter stop-motion frame scramble with ghosting trails", cmd: "videorandfram -p stutter --trails 3 --rgb-split 8 clip.mp4" },
  { category: "video", tool: "vidoptim", alias: "", goal: "Shrink MP4 size (H.264 CRF 23, max 1920px, web-ready)", cmd: "vidoptim --crf 23 --width 1920 clip.mp4" },
  { category: "video", tool: "vid2gif", alias: "", goal: "High-color two-pass palette GIF (480px, 12fps)", cmd: "vid2gif --width 480 --fps 12 clip.mp4" },
  { category: "video", tool: "vid2webm", alias: "", goal: "Convert MP4 to VP9/Opus WebM for modern browsers", cmd: "vid2webm -q 30 --width 1280 clip.mp4" },
  { category: "video", tool: "videoWithoutAudio", alias: "", goal: "Instant lossless audio strip (stream copy, zero re-encoding)", cmd: "videoWithoutAudio -a" },

  // Audio (WAV & MP3)
  { category: "audio", tool: "wavnorm", alias: "", goal: "Normalize podcast to -16 LUFS and export directly as MP3", cmd: "wavnorm -m -l -16 podcast.wav" },
  { category: "audio", tool: "wavnorm", alias: "", goal: "Batch normalize folder to -14 LUFS (Spotify/YouTube standard)", cmd: "wavnorm -a -l -14" },
  { category: "audio", tool: "wav2tempo", alias: "", goal: "Time-stretch drum loop to 128 BPM and save as 320kbps MP3", cmd: "wav2tempo -t 128 -m -b 320 drumloop.wav" },
  { category: "audio", tool: "wav2tempo", alias: "", goal: "Stretch loop from known 90 BPM to 120 BPM (lossless WAV)", cmd: "wav2tempo -b 90 -t 120 sample.wav" },
  { category: "audio", tool: "wavpitch", alias: "", goal: "Shift vocal up +3 semitones (tempo preserved) and save as MP3", cmd: "wavpitch -s +3 -m vocal.wav" },
  { category: "audio", tool: "wavpitch", alias: "", goal: "Analog tape varispeed drop (-5 semitones, slower & deeper)", cmd: "wavpitch -s -5 --varispeed -m synth.wav" },
  { category: "audio", tool: "wavtrim", alias: "", goal: "Trim leading & trailing silence (-45dB) and export as MP3", cmd: "wavtrim -m --threshold -45dB recording.wav" },
  { category: "audio", tool: "wavfade", alias: "", goal: "De-pop sample edges (100ms in / 250ms out) and export as MP3", cmd: "wavfade -i 0.1 -o 0.25 -m sample.wav" },
  { category: "audio", tool: "wavfx", alias: "", goal: "Spacious concert hall reverb + 300ms slapback delay to MP3", cmd: "wavfx --reverb hall --delay 300 -m vocal.wav" },
  { category: "audio", tool: "wavfx", alias: "", goal: "Lo-Fi underwater lowpass filter (900Hz) + bass boost", cmd: "wavfx --lowpass 900 --bass +5 -m loop.wav" },
  { category: "audio", tool: "wavreverse", alias: "", goal: "Reverse cymbal/riser audio and export directly to MP3", cmd: "wavreverse -m cymbal.wav" },
  { category: "audio", tool: "wav2mp3", alias: "", goal: "Batch convert all WAV files in folder to 320kbps MP3", cmd: "wav2mp3 -a -b 320" },
  { category: "audio", tool: "vid2audio", alias: "", goal: "Extract video soundtrack directly to 320kbps MP3", cmd: "vid2audio --format mp3 -b 320 interview.mp4" },

  // Image, Web & Core
  { category: "image", tool: "img2webp", alias: "", goal: "Batch convert folder to responsive WebP (q=82, max 1600px)", cmd: "img2webp -a -q 82 --width 1600" },
  { category: "image", tool: "img2webp", alias: "", goal: "Lossless pixel-perfect PNG to WebP conversion", cmd: "img2webp -l diagram.png" },
  { category: "image", tool: "ytdl", alias: "", goal: "Download clipboard URL directly as 320kbps MP3 to ~/Downloads", cmd: "ytdl --format mp3" },
  { category: "image", tool: "ytdl", alias: "", goal: "Download 1080p MP4 with embedded subtitles from clipboard", cmd: "ytdl --subtitles" },
  { category: "image", tool: "media-info", alias: "", goal: "Compare codecs, bitrates, resolution & duration across files", cmd: "media-info *.mp4 *.wav" },
  { category: "image", tool: "thumloc", alias: "", goal: "Apply custom Finder icon thumbnail to all .webloc bookmarks", cmd: "thumloc -a cover.png" },
  { category: "image", tool: "mytools", alias: "", goal: "Print full CLI Short Code Sheet in terminal", cmd: "mytools cs" },

  // Multi-Step Pipelines
  { category: "pipelines", tool: "vid2audio", alias: "pipeline", goal: "Podcast Mastering: Extract audio -> Trim silence -> Normalize -16 LUFS MP3", cmd: "vid2audio talk.mp4 && wavtrim talk.wav && wavnorm -m -b 320 -l -16 talk-trimmed.wav" },
  { category: "pipelines", tool: "wav2tempo", alias: "pipeline", goal: "Sample Pack Prep: Retime to 120 BPM -> Micro-fade edges -> Normalize -14 LUFS", cmd: "wav2tempo -t 120 loop.wav && wavfade -i 0.05 -o 0.1 loop-120bpm.wav && wavnorm -l -14 loop-120bpm-faded.wav" },
  { category: "pipelines", tool: "vidcuts", alias: "pipeline", goal: "Social Clip Pipeline: Strip dead air -> Cinema grade -> Optimize MP4", cmd: "vidcuts --mode silence raw.mp4 && vidfx --preset cinema raw-silencecut.mp4 && vidoptim raw-silencecut-cinema.mp4" },
  { category: "pipelines", tool: "wavreverse", alias: "pipeline", goal: "Reverse Riser FX: Reverse WAV -> Add Hall Reverb -> Export 320k MP3", cmd: "wavreverse hit.wav && wavfx --reverb hall --fade-in 0.2 -m -b 320 hit-reversed.wav" }
];

class CheatsheetController {
  constructor(tbodyId, tabsId, searchInputId, clearBtnId, copyAllBtnId) {
    this.tbody = document.getElementById(tbodyId);
    this.tabsContainer = document.getElementById(tabsId);
    this.searchInput = document.getElementById(searchInputId);
    this.clearBtn = document.getElementById(clearBtnId);
    this.copyAllBtn = document.getElementById(copyAllBtnId);
    this.currentCategory = "all";
    this.searchQuery = "";
    this.init();
  }

  init() {
    if (!this.tbody || !this.tabsContainer) return;
    this.renderTabs();
    this.renderRows();

    const searchBox = this.searchInput?.closest(".search-box");
    const updateSearch = () => {
      this.searchQuery = this.searchInput?.value.toLowerCase().trim() || "";
      if (searchBox) searchBox.classList.toggle("has-query", !!this.searchQuery);
      this.renderRows();
    };

    this.searchInput?.addEventListener("input", updateSearch);
    this.clearBtn?.addEventListener("click", () => {
      if (this.searchInput) {
        this.searchInput.value = "";
        updateSearch();
        this.searchInput.focus();
      }
    });

    this.copyAllBtn?.addEventListener("click", () => {
      const visible = this.getFilteredRows();
      if (visible.length === 0) return;
      const sheetText = visible
        .map(r => `# ${r.tool}: ${r.goal}\n${r.cmd}`)
        .join("\n\n");
      copyToClipboard(sheetText, `Copied ${visible.length} recipes to clipboard!`);
    });
  }

  getFilteredRows() {
    return CHEATSHEET_DATA.filter(item => {
      const matchesCat = this.currentCategory === "all" || item.category === this.currentCategory;
      const matchesQuery = !this.searchQuery ||
        item.tool.toLowerCase().includes(this.searchQuery) ||
        item.alias.toLowerCase().includes(this.searchQuery) ||
        item.goal.toLowerCase().includes(this.searchQuery) ||
        item.cmd.toLowerCase().includes(this.searchQuery);
      return matchesCat && matchesQuery;
    });
  }

  renderTabs() {
    const categories = [
      { id: "all", name: "All Recipes" },
      { id: "video", name: "🎬 Video" },
      { id: "audio", name: "🎵 Audio (WAV & MP3)" },
      { id: "image", name: "🖼️ Image, Web & Core" },
      { id: "pipelines", name: "🔗 Multi-Step Pipelines" }
    ];

    this.tabsContainer.innerHTML = "";
    categories.forEach(cat => {
      const count = cat.id === "all"
        ? CHEATSHEET_DATA.length
        : CHEATSHEET_DATA.filter(r => r.category === cat.id).length;

      const btn = document.createElement("button");
      btn.className = `cat-tab ${cat.id === this.currentCategory ? "active" : ""}`;
      btn.innerHTML = `${cat.name} <span class="tab-count">(${count})</span>`;
      btn.addEventListener("click", () => {
        this.currentCategory = cat.id;
        this.tabsContainer.querySelectorAll(".cat-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.renderRows();
      });
      this.tabsContainer.appendChild(btn);
    });
  }

  renderRows() {
    const rows = this.getFilteredRows();
    this.tbody.innerHTML = "";

    if (rows.length === 0) {
      this.tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 2rem; font-family: var(--font-mono); color: var(--text-muted);">
            No short-code recipes matching "${this.searchQuery}".
          </td>
        </tr>
      `;
      return;
    }

    rows.forEach(item => {
      const tr = document.createElement("tr");
      let dotColor = "#2563eb";
      if (item.category === "video") dotColor = "#ff3344";
      else if (item.category === "audio") dotColor = "#00f59b";
      else if (item.category === "pipelines") dotColor = "#ffb703";

      tr.innerHTML = `
        <td>
          <div class="cs-tool-cell">
            <span class="cs-cat-dot" style="background: ${dotColor};"></span>
            <button type="button" class="cs-tool-name" data-tool="${item.tool}" style="background:none;border:none;padding:0;cursor:pointer;text-align:left;" title="Open ${item.tool} in Command Studio">
              ${item.tool}
            </button>
            ${item.alias ? `<span style="font-size:0.7rem;color:var(--text-muted);font-family:var(--font-mono);">(${item.alias})</span>` : ""}
          </div>
        </td>
        <td class="cs-goal-cell">${item.goal}</td>
        <td><code class="cs-cmd-code">${item.cmd}</code></td>
        <td>
          <div class="cs-actions-wrap">
            <button type="button" class="copy-mini-btn" data-copy="${item.cmd.replace(/"/g, '&quot;')}">COPY</button>
            <button type="button" class="studio-load-btn" data-studio="${item.tool}" data-cmd="${item.cmd.replace(/"/g, '&quot;')}" title="Load into Command Studio">STUDIO</button>
          </div>
        </td>
      `;

      tr.querySelector(".copy-mini-btn")?.addEventListener("click", () => {
        copyToClipboard(item.cmd, "Recipe copied to clipboard!");
      });

      const loadInStudio = () => {
        if (window.commandStudio) {
          window.commandStudio.selectTool(item.tool);
          if (window.commandStudio.outputBox) {
            window.commandStudio.outputBox.innerHTML = `<span class="prompt-symbol">❯</span> ${item.cmd}`;
          }
          document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
          showToast(`Loaded ${item.tool} recipe in Command Studio`);
        }
      };

      tr.querySelector(".studio-load-btn")?.addEventListener("click", loadInStudio);
      tr.querySelector(".cs-tool-name")?.addEventListener("click", loadInStudio);

      this.tbody.appendChild(tr);
    });
  }
}

// ============================================================================
// 7. Modal Dialog Handler
// ============================================================================
function openModal(tool) {
  const backdrop = document.getElementById("dialogBackdrop");
  const title = document.getElementById("dialogTitle");
  const body = document.getElementById("dialogBody");
  if (!backdrop || !title || !body) return;

  title.textContent = `${tool.name} — Technical Specification`;

  let optionsRows = tool.flags.map(f => `
    <tr>
      <td><code>${f.flag}</code></td>
      <td>${f.desc}</td>
    </tr>
  `).join("");

  let examplesList = tool.examples.map(ex => `
    <div style="margin-bottom: 0.75rem;">
      <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 2px;"># ${ex.note}</div>
      <div class="code-box">
        <div class="code-content"><span class="code-prompt">❯</span>${ex.cmd}</div>
        <button class="copy-mini-btn" data-copy="${ex.cmd}">COPY</button>
      </div>
    </div>
  `).join("");

  body.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
      <div style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.6; flex: 1; min-width: 240px;">
        ${tool.details || tool.summary}
      </div>
      <button type="button" class="studio-copy-btn" id="modalLoadStudioBtn" style="font-size: 0.78rem; padding: 0.5rem 0.9rem;">
        ⚡ Open in Command Studio
      </button>
    </div>

    <div>
      <div class="dialog-section-title">Command Flags & Options</div>
      <div style="overflow-x: auto; margin-top: 0.5rem;" tabindex="0" role="region" aria-label="${tool.name} command flags">
        <table class="options-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${optionsRows}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <div class="dialog-section-title">Short Code Sheet & Production Examples</div>
      <div style="margin-top: 0.5rem;">
        ${examplesList}
      </div>
    </div>
  `;

  body.querySelector("#modalLoadStudioBtn")?.addEventListener("click", () => {
    closeModal();
    window.commandStudio?.selectTool(tool.id);
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
  });

  body.querySelectorAll(".copy-mini-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      copyToClipboard(e.target.dataset.copy, "Copied example command!");
    });
  });

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const backdrop = document.getElementById("dialogBackdrop");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================================================
// 8. Clipboard Toast Manager
// ============================================================================
function copyToClipboard(text, message = "Copied to clipboard!") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  showToast(message);
}

function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span style="color: var(--color-terminal-green); font-weight: bold;">✔</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-exit");
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

// ============================================================================
// 9. Theme Switcher (Obsidian Dark / Light Gallery / Amber Phosphor)
// ============================================================================
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("mytools_theme", theme);

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

function initTheme() {
  const saved = localStorage.getItem("mytools_theme") || "dark";
  setTheme(saved);

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });
}

// ============================================================================
// 10. Bootstrap Everything on DOM Ready
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  // Initialize Terminal Simulator
  window.terminalSim = new TerminalSimulator("terminalLogs", "terminalInput");

  // Terminal Quick Chips
  document.querySelectorAll(".chip-btn").forEach(chip => {
    chip.addEventListener("click", () => {
      const cmd = chip.dataset.cmd;
      if (cmd && window.terminalSim) {
        window.terminalSim.execute(cmd);
      }
    });
  });

  // Terminal Copy button
  document.getElementById("termCopyBtn")?.addEventListener("click", () => {
    const logs = document.getElementById("terminalLogs");
    if (logs && logs.innerText.trim()) {
      copyToClipboard(logs.innerText.trim(), "Terminal explanation & output copied!");
    }
  });

  // Terminal Clear button
  document.getElementById("termClearBtn")?.addEventListener("click", () => {
    const logs = document.getElementById("terminalLogs");
    if (logs) logs.innerHTML = "";
  });

  // Initialize Command Studio
  window.commandStudio = new CommandStudio("studioToolList", "studioControls", "studioCmdOutput", "studioCopyBtn");

  // Initialize Visual Labs
  window.audioLab = new AudioWaveformLab("waveformCanvas");
  window.glitchLab = new GlitchLab("glitchScreenContent");

  // Initialize Short Code Sheets & Recipes Hub
  window.cheatsheet = new CheatsheetController(
    "cheatsheetTableBody",
    "cheatsheetCategoryTabs",
    "cheatsheetSearchInput",
    "cheatsheetSearchClearBtn",
    "copyAllRecipesBtn"
  );

  // Initialize Catalog
  window.catalog = new CatalogController("toolsGrid", "catalogSearchInput", "categoryTabs");

  // Modal Close
  document.getElementById("dialogCloseBtn")?.addEventListener("click", closeModal);
  document.getElementById("dialogBackdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "dialogBackdrop") closeModal();
  });

  // Global code box copy listeners
  document.querySelectorAll(".code-box button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const code = e.target.parentElement.querySelector(".code-content")?.textContent.replace("❯", "").trim();
      if (code) copyToClipboard(code);
    });
  });
});
