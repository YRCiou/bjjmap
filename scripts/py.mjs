// Run a Python script with whatever this machine calls Python 3.
//
// `python3` does not exist on Windows: npm runs package scripts through cmd.exe, where the name
// resolves to the Microsoft Store stub (or to nothing). An `&&` chain that calls it therefore
// stops — or worse, continues as if the step had passed — and the step is silently skipped.
// Every npm script that shells out to Python goes through here instead:
//
//     "regenerate:neural": "node neural/build/build.mjs && node scripts/py.mjs scripts/foo.py"
//
// Exits with the child's own status, so a failure can never read as a pass.
import { spawnSync } from "node:child_process"

export function findPython() {
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

// PYTHONUTF8: these scripts read UTF-8 JSON and Markdown, and Windows still defaults to the
// system ANSI code page, which dies on the first em dash in graph.json.
export function runPython(args, opts = {}) {
  const r = spawnSync(findPython(), args, {
    stdio: "inherit",
    shell: false,
    ...opts,
    env: { ...process.env, PYTHONUTF8: "1", ...(opts.env ?? {}) },
  })
  return r.status ?? 1
}

const invokedDirectly = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))
if (invokedDirectly || process.argv.length > 2) {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error("usage: node scripts/py.mjs <script.py> [args…]")
    process.exit(2)
  }
  process.exit(runPython(args))
}
