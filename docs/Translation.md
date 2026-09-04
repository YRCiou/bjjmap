# Translation brief — English → Traditional Chinese (Taiwan)

You are translating BJJ flashcards for a Taiwanese audience. Work in
`D:\OneDrive\claude\102_bjjmap`.

## What to produce

For each source file `content/<path>/<Name>.json`, write a sibling
`content/<path>/<Name>.zh.json` containing ONLY the translated strings, in the same
structure as the source.

Source shape (a position file):

```json
{ "flashcards_family": [ {card}, ... ], "flashcards_position": [ {card}, ... ] }
```

Source shape (a transition/submission file):

```json
{ "attacker": { "flashcards": [ {card}, ... ] }, "defender": { "flashcards": [...] } }
```

Each card:

```json
{ "question": "...", "answer": "...", "answer_line": "...",
  "distractors": { "plausible": ["...", "..."], "trap": ["..."] } }
```

Your output file must mirror EXACTLY those paths and array positions, with only the four
translatable things per card: `question`, `answer`, `answer_line`, and the two distractor lists.
Omit any field the source does not have. Arrays must keep the same length and order — index `i`
in your output is the translation of index `i` in the source.

Add this at the top level:

```json
"_meta": { "source": "content/<path>/<Name>.json", "lang": "zh-TW",
           "scope": "flashcards", "translator": "code", "complete": true }
```

Write with the Write tool, UTF-8, `indent=1`-ish formatting is fine — it must be valid JSON.

## Translation rules

1. **The glossary is law.** Read `scripts/glossary.json` first. Every string in its `names`
   array is a proper name — a position, technique, submission, system or principle — and is
   reproduced **verbatim in English** wherever it appears, including mid-sentence. Never
   translate, transliterate, or annotate them.
   Example: `如何辨識對手正在設置 Kimura？` — `Kimura` stays English, the rest is Chinese.

2. **Common BJJ vocabulary also stays English** where a Taiwanese gym says it in English. The
   `keep_english` list in the same file has them: guard, pass, sweep, mount, side control,
   back control, hook, grip, frame, base, posture, gi, no-gi, tap, roll, drill, escape,
   submission, underhook, whizzer, IBJJF, and so on. Keep the English word inside the Chinese
   sentence; do not add a Chinese gloss in brackets.

3. **Taiwan usage, natural register.** 繁體中文, Taiwan vocabulary and punctuation
   （，。、「」）. Never Simplified characters. Never mainland terms (用「影片」不用「视频」,
   用「品質」不用「质量」, 用「程式」不用「程序」). Write the way a Taiwanese coach explains
   something to a student: direct, concrete, second person where the English is.

4. **Translate, do not rewrite.** Same meaning, same level of detail, same order of ideas. Do
   not summarise a long answer, do not add commentary, do not "improve" the reasoning. If the
   English says something in three clauses, say it in three clauses.

5. **`answer_line` is a one-line answer shown on a card face** — keep it short (under ~30
   Chinese characters) and punchy, the way the English is.

6. **Distractors are wrong answers in a multiple-choice question.** They must stay plausible and
   parallel in form to the correct `answer_line`. Do not make them obviously wrong in Chinese
   when they were subtle in English.

7. Anatomy, physics and mechanics get real Chinese terms: 髖 (hip), 肩胛 (scapula),
   槓桿 (leverage), 重心 (centre of gravity), 支撐點 (base point), 頸動脈 (carotid),
   壓力 (pressure), 角度 (angle), 破勢 (off-balancing). Where a term has no settled Chinese in
   Taiwanese BJJ circles, keep the English.

## Quality bar

Sonnet-level quality is the target: accurate, readable, natural. Do not agonise over single word
choices — coverage and correctness matter more than polish.

## Verify before you finish

For every file you write, confirm with a quick Bash/python check that:
- the `.zh.json` parses as JSON,
- each translated array has the SAME length as the same array in the source,
- no Simplified characters slipped in.

Report: the files you wrote, the card count per file, and anything you deliberately left in
English beyond the glossary.

---

## The failure this section exists to prevent

A translation pass rendered proper names into Chinese: `heel hook` became 腳跟鎖,
`triangle` became 三角鎖, `armbar` became 十字固, `ankle lock` became 腳踝鎖. It happened in
54 files, 222 times, and it is easy to miss on review because each sentence reads perfectly
well — the Chinese is fluent, it is just wrong. A Taiwanese practitioner says "heel hook", and
more importantly the name is the join between the sentence and the graph node the reader is
looking at.

**Before you finish a batch, scan your own output for it.**

```bash
python scripts/check_translations.py --check       # structure only — will NOT catch this
```

`check_translations.py` validates array lengths and Simplified characters. It does not know
what a proper name is, so the name check is on you. Grep your own files for the Chinese forms
of the terms in `scripts/glossary.json` `keep_english`. The ones that have actually occurred:

| Chinese written | should have stayed |
|---|---|
| 腳跟鎖 / 足跟鎖 / 跟腱鎖 | heel hook |
| 三角鎖 / 三角勒 / 三角絞 | triangle |
| 十字固 / 臂十字 / 直臂鎖 / 手臂鎖 | armbar |
| 腳踝鎖 / 踝鎖 / 踝關節鎖 / 直踝鎖 | ankle lock |
| 木村鎖 | kimura |
| 裸絞 / 後裸絞 | rear naked choke |
| 美式鎖 / 肩固 | americana |
| 斷頭台 | guillotine |
| 腕鎖 | wrist lock |
| 蝴蝶掃 / 剪刀掃 / 髖頂掃 | butterfly / scissor / hip bump sweep |
| 膝切過腿 / 托雷安多 | knee slice pass / toreando |

**The distinction that matters:** a NAME stays English, a COMMON NOUN does not. "This is a
choke" is 這是一個絞技 and that is correct — 絞技 as an ordinary word is fine. "Rear Naked
Choke" is a name and stays English even mid-sentence. The test is whether the English source
capitalises it or refers to a specific technique in the graph.

**Put a space between Chinese and embedded English.** 定義了 closed guard，並把它與 open
guard 區分開來 reads; 從Ashi Garami施展的heel hook does not. This is inconsistent across the
corpus today and is worth getting right in new batches.
