"""Snap the Gemini-generated branding art to the site's standard palette.

Gemini paints the hues it likes (cyan / yellow / magenta); the site's palette is the
dominance ramp teal #2dd4bf, amber #fb923c and the pink primary #c92f82 on pure black.
An image model cannot hit a hex value, so this script classifies every pixel by hue and
rebuilds it from the matching standard colour while keeping the pixel's own brightness
(the glow falloff) and its whiteness (the orb highlight). Grey lines and the black ground
pass through untouched because they carry no saturation.

Inputs  : branding/gemini-icon-raw.png (2048², black tile on a white frame)
          branding/gemini-og-raw.png   (2752×1536, black edge to edge)
Outputs : branding/icon.png (512²), icon-256.png, icon-32.png, icon-1024.png
          branding/og-base.png (1200×630, graph only — compose_og.py adds the wordmark)

Run: python scripts/brand_recolor.py
"""
from __future__ import annotations

import colorsys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "branding"

TEAL = (0x2D, 0xD4, 0xBF)
AMBER = (0xFB, 0x92, 0x3C)
PINK = (0xC9, 0x2F, 0x82)


def _hue(rgb):
    return colorsys.rgb_to_hsv(*(c / 255 for c in rgb))[0] * 360


# Hue windows (degrees) → target. Gemini's cyan sits ~185-195, its yellow/orange ~35-50,
# its magenta ~330-345. Windows are wide so glow fringes classify with their orb.
CLASSES = [
    ((150, 230), TEAL),
    ((10, 75), AMBER),
    ((290, 360), PINK),
    ((0, 10), PINK),
]


def recolor(img: Image.Image, sat_floor: float = 0.18) -> Image.Image:
    arr = np.asarray(img.convert("RGB")).astype(np.float32) / 255.0
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    v = arr.max(axis=2)
    mn = arr.min(axis=2)
    delta = v - mn
    s = np.where(v > 0, delta / np.maximum(v, 1e-6), 0)

    # hue in degrees
    h = np.zeros_like(v)
    m = delta > 1e-6
    rc = np.where(m, (v - r) / np.maximum(delta, 1e-6), 0)
    gc = np.where(m, (v - g) / np.maximum(delta, 1e-6), 0)
    bc = np.where(m, (v - b) / np.maximum(delta, 1e-6), 0)
    h = np.where(r == v, bc - gc, np.where(g == v, 2 + rc - bc, 4 + gc - rc))
    h = (h / 6.0) % 1.0 * 360

    out = arr.copy()
    coloured = s >= sat_floor
    counts = {}
    for (lo, hi), tgt in CLASSES:
        sel = coloured & (h >= lo) & (h < hi)
        counts[tgt] = counts.get(tgt, 0) + int(sel.sum())
        t = np.array(tgt, dtype=np.float32) / 255.0
        # Rebuild: mix target with white by the pixel's own desaturation (keeps highlights),
        # then scale by its brightness (keeps the glow falloff).
        ss = s[sel][:, None]
        vv = v[sel][:, None]
        # Boost the saturation term so the standard colour reads at full strength on the
        # orb body; the unsaturated remainder is the highlight.
        k = np.clip(ss / 0.85, 0, 1)
        mixed = t[None, :] * k + 1.0 * (1 - k)
        out[sel] = mixed * vv
    # A hue outside every window with real saturation is a stray (anti-aliased fringe
    # between two orbs); count it so a change in Gemini's palette is visible.
    stray = coloured & ~np.zeros_like(coloured)
    for (lo, hi), _ in CLASSES:
        stray &= ~((h >= lo) & (h < hi))
    print(f"  recolour: teal={counts[TEAL]} amber={counts[AMBER]} pink={counts[PINK]} stray={int(stray.sum())}")
    if min(counts.values()) == 0:
        raise SystemExit("a palette class matched zero pixels — the hue windows no longer fit the source")
    return Image.fromarray((np.clip(out, 0, 1) * 255).round().astype(np.uint8))


def crop_tile(img: Image.Image) -> Image.Image:
    """Cut the black rounded tile out of Gemini's white frame and square it off in black."""
    a = np.asarray(img.convert("L"))
    dark = a < 60
    rows = np.where(dark.mean(axis=1) > 0.5)[0]
    cols = np.where(dark.mean(axis=0) > 0.5)[0]
    y0, y1, x0, x1 = rows[0], rows[-1] + 1, cols[0], cols[-1] + 1
    side = max(y1 - y0, x1 - x0)
    print(f"  tile bounds x={x0}..{x1} y={y0}..{y1} side={side}")
    tile = img.convert("RGB").crop((x0, y0, x0 + side, y0 + side))
    # Paint the rounded corners black: the white frame AND the anti-aliased grey arc of the
    # tile's own edge, which otherwise survives as a faint corner line at 32px. Only the
    # corner squares are touched, so the grey graph lines elsewhere are safe.
    t = np.asarray(tile).copy()
    t[t.min(axis=2) > 200] = 0
    c = int(side * 0.14)
    for ys, xs in ((slice(0, c), slice(0, c)), (slice(0, c), slice(-c, None)),
                   (slice(-c, None), slice(0, c)), (slice(-c, None), slice(-c, None))):
        q = t[ys, xs]
        grey = (q.max(axis=2) - q.min(axis=2) < 16) & (q.max(axis=2) > 12)
        q[grey] = 0
    return Image.fromarray(t)


def main():
    print("icon")
    icon = crop_tile(Image.open(BRAND / "gemini-icon-raw.png"))
    icon = recolor(icon)
    for size in (1024, 512, 256, 32):
        name = "icon.png" if size == 512 else f"icon-{size}.png"
        icon.resize((size, size), Image.LANCZOS).save(BRAND / name, optimize=True)
        print(f"  wrote {name}")

    print("og")
    og = Image.open(BRAND / "gemini-og-raw.png").convert("RGB")
    W, H = og.size
    target = 1200 / 630
    ch = round(W / target)
    top = (H - ch) // 2
    og = og.crop((0, top, W, top + ch)).resize((1200, 630), Image.LANCZOS)
    og = recolor(og)
    og.save(BRAND / "og-base.png", optimize=True)
    print("  wrote og-base.png")


if __name__ == "__main__":
    main()
