# BJJ Map

![Status](https://img.shields.io/badge/Status-Beta-yellow)
![Active Development](https://img.shields.io/badge/Development-Active-green)

Brazilian Jiu-Jitsu modelled as one interactive knowledge graph and state machine, published as a
static site. Positions are states, transitions are states too, and the edges between them are the
probabilistic outcomes: how often a technique works, fails, or gets countered.

**Site**: [bjjmap.pages.dev](https://bjjmap.pages.dev)

## What's inside

### Knowledge base

- **137+ Positions** — positions as state-machine nodes, with top/bottom role pages
- **1000+ Transitions** — techniques as probabilistic edges between states, with attacker/defender role pages
- **350+ Submissions** — terminal states and finishing techniques
- **47 Systems** — systematic approaches to the game
- **59 Principles** — fundamentals: base, posture, framing, connection, …
- **22 Learning articles** — strategy, training method, competition tactics

Source data lives in `content/**/*.json`; the `.md` pages are generated from it.

### Interactive front-end

- **The graph is the page.** The whole knowledge graph sits behind every route as a live canvas.
  Click a node to crossfade to it; swipe the drawer up to browse.
- **Roll mode** — play a roll out against the model: pick a move, the dice resolve it against the
  transition's real success rate, and the roll is logged state by state.
- **Training** — spaced-repetition flashcards (SM-2) built per technique and per role, with a daily
  goal and deck filters (due / reviewing / mastered / suggested / recently explored).
- **Challenges** — a belt-shaped curriculum over the graph: tracks, units, lessons.
- **Search** — Flexsearch full-text index, fetched lazily on first open.
- **Everything is local.** Progress lives in `localStorage` under `bjj-neural-progress`. There are
  no accounts, no server-side storage, no analytics, and no third-party requests other than
  Google Fonts.

## Local development

Requires **Node 20+** and **Python 3**.

```bash
npm install                 # also installs source/ (Quartz)
npm run regenerate:neural   # build the canvas app bundle + its data from graph.json
npm run build               # Quartz build + post-processing -> source/public
npm run serve               # serve source/public on :8080
```

`npm run build` runs Quartz and then `npm run build:post`
(`scripts/run_build_post.mjs`), which regenerates `_redirects`, `_headers` and `llms.txt`, builds
the `/dev` component library and the share shell, and enforces the payload budget. It resolves a
Python 3 interpreter itself (`python3`, `python`, `py`, or `$PYTHON`) and fails loudly rather than
skipping a step, so it behaves the same on Linux and Windows.

Useful subsets:

```bash
npm run build:post          # re-run only the post-Quartz steps
npm run dev:neural          # rebuild just the canvas app + data into a live public/
npm run dev:neural:app      # rebuild just the app bundle (<1s)
npm run validate:json       # schema-check every content JSON
npm run validate:graph      # graph integrity (edges resolve, probabilities sum)
npm run test:units          # node --test over tests/
npm run e2e                 # Playwright journeys
```

## Content pipeline

`content/**/*.json` is the source of truth. The `.md` pages, the category hubs, `graph.json`, the
graph layout and the canvas app's data chunks are all generated from it:

```bash
npm run regenerate:md          # JSON -> Markdown pages
npm run regenerate:hubs        # category hub pages
npm run regenerate:graph       # graph.json + layout + ordinals + edge strength
npm run regenerate:explorer    # explorer tree
npm run regenerate:neural      # canvas app data chunks
```

Never hand-edit a generated `.md`; edit its `.json` and regenerate.

## Project structure

```
bjjmap/
├── content/               # *.json = SOURCE data, *.md = GENERATED pages
│   ├── Positions/         # positions (hub + Top/Bottom role pages)
│   ├── Transitions/       # transitions (hub + Attacker/Defender role pages)
│   ├── Submissions/       # submissions (hub + Attacker/Defender role pages)
│   ├── Systems/           # systematic approaches
│   ├── Principles/        # fundamentals
│   └── Learning/          # strategy & training articles
├── templates/             # JSON schemas + Jinja2 page templates
├── graph.json             # generated graph feed
├── neural/                # the canvas app (built into source/quartz/static/neural)
├── source/                # Quartz static-site generator
│   └── quartz/            # components, plugins, styles
├── scripts/               # validation, regeneration and build tooling
├── forward/               # component/motion library served at /dev
├── docs/                  # architecture, content standards, SEO
├── e2e/                   # Playwright journeys
└── tests/                 # unit tests and gate artifacts
```

## Documentation

| Doc | Contents |
|---|---|
| [docs/Architecture.md](docs/Architecture.md) | JSON pipeline, position model, graph semantics |
| [docs/Content.md](docs/Content.md) | Content standards and validation rules |
| [docs/Neural.md](docs/Neural.md) | The canvas app's behaviour spec |
| [docs/SEO.md](docs/SEO.md) | Schema markup and keywords |

## Technology

Built on [Quartz 4](https://quartz.jzhao.xyz/) with:

- **Graph rendering** — the canvas app's own renderer, fed by build-time data
  (`/static/neural/graph-data.json`); node2vec + UMAP precompute global node positions so the
  first paint needs no layout pass.
- **Search** — Flexsearch, gzipped and fetched on demand.
- **SPA navigation** — micromorph-style page swaps; the overlay re-mounts on each soft nav.
- **SEO** — Quartz remains the generator: every indexed URL ships a real `<article>`, `<head>` and
  JSON-LD that the canvas app overlays client-side.
- **Mobile** — pinch-zoom and drag-pan the graph; one 88vw drawer for the study pane.

## Deployment

Hosted on **Cloudflare Pages** (project `bjjmap`), deployed with wrangler:

```bash
npm install
npm run regenerate:neural
npm run build
npx wrangler pages deploy source/public --project-name bjjmap --branch main
```

## License

PolyForm Noncommercial 1.0.0 — free for personal, educational and non-commercial use; commercial
use requires permission. See [LICENSE.md](LICENSE.md).

## Links

- **Site**: https://bjjmap.pages.dev
- **Repository**: https://github.com/YRCiou/bjjmap
- **Quartz docs**: https://quartz.jzhao.xyz/
