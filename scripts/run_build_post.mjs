// Post-Quartz build steps, in one place so they run identically on Linux and Windows.
//
// They used to be a `&&` chain inside package.json's "build" that called `python3`. On Windows
// npm runs scripts through cmd.exe, where `python3` resolves to the Microsoft Store stub (or to
// nothing at all): every Python step was silently skipped and the site deployed without
// _headers, _redirects or llms.txt. Resolving the interpreter here — and FAILING when none is
// found — makes a skipped step impossible to mistake for a passing one.
import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = path.join(ROOT, "source")

function findPython() {
  if (process.env.PYTHON) return process.env.PYTHON
  for (const cmd of ["python3", "python", "py"]) {
    const probe = spawnSync(cmd, ["-c", "import sys; print(sys.version_info[0])"], {
      encoding: "utf8",
      shell: false,
    })
    if (probe.status === 0 && probe.stdout.trim() === "3") return cmd
  }
  throw new Error("no Python 3 interpreter found (tried python3, python, py; set $PYTHON)")
}

const PY = findPython()
// PYTHONUTF8: these scripts read UTF-8 JSON/Markdown, and Windows still defaults to the
// system ANSI code page (cp950 here), which fails on the first em dash in graph.json.
const env = { ...process.env, PYTHONUTF8: "1" }

const STEPS = [
  { cmd: PY, args: ["../scripts/regenerate_redirects.py"], cwd: SOURCE },
  { cmd: PY, args: ["../scripts/regenerate_headers.py"], cwd: SOURCE },
  { cmd: PY, args: ["../scripts/check_headers_cache.py"], cwd: SOURCE },
  { cmd: PY, args: ["../scripts/regenerate_llms_txt.py"], cwd: SOURCE },
  { cmd: process.execPath, args: ["scripts/build_forward_components.mjs"], cwd: ROOT },
  { cmd: process.execPath, args: ["scripts/build_share_shell.mjs"], cwd: ROOT },
  { cmd: PY, args: ["scripts/check_payload_budget.py"], cwd: ROOT },
]

for (const step of STEPS) {
  const label = `${path.basename(step.args[0])}`
  console.log(`[build:post] ${label}`)
  const r = spawnSync(step.cmd, step.args, { cwd: step.cwd, env, stdio: "inherit", shell: false })
  if (r.status !== 0) {
    console.error(`[build:post] FAILED at ${label} (exit ${r.status})`)
    process.exit(r.status ?? 1)
  }
}
console.log("[build:post] all post-build steps completed")
