#!/usr/bin/env python3
"""Emit scripts/glossary.json — every proper name that must survive translation untouched.

A Taiwanese practitioner says "Open Guard", "Knee Slice Pass" and "De La Riva" in English. A
translation that renders them into Chinese is not just unidiomatic, it breaks the join between
the prose and the graph node the reader is looking at. So the names are extracted from the graph
itself rather than listed by hand: whatever the corpus calls a position, transition, submission,
system or principle is exactly what a translator must leave alone.

Both spellings of a role-suffixed name are emitted — "Mount/Top" and "Mount" — because prose
refers to the bare name and the graph key carries the role.

    python scripts/build_glossary.py            # rewrite scripts/glossary.json
    python scripts/build_glossary.py --check    # non-zero if it is stale
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GRAPH = ROOT / "graph.json"
CONTENT = ROOT / "content"
OUT = ROOT / "scripts" / "glossary.json"

ROLE_SUFFIX = re.compile(r"\s*/\s*(Top|Bottom|Attacker|Defender)\s*$", re.I)

# Vocabulary a Taiwanese gym says in English even mid-Chinese-sentence. Not names, but they are
# held in English for the same reason: translating them is what makes a translation read wrong.
KEEP_ENGLISH = [
    "guard", "pass", "sweep", "mount", "side control", "back control", "half guard",
    "closed guard", "open guard", "butterfly guard", "turtle", "knee on belly", "north-south",
    "hook", "hooks", "grip", "grips", "frame", "frames", "base", "posture", "bridge", "shrimp",
    "gi", "no-gi", "tap", "roll", "rolling", "drill", "escape", "submission", "takedown",
    "armbar", "triangle", "kimura", "omoplata", "americana", "guillotine", "heel hook",
    "kesa gatame", "leg drag", "berimbolo", "lapel", "collar", "sleeve", "underhook", "overhook",
    "whizzer", "cross face", "IBJJF", "EDGE",
]


def names_from_graph() -> set[str]:
    if not GRAPH.exists():
        print(f"[glossary] {GRAPH} missing — run `npm run regenerate:graph-base` first",
              file=sys.stderr)
        return set()
    doc = json.loads(GRAPH.read_text(encoding="utf-8"))
    found: set[str] = set()

    def walk(o) -> None:
        if isinstance(o, dict):
            for k, v in o.items():
                if k in ("name", "title", "t") and isinstance(v, str) and v.strip():
                    found.add(v.strip())
                else:
                    walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(doc)
    out: set[str] = set()
    for n in found:
        if not n or len(n) > 80:
            continue
        out.add(n)
        bare = ROLE_SUFFIX.sub("", n).strip()
        if bare:
            out.add(bare)
    return out


def names_from_content() -> set[str]:
    """System and principle names live in content/, not always in the graph."""
    out: set[str] = set()
    for sub in ("Systems", "Principles", "Learning"):
        d = CONTENT / sub
        if not d.is_dir():
            continue
        for f in d.glob("*.json"):
            try:
                doc = json.loads(f.read_text(encoding="utf-8"))
            except Exception:
                continue
            n = doc.get("name") if isinstance(doc, dict) else None
            if isinstance(n, str) and n.strip():
                out.add(n.strip())
            out.add(f.stem)
    return out


def build() -> dict:
    graph = names_from_graph()
    content = names_from_content()
    names = sorted(graph | content)
    return {
        "_meta": {
            "generated_by": "scripts/build_glossary.py",
            "source": "graph.json + content/{Systems,Principles,Learning}",
            "rule": "Every string in `names` is reproduced VERBATIM in a translation — never "
                    "translated, never transliterated, never annotated. Both the role-suffixed "
                    "and the bare spelling are listed. `keep_english` holds the common BJJ "
                    "vocabulary a Taiwanese gym says in English mid-sentence.",
            "count": len(names),
        },
        "names": names,
        "keep_english": KEEP_ENGLISH,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="fail if glossary.json is out of date")
    args = ap.parse_args()

    fresh = build()
    if not fresh["names"]:
        print("[glossary] refusing to write an EMPTY glossary — that would silently permit every "
              "technique name to be translated", file=sys.stderr)
        return 2

    text = json.dumps(fresh, ensure_ascii=False, indent=1) + "\n"
    if args.check:
        if not OUT.exists() or OUT.read_text(encoding="utf-8") != text:
            print("[glossary] STALE — run `python scripts/build_glossary.py`", file=sys.stderr)
            return 1
        print(f"[glossary] OK — {fresh['_meta']['count']} names")
        return 0

    OUT.write_text(text, encoding="utf-8")
    print(f"[glossary] wrote {OUT.relative_to(ROOT)} — {fresh['_meta']['count']} names, "
          f"{len(fresh['keep_english'])} kept-English terms")
    return 0


if __name__ == "__main__":
    sys.exit(main())
