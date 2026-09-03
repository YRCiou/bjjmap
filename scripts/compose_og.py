"""Compose the 1200×630 Open Graph image: the recoloured graph plus the wordmark.

Typography mirrors the site header: "bjj" bold + "map" light in Montserrat (the site's
header/body font per source/quartz.config.ts), white on pure black, with the tagline in
the page's mid grey (#9a9a9a, dark-mode --gray). Pass --font-dir to a folder holding
Montserrat-Bold.ttf / Montserrat-Light.ttf / Montserrat-Regular.ttf; without it the
script falls back to Segoe UI and says so, because a silent fallback is the trap CLAUDE.md
§6.6 warns about. The font file is not committed: fetch it from
https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf

Run: python scripts/compose_og.py [--font path/to/Montserrat[wght].ttf]
Writes branding/og.png, then copy to source/quartz/static/og-image.png.
"""
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "branding"
WIN_FONTS = Path("C:/Windows/Fonts")

TAGLINE = "The interactive map of Brazilian Jiu-Jitsu"
GREY = (0x9A, 0x9A, 0x9A)
WHITE = (0xFF, 0xFF, 0xFF)
PINK = (0xC9, 0x2F, 0x82)


def fonts(font_file: Path | None):
    """Montserrat[wght].ttf (the Google Fonts variable file) → bold / light / regular faces."""
    if font_file and font_file.exists():
        print(f"  font: Montserrat from {font_file}")

        def face(size, weight):
            f = ImageFont.truetype(str(font_file), size)
            f.set_variation_by_axes([weight])
            return f

        return face(104, 700), face(104, 300), face(26, 400)
    print("  font: FALLBACK Segoe UI (Montserrat not found — pass --font)")
    return (
        ImageFont.truetype(str(WIN_FONTS / "segoeuib.ttf"), 116),
        ImageFont.truetype(str(WIN_FONTS / "segoeuil.ttf"), 116),
        ImageFont.truetype(str(WIN_FONTS / "segoeui.ttf"), 26),
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--font", type=Path, help="path to Montserrat[wght].ttf")
    args = ap.parse_args()

    graph = Image.open(BRAND / "og-base.png").convert("RGB")
    assert graph.size == (1200, 630), graph.size
    # The graph fills ~58% of Gemini's frame; scale it down and pin it left so the wordmark
    # has clear black to sit on (the ground is pure black, so the seam is invisible).
    k = 0.84
    graph = graph.resize((round(1200 * k), round(630 * k)), Image.LANCZOS)
    base = Image.new("RGB", (1200, 630), (0, 0, 0))
    base.paste(graph, (-10, (630 - graph.height) // 2))
    d = ImageDraw.Draw(base)
    bold, light, small = fonts(args.font)

    # Wordmark, right-aligned block anchored at x=1130, vertically centred a touch high.
    right = 1130
    w_bjj = d.textlength("bjj", font=bold)
    w_map = d.textlength("map", font=light)
    x0 = right - (w_bjj + w_map)
    y = 240
    d.text((x0, y), "bjj", font=bold, fill=WHITE)
    d.text((x0 + w_bjj, y), "map", font=light, fill=WHITE)
    # pink underline accent = the site's primary, same width as the wordmark
    d.rounded_rectangle((x0 + 4, y + 134, right - 4, y + 140), radius=3, fill=PINK)
    # tagline
    w_tag = d.textlength(TAGLINE, font=small)
    d.text((right - w_tag, y + 160), TAGLINE, font=small, fill=GREY)

    out = BRAND / "og.png"
    base.save(out, optimize=True)
    print(f"  wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
