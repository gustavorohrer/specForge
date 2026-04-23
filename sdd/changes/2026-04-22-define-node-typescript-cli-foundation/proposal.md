# Proposal — define Node.js + TypeScript CLI foundation

- **Change ID:** `2026-04-22-define-node-typescript-cli-foundation`
- **Status:** Draft (proposed)
- **Author:** Staff Software Architect
- **Date:** 2026-04-22

---

## A. Problem

SpecForge has been bootstrapped for SDD but has **no technical foundation**. Before any CLI command can be implemented, the project must commit to a runtime, language, package manager, CLI framework, test runner, linting/formatting tool, build tool, and on-disk layout.

Freezing these as one coherent decision record — now, before any code — prevents:

- ad-hoc tooling accretion spread across unrelated PRs,
- competing opinions embedded in future implementation changes,
- rework when `specforge init` and `specforge adapt` need a stable skeleton to target.

This change **decides**. It does **not** install.

## B. Scope

**In scope**
- Final choice of runtime, language, and package manager (confirming values in `sdd/project.md`).
- Final choice of CLI framework, test runner, linter/formatter, and build tool.
- Minimum project structure for a CLI application.
- CLI entrypoint and package-script strategy (names only).

**Not in scope**
- `package.json`, `tsconfig.json`, lockfile, or any config files.
- Installed dependencies.
- CLI commands, adapters, templates, repository analysis, bootstrap logic.
- CI configuration.
- Release / distribution strategy (stays as open decision in `sdd/project.md`).

## C. Decisions

### C.1 Runtime — Node.js

**Confirmed.** SpecForge is CLI-first and must ship through `npm` to stay agent-agnostic and frictionless. Node is the lowest-common-denominator runtime for `npm`-distributed CLIs.

- **Minimum version: Node.js 20.10+** (current LTS line).
- Rationale: stable ESM, native `fetch`, `node:test`, `--experimental-import-meta-resolve`. Drops Node 18 to avoid a compatibility tax on a greenfield project.

### C.2 Language — TypeScript

**Confirmed.** Strong types are load-bearing when the primary contributors are AI agents: types drive better completions, better diagnostics, and better spec-to-code traceability.

- TypeScript **5.5+**.
- `strict: true`, `noUncheckedIndexedAccess: true`.
- **ESM only** (`"type": "module"` in the eventual `package.json`).

### C.3 Package manager — pnpm

**Confirmed** (pre-existing in `sdd/project.md`). Reaffirmed here:

- Deterministic installs, strict dependency resolution (no phantom deps).
- Fast and disk-efficient.
- First-class workspaces if SpecForge later ships templates/plugins as sibling packages.

### C.4 CLI framework — `commander` vs `cac`

| Criterion | `commander` | `cac` |
|---|---|---|
| Maturity / install base | Very high; de-facto standard | Smaller but established (Vite, Unbuild) |
| Bundle size | ~60 kB | ~15 kB |
| API ergonomics | Builder-style, explicit, verbose | Chainable, terse |
| TypeScript types | First-class, excellent | First-class, good |
| Subcommand model | Formal nested commands | Nested commands, less formal |
| Default help output | Polished | Clean but simpler |
| Ecosystem / plugins | Rich | Sparse |
| Async handlers | Yes | Yes |

**Recommendation: `commander`.**

Reasoning:
- SpecForge is a CLI the user types repeatedly (`specforge init`, `specforge adapt`, …); `commander`'s default help and argument validation save us from writing that polish ourselves.
- Ubiquity matters: AI agents have more training data on `commander` patterns, improving the quality of generated handlers.
- `cac`'s bundle-size advantage is not meaningful for an `npm`-distributed CLI.

Tradeoff accepted: slightly more verbose command definitions.

### C.5 Linting & formatting — Biome vs ESLint + Prettier

| Criterion | Biome | ESLint + Prettier |
|---|---|---|
| Setup surface | Single tool, single config | Two tools, two configs |
| Speed | Very fast (Rust) | Moderate |
| Rule breadth | Strong but narrower | Industry-leading via plugins |
| TypeScript support | Native | Via `@typescript-eslint` |
| Formatter quality | Prettier-compatible | Prettier itself |
| Customization for edge rules | Limited | Extensive |
| Familiarity | Growing | Ubiquitous |

**Recommendation: Biome.**

Reasoning:
- SpecForge is a small, self-contained CLI — ESLint's plugin depth is overkill.
- One tool = one config = one CI step = one failure mode to explain to agents.
- If a specific rule is ever missing, switching back is additive, not terminal.

Tradeoff accepted: less plugin depth in exchange for simplicity and speed.

### C.6 Testing — Vitest

**Recommendation: Vitest.**

Reasoning:
- Native ESM and TypeScript with no transpile step — matches the stack.
- Jest-compatible API — agents know it already.
- First-class `vi.mock` for stubbing filesystem and process calls, which a file-writing CLI exercises heavily.
- Built-in coverage (v8) — no extra tool.

Alternative considered: `node:test`. Rejected for now — adequate runner, weaker mocking ergonomics for filesystem-heavy code, smaller agent training base.

### C.7 Build strategy — `tsup` vs `tsc`-only vs other

| Option | Pros | Cons |
|---|---|---|
| `tsc` only | No extra dep, emits `.js` + `.d.ts` | Slow, no bundling, awkward shebang/CLI entry |
| `tsup` (esbuild) | Fast, bundles to single file, CLI entry + shebang handled, optional `.d.ts` | One extra dev dep |
| `unbuild` | Good for multi-entry libraries | Heavier than needed |
| Bun build | Fastest | Requires Bun as dev dep — breaks Node-only posture |

**Recommendation: `tsup`.**

Reasoning:
- A published CLI benefits from a bundled single file: fast startup, clean shebang injection.
- `tsup` is a thin wrapper over esbuild — low maintenance, widely understood.
- Type declarations can be emitted later if SpecForge grows a programmatic API.

### C.8 Project structure

Minimal, evolvable layout:

```
specForge/
├── src/
│   ├── cli.ts                # shebang + commander wiring; thin entrypoint
│   ├── commands/             # one file per top-level command (future)
│   └── lib/                  # pure logic, testable in isolation (future)
├── test/                     # vitest specs; mirrors src/ structure
├── dist/                     # build output (gitignored)
├── package.json              # deferred
├── tsconfig.json             # deferred
├── biome.json                # deferred
├── tsup.config.ts            # deferred
└── vitest.config.ts          # deferred
```

Rules:

- `src/cli.ts` is the only entrypoint; it parses args and delegates.
- No business logic in `src/cli.ts` — it wires and exits.
- `src/commands/` holds command handlers; each exports a function consumed by `src/cli.ts`.
- `src/lib/` holds pure functions (filesystem abstracted behind a thin adapter) so unit tests do not touch the real disk.
- `test/` mirrors `src/` 1:1.

### C.9 CLI entrypoint & scripts (names only)

- **Binary name:** `specforge` (mapped via `"bin"` in `package.json`, deferred).
- **Source entrypoint:** `src/cli.ts` → bundled to `dist/cli.js` with `#!/usr/bin/env node` shebang injected by `tsup`.
- **Canonical scripts** (implementation deferred):
  - `dev` — run locally via `tsx src/cli.ts …`.
  - `build` — `tsup`.
  - `test` — `vitest run`.
  - `test:watch` — `vitest`.
  - `lint` — `biome check .`.
  - `format` — `biome format --write .`.
  - `typecheck` — `tsc --noEmit`.

## D. Out of scope (explicit)

- No CLI commands (`init`, `adapt`, …).
- No adapters, templates, or generators.
- No bootstrap or repository-analysis logic.
- No `package.json`, `tsconfig.json`, `biome.json`, `tsup.config.ts`, `vitest.config.ts`.
- No installed dependencies.
- No CI, no release automation.

## E. Recommended stack (final summary)

| Concern | Choice |
|---|---|
| Runtime | Node.js 20.10+ |
| Language | TypeScript 5.5+, strict, ESM |
| Package manager | pnpm |
| CLI framework | `commander` |
| Linter / formatter | Biome |
| Test runner | Vitest |
| Build | `tsup` |
| Binary name | `specforge` |
| Source entrypoint | `src/cli.ts` |
| Built entrypoint | `dist/cli.js` |

**Decision lock.** These decisions are locked until explicitly modified by a new SDD change. Implementation PRs may not substitute alternatives (framework, runner, build, linter) ad-hoc — any deviation requires a dedicated proposal against this change.

## F. Risks & unknowns

- **Biome rule coverage.** If an edge rule forces ESLint later, swap cost is moderate. Accepted.
- **Node 20.10 floor.** Excludes older CI images. Accepted — greenfield project.
- **ESM-only.** CommonJS consumers cannot `require()` SpecForge programmatically. Accepted — this is a CLI, not a library.
- **`tsup` depends on esbuild.** Long-term outage risk low; fallback to `tsc` is ~1 day of work. Accepted.

## G. Success criteria

- `sdd/project.md` "Open decisions" reflects only items still open; confirmed items moved to a "Confirmed decisions" section linking this change.
- Next change (install the foundation) can start without re-litigating any item above.
- An agent reading `proposal.md` + `tasks.md` knows exactly what to install and wire up next.

## H. Notes

- This change adopts a **folder-per-change** layout (`sdd/changes/<id>/{proposal,tasks}.md`). The bootstrap convention documented a single-file-per-change format. The mismatch is acknowledged — aligning the convention docs is out of scope here and will be handled by a dedicated change against `sdd/changes/README.md` and `docs/workflows/start-plan.md`.
