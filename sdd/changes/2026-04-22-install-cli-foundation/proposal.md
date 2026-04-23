# Proposal — install the Node.js + TypeScript CLI foundation

- **Change ID:** `2026-04-22-install-cli-foundation`
- **Status:** Draft (not started)
- **Prerequisite:** [`sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`](../2026-04-22-define-node-typescript-cli-foundation/proposal.md)

## Problem

The previous change froze the technical foundation but did not install it. Nothing under `src/` or `test/` exists; no `package.json`, `tsconfig.json`, `biome.json`, `tsup.config.ts`, or `vitest.config.ts` has been created.

This change installs the foundation so the next change can implement the first CLI command.

## Scope

Exactly these artifacts, and no others:

1. `package.json` — per [§ package.json requirements](#packagejson-requirements).
2. `tsconfig.json`, `biome.json`, `tsup.config.ts`, `vitest.config.ts` — per [§ Configuration constraints](#configuration-constraints).
3. `src/cli.ts` — per [§ src/cli.ts requirements](#srcclits-requirements).
4. Directories per [§ Directory layout](#directory-layout).
5. `.gitignore` entries per [§ .gitignore requirements](#gitignore-requirements).

## Decision lock

This change **executes** the decisions from `2026-04-22-define-node-typescript-cli-foundation`. It does not re-open them.

- No alternative runtime, language, package manager, CLI framework, linter, test runner, or build tool is permitted.
- No reinterpretation of the canonical script names or entrypoint paths in [`docs/conventions/cli-entrypoint.md`](../../../docs/conventions/cli-entrypoint.md) is permitted.
- Any deviation — even one that appears to improve the outcome — requires a new SDD change against the originating proposal.

## Configuration constraints

All four config files (`tsconfig.json`, `biome.json`, `tsup.config.ts`, `vitest.config.ts`) must:

- Be **minimal** — include only what is necessary to satisfy the confirmed stack and the canonical scripts.
- Avoid **advanced or optional settings** (path aliases, project references, custom reporters, experimental flags).
- Avoid **environment-specific values** — no absolute paths, no user-specific paths, no machine-dependent branches.
- Exclude **experimental or edge features** of any tool.
- Be **easy to evolve** — structured so a future SDD change can add one key without rewriting the file.

Per-file direction (exact contents deferred to `tasks.md`):

- `tsconfig.json` — `strict: true`, `noUncheckedIndexedAccess: true`, ESM module resolution, `target` aligned with the Node 20.10 baseline. No path aliases, no `references`, no `composite`, no `incremental`.
- `biome.json` — Biome defaults; enable linting and formatting over `src/` and `test/` and nothing else.
- `tsup.config.ts` — single entry (`src/cli.ts`), ESM output, Node platform, shebang injection enabled, `clean: true`. No DTS, no multi-format output, no code splitting, no multiple entrypoints, no library mode, no external-package tricks.
- `vitest.config.ts` — defaults; include pattern `test/**/*.test.ts`. No coverage configuration, no setup files, no global mode.

## `package.json` requirements

Must contain **exactly** the following top-level keys (no more, no less):

1. `name` — `"specforge"`.
2. `version` — `"0.0.0"`.
3. `description` — the one-line description from `README.md`.
4. `type` — `"module"` (mandatory).
5. `bin` — `{ "specforge": "./dist/cli.js" }` (mandatory).
6. `scripts` — the seven canonical scripts defined in [`docs/conventions/cli-entrypoint.md`](../../../docs/conventions/cli-entrypoint.md), and **only** those seven.
7. `dependencies` — only `commander`.
8. `devDependencies` — only `@biomejs/biome`, `tsup`, `tsx`, `typescript`, `vitest`.

Must **not** contain:

- `engines` — the Node baseline is documented in `sdd/project.md`, not enforced via npm.
- `packageManager` — deferred; introduce in a dedicated change if pnpm pinning becomes necessary.
- Metadata fields `keywords`, `author`, `license`, `homepage`, `repository`, `bugs`, `contributors`, `funding` — introduced later by a release-strategy change.
- Optional tooling dependencies (e.g. `husky`, `lint-staged`, `@changesets/*`, `semantic-release`).
- Any script name not listed in `docs/conventions/cli-entrypoint.md`.
- Any dependency not listed above — transitive or otherwise.

## `src/cli.ts` requirements

Exactly one file. It must:

- Start with the `#!/usr/bin/env node` shebang line (source-level; `tsup` also injects at build time).
- Import `Command` from `commander`. Import nothing else.
- Instantiate a single `Command` configured with `name('specforge')`, the `description` from `package.json`, and a `version` literal matching `package.json`.
- Call `.parse(process.argv)` and return.
- Define **no** commands, subcommands, options, flags, or action handlers.
- Contain **no** business logic.
- Import **no** modules from `./commands/*`, `./lib/*`, or any path that does not yet exist.
- Perform **no** side effects beyond commander wiring and whatever commander does by default on `.parse()`.
- Be linear top-to-bottom — no classes, no factories, no wrapping functions, no dynamic imports.

Target length: under 20 source lines.

## Directory layout

Exactly these directories may be created. Any directory not listed is forbidden.

| Path | Purpose | Contents at end of change |
|---|---|---|
| `src/` | Source root. | `cli.ts` only. |
| `src/commands/` | Reserved for future command handlers. | `.gitkeep` only. |
| `src/lib/` | Reserved for future pure logic. | `.gitkeep` only. |
| `test/` | Reserved for future Vitest specs. | `.gitkeep` only. |

Rules:

- `dist/` is **not** created by this change — it is emitted by `tsup` at build time and ignored via `.gitignore`.
- `.gitkeep` is the only file allowed in an otherwise empty directory.
- No nested folders beyond those listed.
- No `index.ts`, `mod.ts`, barrel files, type-only re-exports, or placeholder modules.
- No speculative subdirectories (`utils/`, `types/`, `helpers/`, `internal/`, etc.).

## `.gitignore` requirements

Append these entries **idempotently** (skip any line already present; do not reorder or remove existing entries):

```
node_modules/
dist/
.env*
*.log
.DS_Store
coverage/
```

Add **nothing else**.

## Execution constraints

- Do not add any dependency beyond those in [§ package.json requirements](#packagejson-requirements).
- Do not refactor, rename, or reformat any file outside this change.
- Do not introduce abstractions, factories, wrappers, or helper layers.
- Do not create additional configuration files, dotfiles, or modules beyond those enumerated here.
- Do not modify documentation outside this change — including `AGENTS.md`, `CLAUDE.md`, `README.md`, `sdd/project.md`, `docs/**`, and sibling change folders.
- `pnpm install` must be executed **exactly once**, and only after `package.json` has been written and validated against [§ package.json requirements](#packagejson-requirements).
- Do not re-run `pnpm install` to "refresh" the lockfile, add missing deps, or recover from install errors — if validation fails, fix `package.json` and start over from a clean tree.
- `pnpm-lock.yaml`, if generated by the install step, must be committed verbatim — never hand-edited.

## Out of scope

- Any CLI command implementation (`init`, `adapt`, …).
- Any adapter, template, or generator.
- Repository analysis logic.
- CI workflows.
- Release / publishing automation.
- Coverage thresholds and coverage config beyond Vitest defaults.
- Pinning the pnpm version via `packageManager`.

_No `tasks.md` yet. Tasks are drafted when this proposal is approved, per [`docs/workflows/start-plan.md`](../../../docs/workflows/start-plan.md)._
