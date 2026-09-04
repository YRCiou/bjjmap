// The manifest's `zh` bitmap is written by Python and read by JavaScript, and nothing else
// checks that the two agree. A disagreement is silent and expensive: a deck whose bit is wrong
// either fetches a Chinese chunk that does not exist (and falls back to English forever) or
// never fetches the one that does.
//
// So this is not a round-trip of the encoder against itself — that would pass on a shared bug.
// It decodes the EMITTED manifest with the SAME logic app.src.jsx uses, and compares the result
// against ground truth taken from a third place: the deck keys actually present inside
// flashcards/zh/*.json.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FC = path.join(ROOT, "source/quartz/static/neural/flashcards");
const MANIFEST = path.join(FC, "_index.json");

/** The decoder from app.src.jsx's _ingestDeckManifest, kept identical on purpose. */
function decodeZhBitmap(b64, keys) {
  const out = new Set();
  if (!b64) return out;
  const bin = Buffer.from(b64, "base64").toString("binary");
  for (let i = 0; i < keys.length; i++) {
    const byte = bin.charCodeAt(i >> 3);
    if (byte && (byte >> (i & 7)) & 1) out.add(keys[i]);
  }
  return out;
}

const haveBuild = existsSync(MANIFEST);

test("zh bitmap decodes to exactly the decks that have a Chinese chunk", { skip: !haveBuild && "no build in source/quartz/static/neural — run `npm run regenerate:neural`" }, () => {
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  assert.equal(manifest._meta.format, 5, "manifest format changed — update this test with it");
  assert.equal(typeof manifest.zh, "string", "`zh` must be a base64 bitmap, not an index array");

  const keys = Object.keys(manifest.decks);
  const decoded = decodeZhBitmap(manifest.zh, keys);

  // ground truth: whatever the chunk files actually hold
  const zhDir = path.join(FC, "zh");
  const truth = new Set();
  if (existsSync(zhDir)) {
    for (const f of readdirSync(zhDir).filter((n) => n.endsWith(".json"))) {
      for (const k of Object.keys(JSON.parse(readFileSync(path.join(zhDir, f), "utf8")))) truth.add(k);
    }
  }

  const listedButAbsent = [...decoded].filter((k) => !truth.has(k));
  const presentButUnlisted = [...truth].filter((k) => !decoded.has(k));
  assert.deepEqual(listedButAbsent, [], "bitmap marks decks with no Chinese chunk — they would fetch a 404 and silently stay English");
  assert.deepEqual(presentButUnlisted, [], "Chinese chunks exist for decks the bitmap does not mark — they would never be fetched");

  // the bitmap is exactly as long as it needs to be, so a stale longer one cannot mark a deck
  // that no longer exists
  assert.equal(Buffer.from(manifest.zh, "base64").length, Math.ceil(keys.length / 8),
    "bitmap length does not match the deck count");
});

test("a set bit means the deck's Chinese chunk holds the same number of cards as the English one", { skip: !haveBuild && "no build" }, () => {
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  const keys = Object.keys(manifest.decks);
  const decoded = decodeZhBitmap(manifest.zh, keys);
  const zhDir = path.join(FC, "zh");
  let checked = 0;
  for (const f of readdirSync(zhDir).filter((n) => n.endsWith(".json"))) {
    const chunk = JSON.parse(readFileSync(path.join(zhDir, f), "utf8"));
    for (const [k, deck] of Object.entries(chunk)) {
      assert.ok(decoded.has(k), `${k} has a chunk but no bit`);
      assert.equal(deck.cards.length, manifest.decks[k][1],
        `${k}: Chinese chunk has ${deck.cards.length} cards, manifest says ${manifest.decks[k][1]} — ` +
        "the positional join would pair grades with the wrong questions");
      checked++;
    }
  }
  // a check that verified nothing must not read as a pass (CLAUDE.md 6.6)
  assert.ok(checked > 0, "no Chinese chunks were checked at all");
  console.log(`  [zh-bitmap] ${checked} translated deck(s) verified`);
});
