"""Compress an image to reduce token usage when read by Claude.

Usage:
    python3 scripts/compress-image.py <input_path> [--quality 40] [--output <path>]  # or 'python' on Windows

If --output is omitted, overwrites the input file in-place.

Skips compression when the image is already small or already a compressed JPEG,
to avoid degrading quality through double-compression.
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Run: pip install Pillow", file=sys.stderr)
    sys.exit(1)

# Images at or below this size are already cheap to load into context
SKIP_THRESHOLD_KB = 100


def compress(input_path: str, output_path: str, quality: int) -> None:
    path = Path(input_path)
    original_kb = path.stat().st_size / 1024

    # Already small enough — skip entirely
    if original_kb <= SKIP_THRESHOLD_KB:
        print(f"SKIP {original_kb:.0f}KB — already under {SKIP_THRESHOLD_KB}KB threshold")
        return

    img = Image.open(input_path)

    # Detect if already a JPEG
    is_jpeg = img.format == "JPEG"

    if is_jpeg:
        # Estimate current quality via file-size-to-pixel ratio.
        # A low ratio means the JPEG is already heavily compressed.
        pixels = img.width * img.height
        bytes_per_pixel = path.stat().st_size / pixels if pixels > 0 else 0

        # Typical bytes-per-pixel at various JPEG qualities (for UI screenshots):
        #   q90 ≈ 1.5-3.0,  q60 ≈ 0.5-1.0,  q40 ≈ 0.3-0.6,  q20 ≈ 0.15-0.3
        # If already below 0.7 bpp, re-compressing would only add artifacts.
        if bytes_per_pixel < 0.7:
            print(f"SKIP {original_kb:.0f}KB — already compressed JPEG ({bytes_per_pixel:.2f} bytes/px)")
            return

    if img.mode == "RGBA":
        img = img.convert("RGB")

    img.save(output_path, "JPEG", quality=quality, optimize=True)

    compressed_kb = Path(output_path).stat().st_size / 1024
    reduction = (1 - compressed_kb / original_kb) * 100 if original_kb > 0 else 0
    print(f"{compressed_kb:.0f}KB (was {original_kb:.0f}KB, -{reduction:.0f}%)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Compress image for Claude context")
    parser.add_argument("input", help="Path to input image")
    parser.add_argument("--quality", type=int, default=40, help="JPEG quality 1-100 (default: 40)")
    parser.add_argument("--output", help="Output path (default: overwrite input)")
    args = parser.parse_args()

    output = args.output or args.input
    compress(args.input, output, args.quality)


if __name__ == "__main__":
    main()
