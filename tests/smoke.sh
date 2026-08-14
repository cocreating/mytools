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

# Test locale decimal formatting in wav2tempo
TEST_WAV="$(mktemp "${TMPDIR:-/tmp}/test_smoke_XXXXXX.wav")"
trap 'rm -f "$TEST_WAV"' EXIT
ffmpeg -y -f lavfi -i "sine=frequency=440:duration=1" "$TEST_WAV" >/dev/null 2>&1
DRY_OUTPUT="$(LC_ALL=de_DE.UTF-8 bash "$ROOT/scripts/wav2tempo" --bpm 116.20 -t 80 -n "$TEST_WAV")"
echo "$DRY_OUTPUT" | grep -q "factor: 0.68846816"

echo 'Smoke tests passed.'
