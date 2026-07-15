# mytools

A collection of personal custom terminal scripts for audio, video, and image processing, designed for macOS.

## Installation

```bash
git clone https://github.com/cocreating/mytools.git ~/AllMyCoding/mytools
cd ~/AllMyCoding/mytools
./install.sh
```

## Features

- **Interactive Menu**: Run `mytools` to get a visual menu (powered by `fzf`) to select and run your tools. The menu includes a help screen and guided options.
- **Batch Processing**: Almost all tools accept multiple files at once.
- **Zsh Auto-completion**: Hitting `<TAB>` after a command intelligently filters valid file extensions.
- **macOS Notifications**: Get a desktop notification when a long process finishes.

## Interactive Usage

Simply run the main command to open the picker:
```bash
mytools
```

Or print the help menu and guided examples directly in the console without opening the picker:
```bash
mytools --help
```

---

## 🚀 Ready-to-Use Examples

### 🎬 vid2webm
Converts video files (MP4, MOV, etc.) to highly compressed WebM format using `libvpx` and `libopus`.
*   **Convert a single video:**
    ```bash
    vid2webm vacation.mp4
    ```
*   **Convert multiple videos in batch:**
    ```bash
    vid2webm intro.mov tutorial.mp4 outro.mov
    ```

### 🎵 wav2mp3
Converts high-quality WAV audio files to standard compressed MP3 files (192kbps).
*   **Convert a single track:**
    ```bash
    wav2mp3 recording.wav
    ```
*   **Convert all WAV files in the current folder:**
    ```bash
    wav2mp3 *.wav
    ```

### 🔊 vid2audio
Extracts the audio track from video files as WAV or MP3 files.
*   **Extract as high-quality WAV (default):**
    ```bash
    vid2audio music_video.mp4
    ```
*   **Extract as MP3:**
    ```bash
    vid2audio -f mp3 movie_trailer.mov
    ```
*   **Extract multiple files to a specific folder:**
    ```bash
    vid2audio -f mp3 -o ~/Music/Samples clip1.mp4 clip2.mov
    ```

### 👾 vid2gif
Converts a video file into an optimized, high-quality animated GIF (using double-pass palette mapping), perfect for GitHub or Slack.
*   **Convert with default settings (800px width, 15 FPS):**
    ```bash
    vid2gif screen_recording.mov
    ```
*   **Resize to 480px width at 10 FPS for a tiny file size:**
    ```bash
    vid2gif -w 480 -r 10 demo.mp4
    ```
*   **Save with a custom name:**
    ```bash
    vid2gif -o optimized_demo.gif demo.mov
    ```

### 🖼️ img2webp
Converts and resizes images to WebP format. Supports batching, recursion, and parallel execution.
*   **Basic conversion (85% quality):**
    ```bash
    img2webp photo.jpg
    ```
*   **Convert all JPG/PNG images in the current folder at 80% quality:**
    ```bash
    img2webp -q 80 *.jpg *.png
    ```
*   **Resize image to 1200px width (maintaining aspect ratio):**
    ```bash
    img2webp --width 1200 banner.png
    ```
*   **Resize images to exact dimensions:**
    ```bash
    img2webp --resize 1200x800 thumb1.png thumb2.png
    ```
*   **Convert recursively inside a folder using 4 CPU cores (parallel jobs):**
    ```bash
    img2webp -R -j 4 ~/Pictures/Vacation/
    ```
*   **Delete original files after successful conversion:**
    ```bash
    img2webp -d logo.png
    ```

### 🌐 thumloc
Recursively generates Finder thumbnails for macOS `.webloc` internet bookmarks.
*   **Scan and add thumbnails in current folder:**
    ```bash
    thumloc
    ```
*   **Force-regenerate all thumbnails in a specific directory:**
    ```bash
    thumloc -f ~/Downloads/Bookmarks
    ```

### 📝 webloc2md
Compiles all recursive `.webloc` files inside a directory into a single, clean Markdown bookmarks list grouped by folder hierarchy.
*   **Generate `bookmarks.md` for the current folder:**
    ```bash
    webloc2md
    ```
*   **Scan a specific directory and write to a custom file name:**
    ```bash
    webloc2md ~/Downloads links.md
    ```

### 📥 ytdl
Fully interactive CLI downloader for video/audio URLs utilizing `yt-dlp` and `fzf`.
*   **Launch interactive download wizard:**
    ```bash
    ytdl
    ```
*   **Download a specific URL directly:**
    ```bash
    ytdl "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ```

---

## macOS Quick Actions

Check the `quick-actions/` folder for AppleScripts that you can easily drop into macOS Automator to create "Right-Click -> Quick Actions" in Finder.
