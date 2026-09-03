#!/usr/bin/env python3
"""Validate every content/**/*.zh.json against its English source, and keep the progress ledger.

A translation is only usable if it lines up EXACTLY with the source: same arrays, same lengths,
same order. Index `i` of a translated array is card `i` of the English one — that positional
join is how `regenerate_neural_data.py` matches a Chinese card to the English question that
keys its schedule. A file that is one element short does not translate 19 of 20 cards; it
translates cards 0-18 with the text of cards 1-19, and every one of them is wrong.

So this refuses to pass on a length mismatch, and the pipeline refuses to emit what it flags.

    python scripts/check_translations.py            # validate + rewrite the progress ledger
    python scripts/check_translations.py --check    # validate only, non-zero on any error
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
LEDGER = ROOT / "scripts" / "translation_progress.json"
ZH_SUFFIX = ".zh.json"

CARD_FIELDS = ("question", "answer", "answer_line")

# Characters that exist ONLY in Simplified — each has a different Traditional form. Written as
# individual characters on purpose: an earlier version listed WORDS (視頻, 質量, 程序) inside a
# character class, so every character in them matched and 量/程/序/硬 — all perfectly good
# Traditional characters — were flagged on 52 lines of correct text. A smoke alarm that goes
# off on clean air gets disconnected, which is worse than not having one.
#
# 后 is deliberately ABSENT: it is a real Traditional character (皇后), so flagging it would
# reintroduce exactly that false positive. 後 vs 后 has to be caught by a reader.
SIMPLIFIED = re.compile(
    "[这个们么来对说时开关动过还样问题实现让给边讲权买卖东车马长门闻间视频质网络软"
    "图书报纸电脑单双击变换转载记忆认识务经经济历专业页语译头体会学习从进运势处应"
    "发内断续级组织结线约练习点击图标准备术术]"
)


def iter_card_lists(doc: dict):
    for key in ("flashcards_family", "flashcards_position", "flashcards"):
        v = doc.get(key)
        if isinstance(v, list) and v:
            yield (key,), v
    for role in ("attacker", "defender", "top", "bottom"):
        blk = doc.get(role)
        if not isinstance(blk, dict):
            continue
        v = blk.get("flashcards")
        if isinstance(v, list) and v:
            yield (role, "flashcards"), v
        for tier in ("core", "advanced", "safety"):
            tv = blk.get(tier)
            if isinstance(tv, dict) and isinstance(tv.get("flashcards"), list) and tv["flashcards"]:
                yield (role, tier, "flashcards"), tv["flashcards"]


def dig(doc, path):
    node = doc
    for k in path:
        if not isinstance(node, dict):
            return None
        node = node.get(k)
    return node


def check_file(zh_path: Path) -> tuple[list[str], int, int]:
    """Returns (errors, translated_cards, translated_strings)."""
    errs: list[str] = []
    src_path = zh_path.with_name(zh_path.name[: -len(ZH_SUFFIX)] + ".json")
    if not src_path.exists():
        return [f"no English source at {src_path.name}"], 0, 0
    try:
        zh = json.loads(zh_path.read_text(encoding="utf-8"))
        en = json.loads(src_path.read_text(encoding="utf-8"))
    except Exception as e:
        return [f"unreadable: {e}"], 0, 0

    cards = strings = 0
    for path, en_cards in iter_card_lists(en):
        zh_cards = dig(zh, path)
        if zh_cards is None:
            continue                       # this deck is simply not translated yet — allowed
        label = ".".join(map(str, path))
        if not isinstance(zh_cards, list):
            errs.append(f"{label}: expected a list, got {type(zh_cards).__name__}")
            continue
        if len(zh_cards) != len(en_cards):
            errs.append(f"{label}: {len(zh_cards)} cards, source has {len(en_cards)} — the "
                        f"positional join would pair every card with the wrong question")
            continue
        for i, (zc, ec) in enumerate(zip(zh_cards, en_cards)):
            if zc in (None, {}):
                continue                   # an untranslated slot inside a translated deck
            if not isinstance(zc, dict):
                errs.append(f"{label}[{i}]: expected an object")
                continue
            touched = False
            for f in CARD_FIELDS:
                v = zc.get(f)
                if isinstance(v, str) and v.strip():
                    touched = True
                    strings += 1
                    if SIMPLIFIED.search(v):
                        errs.append(f"{label}[{i}].{f}: Simplified characters")
            for grp in ("plausible", "trap"):
                zl = (zc.get("distractors") or {}).get(grp) if isinstance(zc.get("distractors"), dict) else None
                el = (ec.get("distractors") or {}).get(grp) if isinstance(ec.get("distractors"), dict) else None
                if zl is None:
                    continue
                if not isinstance(zl, list):
                    errs.append(f"{label}[{i}].distractors.{grp}: expected a list")
                elif el is not None and len(zl) != len(el):
                    errs.append(f"{label}[{i}].distractors.{grp}: {len(zl)} vs {len(el)} in source")
                else:
                    touched = True
                    strings += len(zl)
                    for v in zl:
                        if isinstance(v, str) and SIMPLIFIED.search(v):
                            errs.append(f"{label}[{i}].distractors.{grp}: Simplified characters")
            if touched:
                cards += 1
    if cards == 0 and not errs:
        errs.append("carries no translated card at all")
    return errs, cards, strings


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="validate only; do not write the ledger")
    args = ap.parse_args()

    zh_files = sorted(CONTENT.rglob("*" + ZH_SUFFIX))
    total_cards = total_strings = 0
    bad = 0
    done: list[dict] = []
    for zh in zh_files:
        errs, cards, strings = check_file(zh)
        rel = str(zh.relative_to(ROOT)).replace("\\", "/")
        if errs:
            bad += 1
            print(f"FAIL {rel}")
            for e in errs[:6]:
                print(f"       {e}")
            if len(errs) > 6:
                print(f"       … and {len(errs) - 6} more")
            continue
        total_cards += cards
        total_strings += strings
        done.append({"file": rel, "cards": cards, "strings": strings})

    # How much is left. Counting the SOURCE decks is what makes the remaining figure honest —
    # a percentage of files says nothing when files hold 8 to 48 cards each.
    src_total = src_files = 0
    for src in CONTENT.rglob("*.json"):
        if src.name.endswith(ZH_SUFFIX) or ".obsidian" in src.parts:
            continue
        try:
            doc = json.loads(src.read_text(encoding="utf-8"))
        except Exception:
            continue
        n = sum(len(c) for _, c in iter_card_lists(doc)) if isinstance(doc, dict) else 0
        if n:
            src_total += n
            src_files += 1

    pct = 100.0 * total_cards / src_total if src_total else 0.0
    print(f"\n[translations] {len(done)} file(s) valid, {bad} failing")
    print(f"[translations] {total_cards:,} of {src_total:,} cards translated ({pct:.2f}%), "
          f"{total_strings:,} strings")
    print(f"[translations] {len(done)} of {src_files:,} files started")

    if not args.check:
        LEDGER.write_text(json.dumps({
            "_meta": {
                "generated_by": "scripts/check_translations.py",
                "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "note": "The ledger is DERIVED from what is on disk — it is regenerated by this "
                        "script, never hand-edited. To continue, pick files that are not in "
                        "`done`, translate them into <Name>.zh.json, and re-run this script.",
                "cards_translated": total_cards,
                "cards_total": src_total,
                "percent": round(pct, 3),
                "files_done": len(done),
                "files_total": src_files,
            },
            "done": done,
        }, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"[translations] ledger -> {LEDGER.relative_to(ROOT)}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
