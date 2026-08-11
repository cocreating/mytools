#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
for script in "$ROOT"/scripts/* "$ROOT"/scripts/lib/common.sh "$ROOT"/install.sh; do
  [ -f "$script" ] && bash -n "$script"
done
for command in img2webp mp4glue mytools mytools-guide mytools-doctor mytools-config media-info media-optimize thumloc vid2audio videoWithoutAudio vid2gif vid2webm wav2mp3 wav2tempo wavreverse webloc2md ytdl; do
  bash "$ROOT/scripts/$command" --help >/dev/null
done
TEMP_CONFIG="$(mktemp -d)/config"
MYTOOLS_CONFIG_DIR="$(dirname "$TEMP_CONFIG")" MYTOOLS_CONFIG_FILE="$TEMP_CONFIG" bash "$ROOT/scripts/mytools-config" --init >/dev/null
[ -f "$TEMP_CONFIG" ]
echo 'Smoke tests passed.'
