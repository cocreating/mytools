# mytools

A collection of personal custom terminal scripts for audio, video, and image processing, designed for macOS.

## Installation

```bash
git clone <repository_url> ~/AllMyCoding/mytools
cd ~/AllMyCoding/mytools
./install.sh
```

## Features

- **Interactive Menu**: Run `mytools` to get a visual menu (powered by `fzf`) to select and run your tools. The menu includes a help screen and guided `img2webp` options.
- **Batch Processing**: All tools accept multiple files at once.
- **Zsh Auto-completion**: Hitting `<TAB>` after a command intelligently filters valid file extensions.
- **macOS Notifications**: Get a desktop notification when a long process finishes.

## Interactive Usage

```bash
mytools
```

Print guided examples without opening the picker:

```bash
mytools --help
```

From the menu, choose:

- `help` to print examples for every tool.
- `img2webp` to select WebP conversion options before picking files.
- `thumloc` to run thumbnail generation in the current folder.

In the file picker:

- `Tab` selects or unselects one file.
- `Ctrl-A` selects all visible files.
- `Ctrl-D` clears the current selection.
- `Enter` confirms the selected files.

When `img2webp` is selected in the interactive menu, choose one of the guided options:

- Default conversion at quality `85`.
- Quality `80`.
- Reduce width to `1200px`.
- Reduce width to `1920px`.
- Resize to `1200x800`.
- Custom options, such as `-q 80 --width 1200`.

## Tools Included

- `vid2webm`: Converts MP4/MOV videos to WebM (libvpx, crf 10).
- `wav2mp3`: Converts WAV audio to MP3 (libmp3lame, 192k).
- `img2webp`: Converts images to WebP. Supports quality and resize options:
  - `img2webp -q 80 image.jpg`
  - `img2webp --width 1200 image.jpg`
  - `img2webp --resize 1200x800 image.jpg`
- `thumloc`: Recursively adds Finder thumbnails to `.webloc` files under the specified directory (or current directory by default). Requires `setweblocthumb` to be installed.

## Direct Command Examples

```bash
# Convert one image with default quality.
img2webp photo.jpg

# Convert multiple images at quality 80.
img2webp -q 80 photo.jpg banner.png

# Reduce image width and keep aspect ratio.
img2webp --width 1200 photo.jpg

# Reduce image height and keep aspect ratio.
img2webp --height 800 photo.jpg

# Resize to exact dimensions.
img2webp --resize 1200x800 photo.jpg

# Convert video and audio files.
vid2webm clip.mov
wav2mp3 recording.wav

# Add thumbnails to .webloc files in the current directory.
thumloc
```

## macOS Quick Actions

Check the `quick-actions/` folder for AppleScripts that you can easily drop into macOS Automator to create "Right-Click -> Quick Actions" in Finder.
