#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
for script in "$ROOT"/scripts/* "$ROOT"/scripts/lib/common.sh "$ROOT"/install.sh; do
  [ -f "$script" ] && bash -n "$script"
done
for command in img2webp ytdl mp4glue vid2webm vid2gif videoWithoutAudio media-optimize vid2audio wav2mp3 wav2tempo wavreverse wavpitch wavnorm wavfade wavtrim wavfx media-info thumloc webloc2md mytools mytools-guide mytools-doctor mytools-config; do
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

# Dry-run smoke tests for new audio tools
PITCH_OUT="$(bash "$ROOT/scripts/wavpitch" -s +2 -n "$TEST_WAV")"
echo "$PITCH_OUT" | grep -q "Would create:"

NORM_OUT="$(bash "$ROOT/scripts/wavnorm" -l -14 -n "$TEST_WAV")"
echo "$NORM_OUT" | grep -q "Would create:"

FADE_OUT_TXT="$(bash "$ROOT/scripts/wavfade" -i 0.1 -o 0.2 -n "$TEST_WAV")"
echo "$FADE_OUT_TXT" | grep -q "Would create:"

TRIM_OUT="$(bash "$ROOT/scripts/wavtrim" -t -50 -n "$TEST_WAV")"
echo "$TRIM_OUT" | grep -q "Would create:"

FX_OUT="$(bash "$ROOT/scripts/wavfx" --reverb room -n "$TEST_WAV")"
echo "$FX_OUT" | grep -q "Would create:"

# Dry-run smoke test for img2webp with -width, -q, and -a
TEST_IMG_DIR="$(mktemp -d "${TMPDIR:-/tmp}/test_img2webp_XXXXXX")"
trap 'rm -f "$TEST_WAV"; rm -rf "$TEST_IMG_DIR"' EXIT
ffmpeg -y -f lavfi -i color=c=blue:s=100x100:d=1 -vframes 1 "$TEST_IMG_DIR/test.png" >/dev/null 2>&1
IMG_OUT="$(cd "$TEST_IMG_DIR" && bash "$ROOT/scripts/img2webp" -width 80 -q 90 -a -n)"
echo "$IMG_OUT" | grep -q "test.png → .*test.webp"

echo 'Smoke tests passed.'
