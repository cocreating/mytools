# mytools

A collection of personal custom terminal scripts for audio, video, and image processing, designed for macOS.

## Installation

```bash
git clone <repository_url> ~/AllMyCoding/mytools
cd ~/AllMyCoding/mytools
./install.sh
```

## Features

- **Interactive Menu**: Run `mytools` to get a visual menu (powered by `fzf`) to select and run your tools.
- **Batch Processing**: All tools accept multiple files at once.
- **Zsh Auto-completion**: Hitting `<TAB>` after a command intelligently filters valid file extensions.
- **macOS Notifications**: Get a desktop notification when a long process finishes.

## Tools Included

- `vid2webm`: Converts MP4/MOV videos to WebM (libvpx, crf 10).
- `wav2mp3`: Converts WAV audio to MP3 (libmp3lame, 192k).
- `img2webp`: Converts and resizes images to WebP.
- `thumloc`: Adds Finder thumbnails to `.webloc` files under the current directory, recursively.

## macOS Quick Actions

Check the `quick-actions/` folder for AppleScripts that you can easily drop into macOS Automator to create "Right-Click -> Quick Actions" in Finder.
