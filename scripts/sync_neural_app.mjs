// Copy the built canvas bundle (neural/dist) into the places the site serves it from.
//
// This used to be `mkdir -p … && cp …` inside an npm script. npm runs package scripts through
// cmd.exe on Windows, where neither `mkdir -p` nor `cp` exists, so the copy failed *after* the
// bundle had been rebuilt — leaving a fresh dist next to a stale deployed copy, with the npm
// script still looking like it had done its job.
//
//   node scripts/sync_neural_app.mjs            -> source/quartz/static/neural/app
//   node scripts/sync_neural_app.mjs --public   -> also refresh a live source/public build
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIST = path.join(ROOT, "neural/dist")
const STATIC_APP = path.join(ROOT, "source/quartz/static/neural/app")
const PUBLIC_NEURAL = path.join(ROOT, "source/public/static/neural")

if (!fs.existsSync(DIST)) {
  console.error(`[sync-neural] ${DIST} does not exist — run 'node neural/build/build.mjs' first`)
  process.exit(1)
}

function copyInto(destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  const files = fs.readdirSync(DIST)
  for (const f of files) fs.copyFileSync(path.join(DIST, f), path.join(destDir, f))
  console.log(`[sync-neural] ${files.length} file(s) -> ${path.relative(ROOT, destDir)}`)
}

copyInto(STATIC_APP)

if (process.argv.includes("--public")) {
  if (fs.existsSync(PUBLIC_NEURAL)) {
    // the generated data chunks too, so a dev loop sees new decks without a full build
    fs.cpSync(path.join(ROOT, "source/quartz/static/neural"), PUBLIC_NEURAL, { recursive: true })
    copyInto(path.join(PUBLIC_NEURAL, "app"))
  } else {
    console.log("[sync-neural] no source/public build to refresh — skipped --public")
  }
}
