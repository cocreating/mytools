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
      { flag: "--curve <type>", desc: "Fade curve: qsin (quarter sine) | tri | esin | log | hsin" }
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
      { flag: "--end-only", desc: "Strip trailing silence only" }
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
      { flag: "--highpass <Hz>", desc: "High-pass filter cutoff frequency (e.g. 150)" }
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
  mytools doctor  - Dependency diagnostic health check
  mytools guide   - Interactive help browser & wizard launcher
  mytools config  - View/edit presets (~/.config/mytools/config)
  img2webp        - Batch image to WebP converter (supports -i wizard)
  vidglue         - Glue, crossfade (-t), collage (--layout) or --bounce (alias: videoglue)
  vidglitch       - 11 analog/digital visual & audio glitch presets (alias: videoglitch)
  vidcuts         - Frame, BPM beat, freeze & silence jump-cut generator (alias: videocuts)
  videoeffects    - Cinematic color grading, speed, optics & mirrors (alias: vidfx)
  videorandfram   - Randomize frame order & temporal glitch (alias: vidrandfram)
  wav2tempo       - Aubio BPM retiming
  wavnorm         - EBU R128 LUFS volume normalizer
  wavpitch        - Pitch shifter & varispeed tape drop
  wavfade         - De-popping fade-in/out envelopes
  wavtrim         - Automatic silence cropper
  wavfx           - DSP reverb, delay, EQ filters
  ytdl            - Video/audio clipboard grabber
  media-info      - Quick FFprobe inspector
  thumloc         - Finder .webloc thumbnailer
  theme [dark|light|amber] - Switch terminal theme`, "color: var(--text-code-on-terminal);");
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

    if (effectiveCmd.startsWith("wav2tempo")) {
      this.appendLine(`🥁 [wav2tempo] Running aubio tempo detector...
  - Estimated source tempo: 112.4 BPM
  - Target requested tempo: 128.0 BPM
  - Speed multiplier: 1.1387x
  - Applying pitch-preserving tempo filter (rubberband)...
  ✅ Output saved: drum-loop-128bpm.wav
  🎶 Timing synchronized to grid!`, "color: var(--color-bauhaus-yellow);");
      return;
    }

    if (effectiveCmd.startsWith("wavnorm")) {
      this.appendLine(`🎚️ [wavnorm] Analyzing integrated loudness...
  - Measured: -21.4 LUFS (LRA 8.2 LU)
  - Target: -14.0 LUFS (EBU R128)
  - Applied gain: +7.4 dB
  ✅ Output saved: track-norm.wav
  🔊 Volume balanced for streaming!`, "color: var(--color-terminal-green);");
      return;
    }

    if (effectiveCmd.startsWith("wavpitch")) {
      this.appendLine(`🎼 [wavpitch] Applying semitone shift...
  - Shift: +2 semitones
  - Mode: Pitch-shift (tempo preserved)
  ✅ Output saved: vocal-pitch+2.wav`, "color: var(--color-terminal-cyan);");
      return;
    }

    if (effectiveCmd.startsWith("wavfade")) {
      this.appendLine(`📈 [wavfade] Applying fade envelopes...
  - Fade-in: 0.10s (qsin curve)
  - Fade-out: 0.20s (qsin curve)
  ✅ Output saved: sample-faded.wav
  🔇 Pops and clicks eradicated!`, "color: var(--color-terminal-green);");
      return;
    }

    if (effectiveCmd.startsWith("wavtrim")) {
      this.appendLine(`✂️ [wavtrim] Scanning for silence...
  - Threshold: -50dB
  - Trimmed leading: 0.45s
  - Trimmed trailing: 1.12s
  ✅ Output saved: vocal-trimmed.wav`, "color: var(--color-terminal-green);");
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
  }

  renderToolSelector() {
    const featured = ["img2webp", "vidglue", "vidglitch", "vidcuts", "videoeffects", "videorandfram", "vidoptim", "wav2tempo", "wavpitch", "wavnorm", "wavfade", "wavtrim", "wavfx", "ytdl"];
    this.selectContainer.innerHTML = "";

    featured.forEach(id => {
      const tool = TOOLS_DATA.find(t => t.id === id);
      if (!tool) return;
      const btn = document.createElement("button");
      btn.className = `studio-tool-btn ${id === this.currentTool ? "active" : ""}`;
      btn.dataset.tool = id;
      btn.innerHTML = `<span><strong>${tool.name}</strong></span><span class="btn-cat">${tool.category}</span>`;
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

  renderControls(tool) {
    let html = `
      <div class="studio-tool-header">
        <div class="studio-tool-title">${tool.name}</div>
        <div class="studio-tool-summary">${tool.summary}</div>
      </div>
      <div class="controls-grid">
    `;

    if (tool.id === "img2webp") {
      html += `
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
        <div class="control-group">
          <label class="control-label">Mode:</label>
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
        <div class="control-group">
          <label class="control-label">Preset:</label>
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
        <div class="control-group">
          <label class="control-label">Cut Percentage: <span class="val-badge" id="c_pct_val">25%</span></label>
          <input type="range" class="control-input" id="c_pct" min="5" max="80" value="25">
        </div>
        <div class="control-group">
          <label class="control-label">Cut Mode:</label>
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
        <div class="control-group">
          <label class="control-label">Input WAV:</label>
          <input type="text" class="control-input" id="c_input" value="drumloop.wav">
        </div>
      `;
    } else if (tool.id === "wavpitch") {
      html += `
        <div class="control-group">
          <label class="control-label">Semitones: <span class="val-badge" id="c_semi_val">+2</span></label>
          <input type="range" class="control-input" id="c_semitones" min="-12" max="12" value="2">
        </div>
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
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="podcast.wav">
        </div>
      `;
    } else if (tool.id === "wavfade") {
      html += `
        <div class="control-group">
          <label class="control-label">Fade In Duration (sec):</label>
          <input type="number" step="0.05" class="control-input" id="c_fade_in" value="0.1">
        </div>
        <div class="control-group">
          <label class="control-label">Fade Out Duration (sec):</label>
          <input type="number" step="0.05" class="control-input" id="c_fade_out" value="0.2">
        </div>
        <div class="control-group">
          <label class="control-label">Curve Type:</label>
          <select class="control-select" id="c_curve">
            <option value="qsin">Quarter Sine (qsin)</option>
            <option value="tri">Linear Triangle (tri)</option>
            <option value="esin">Exponential Sine (esin)</option>
            <option value="log">Logarithmic (log)</option>
          </select>
        </div>
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
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="recording.wav">
        </div>
      `;
    } else if (tool.id === "wavfx") {
      html += `
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
        <div class="control-group">
          <label class="control-label">Input Audio:</label>
          <input type="text" class="control-input" id="c_input" value="loop.wav">
        </div>
      `;
    } else if (tool.id === "ytdl") {
      html += `
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

    // Attach dynamic listeners
    this.controlsContainer.querySelectorAll("input, select").forEach(el => {
      el.addEventListener("input", () => this.updateCommand());
      el.addEventListener("change", () => this.updateCommand());
    });
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
    } else if (this.currentTool === "wav2tempo") {
      const tbpm = document.getElementById("c_target_bpm")?.value;
      const sbpm = document.getElementById("c_source_bpm")?.value;
      const inp = document.getElementById("c_input")?.value || "drumloop.wav";

      if (tbpm) cmd += ` --target-bpm ${tbpm}`;
      if (sbpm) cmd += ` --bpm ${sbpm}`;
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavpitch") {
      const semi = document.getElementById("c_semitones")?.value || "2";
      const semiBadge = document.getElementById("c_semi_val");
      if (semiBadge) semiBadge.textContent = (semi > 0 ? `+${semi}` : semi);

      const varispeed = document.getElementById("c_varispeed")?.checked;
      const inp = document.getElementById("c_input")?.value || "vocal.wav";

      if (varispeed) cmd += " --varispeed";
      cmd += ` -s ${semi > 0 ? `+${semi}` : semi}`;
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavnorm") {
      const mode = document.getElementById("c_norm_mode")?.value;
      const val = document.getElementById("c_target_val")?.value || "-14";
      const inp = document.getElementById("c_input")?.value || "podcast.wav";

      if (mode === "lufs") cmd += ` --lufs ${val}`;
      else cmd += ` --peak ${val}`;
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavfade") {
      const fi = document.getElementById("c_fade_in")?.value;
      const fo = document.getElementById("c_fade_out")?.value;
      const curve = document.getElementById("c_curve")?.value;
      const inp = document.getElementById("c_input")?.value || "sample.wav";

      if (fi) cmd += ` -i ${fi}`;
      if (fo) cmd += ` -o ${fo}`;
      if (curve && curve !== "qsin") cmd += ` --curve ${curve}`;
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavtrim") {
      const th = document.getElementById("c_threshold")?.value;
      const scope = document.getElementById("c_trim_scope")?.value;
      const inp = document.getElementById("c_input")?.value || "recording.wav";

      if (th) cmd += ` --threshold ${th}`;
      if (scope === "start") cmd += " --start-only";
      if (scope === "end") cmd += " --end-only";
      if (inp) cmd += ` ${inp}`;
    } else if (this.currentTool === "wavfx") {
      const rev = document.getElementById("c_reverb")?.value;
      const del = document.getElementById("c_delay")?.value;
      const lp = document.getElementById("c_lowpass")?.value;
      const inp = document.getElementById("c_input")?.value || "loop.wav";

      if (rev && rev !== "none") cmd += ` --reverb ${rev}`;
      if (del) cmd += ` --delay ${del}`;
      if (lp) cmd += ` --lowpass ${lp}`;
      if (inp) cmd += ` ${inp}`;
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
      btn.addEventListener("click", () => {
        document.querySelectorAll(".glitch-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const preset = btn.dataset.preset;
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
            <div class="tool-name-wrap">
              <div class="tool-name">${tool.name}</div>
              <div class="tool-cmd-signature">${tool.signature}</div>
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
    <div style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.6;">
      ${tool.details || tool.summary}
    </div>

    <div>
      <div class="dialog-section-title">Command Flags & Options</div>
      <div style="overflow-x: auto; margin-top: 0.5rem;">
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
      <div class="dialog-section-title">Production Examples</div>
      <div style="margin-top: 0.5rem;">
        ${examplesList}
      </div>
    </div>
  `;

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
