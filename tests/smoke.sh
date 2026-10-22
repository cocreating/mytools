#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
for script in "$ROOT"/scripts/* "$ROOT"/scripts/lib/common.sh "$ROOT"/install.sh; do
  [ -f "$script" ] && bash -n "$script"
done
for command in img2webp ytdl vidglue videoglue vid2webm vid2gif videoWithoutAudio vidoptim vidglitch videoglitch vidcuts videocuts videoeffects vidfx vid2audio wav2mp3 wav2tempo wavreverse wavpitch wavnorm wavfade wavtrim wavfx media-info thumloc webloc2md mytools mytools-guide mytools-doctor mytools-config; do
  bash "$ROOT/scripts/$command" --help >/dev/null
done
TEMP_CONFIG="$(mktemp -d)/config"
MYTOOLS_CONFIG_DIR="$(dirname "$TEMP_CONFIG")" MYTOOLS_CONFIG_FILE="$TEMP_CONFIG" bash "$ROOT/scripts/mytools-config" --init >/dev/null
[ -f "$TEMP_CONFIG" ]

if command -v ffmpeg >/dev/null 2>&1; then
  # Test locale decimal formatting in wav2tempo
  TEST_WAV="$(mktemp "${TMPDIR:-/tmp}/test_smoke_XXXXXX.wav")"
  TEST_IMG_DIR="$(mktemp -d "${TMPDIR:-/tmp}/test_img2webp_XXXXXX")"
  TEST_VID="$(mktemp "${TMPDIR:-/tmp}/test_smoke_vid_XXXXXX.mp4")"
  TEST_VID_MUTE="$(mktemp "${TMPDIR:-/tmp}/test_smoke_mute_XXXXXX.mp4")"
  TEST_OUT_DIR="$(mktemp -d "${TMPDIR:-/tmp}/test_out_XXXXXX")"
  trap 'rm -f "$TEST_WAV" "$TEST_VID" "$TEST_VID_MUTE"; rm -rf "$TEST_IMG_DIR" "$TEST_OUT_DIR"' EXIT

  ffmpeg -y -f lavfi -i "sine=frequency=440:duration=1" "$TEST_WAV" >/dev/null 2>&1
  DRY_OUTPUT="$(LC_ALL=de_DE.UTF-8 bash "$ROOT/scripts/wav2tempo" --bpm 116.20 -t 80 -n "$TEST_WAV")"
  echo "$DRY_OUTPUT" | grep -q "factor: 0.68846816"

  # Dry-run smoke tests for audio tools
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

  if command -v cwebp >/dev/null 2>&1; then
    # Dry-run smoke test for img2webp with -width, -q, and -a
    ffmpeg -y -f lavfi -i color=c=blue:s=100x100:d=1 -vframes 1 "$TEST_IMG_DIR/test.png" >/dev/null 2>&1
    IMG_OUT="$(cd "$TEST_IMG_DIR" && bash "$ROOT/scripts/img2webp" -width 80 -q 90 -a -n)"
    echo "$IMG_OUT" | grep -q "test.png → .*test.webp"
    FWD_OUT="$(cd "$TEST_IMG_DIR" && bash "$ROOT/scripts/mytools" img2web -a -n 2>&1)"
    echo "$FWD_OUT" | grep -q "test.png → .*test.webp"
  fi

  # Create 1s test videos (one with audio, one muted with different dimensions)
  ffmpeg -y -f lavfi -i testsrc=duration=1:size=120x120:rate=15 -f lavfi -i sine=frequency=440:duration=1 -c:v libx264 -pix_fmt yuv420p -c:a aac "$TEST_VID" >/dev/null 2>&1
  ffmpeg -y -f lavfi -i testsrc=duration=1:size=80x120:rate=15 -c:v libx264 -pix_fmt yuv420p -an "$TEST_VID_MUTE" >/dev/null 2>&1

  # Smoke tests for vidglue (mixed audio + muted, blur fit, transition, layout)
  GLUE_OUT="$TEST_OUT_DIR/glued_blur.mp4"
  bash "$ROOT/scripts/vidglue" --reencode --fit blur -o "$GLUE_OUT" "$TEST_VID" "$TEST_VID_MUTE" >/dev/null
  [ -f "$GLUE_OUT" ]

  XFADE_OUT="$TEST_OUT_DIR/glued_xfade.mp4"
  bash "$ROOT/scripts/vidglue" -t fade --transition-duration 0.3 -o "$XFADE_OUT" "$TEST_VID" "$TEST_VID_MUTE" >/dev/null
  [ -f "$XFADE_OUT" ]

  LAYOUT_OUT="$TEST_OUT_DIR/glued_hstack.mp4"
  bash "$ROOT/scripts/vidglue" --layout hstack -o "$LAYOUT_OUT" "$TEST_VID" "$TEST_VID_MUTE" >/dev/null
  [ -f "$LAYOUT_OUT" ]

  # Smoke tests for vidglitch (presets, intensity, organic-burst, audio-glitch, osd)
  GLITCH_OUT="$(bash "$ROOT/scripts/vidglitch" --preset datamosh -I high --organic-burst --audio-glitch --osd -o "$TEST_OUT_DIR" "$TEST_VID")"
  echo "$GLITCH_OUT" | grep -q "Done: 1 video(s) glitched"

  # Smoke tests for vidcuts (freeze mode + film-burn + scratches + super8)
  CUT_OUT="$(bash "$ROOT/scripts/vidcuts" -p 25 --mode freeze --film-burn --scratches --super8 -o "$TEST_OUT_DIR" "$TEST_VID")"
  echo "$CUT_OUT" | grep -q "Done: 1 video(s) cut"

  # Smoke tests for videoeffects / vidfx
  VFX_OUT="$(bash "$ROOT/scripts/videoeffects" --preset cinema --letterbox 2.35 --bloom --mirror quad --speed 1.5 --fade-in 0.2 -o "$TEST_OUT_DIR" "$TEST_VID")"
  echo "$VFX_OUT" | grep -q "Done: 1 video(s) processed"

  VFX_ALIAS_OUT="$(bash "$ROOT/scripts/vidfx" --preset thermal --reverse -n "$TEST_VID")"
  echo "$VFX_ALIAS_OUT" | grep -q "Would create:"

  # Test live media preview helper in common.sh
  PREVIEW_OUT="$(bash "$ROOT/scripts/lib/common.sh" --preview "$TEST_VID")"
  echo "$PREVIEW_OUT" | grep -q "Video Stream:"
fi

echo 'Smoke tests passed.'
