# SpecForge — Project Context

## Objective

Build a CLI-first tool that prepares software projects — both greenfield and existing — for **Spec-Driven Development (SDD)**, so AI agents and humans can collaborate effectively on implementation with minimal ceremony.

## Current scope

- Repository bootstrap for SDD (greenfield projects).
- Repository adaptation for SDD (existing codebases), non-destructively.
- Tool-agnostic output: the generated SDD structure is not tied to any one AI agent.

## Explicit exclusions (for now)

- No product UI.
- No hosted service or backend.
- No integrations with specific issue trackers.
- No opinionated templates beyond the minimum required to enable SDD.
- No IDE-specific setup.
- No plugin / extension system.

## Design principles

1. **CLI-first.** The tool is used from a terminal. No GUI, no web shell.
2. **Markdown is the source of truth.** Specs, change proposals, plans, and conventions live in versioned Markdown.
3. **Agent-agnostic.** Output works with any capable coding agent, even though Claude Code is currently primary.
4. **Minimal surface area.** Small CLI, small generated footprint, easy to audit.
5. **Non-destructive.** Adapting an existing repository must never clobber prior work.
6. **Composable over configurable.** Prefer small commands over one large configurable monolith.
7. **Convention-driven.** Sensible defaults over mandatory configuration.

## Current status

- Repository is bootstrapped for SDD.
- No CLI implementation yet.
- Target stack selected: Node.js + TypeScript with pnpm.
- Primary agent in use: Claude Code.

## Confirmed decisions

Resolved by [`sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`](./changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md):

- **Runtime:** Node.js 20.10+ — current LTS, stable ESM, native `fetch`.
- **Language:** TypeScript 5.5+, `strict: true`, ESM only.
- **Package manager:** pnpm — deterministic installs, strict resolution, workspace-ready.
- **CLI framework:** `commander` — ubiquity, polished help output, strong agent training base.
- **Linter / formatter:** Biome — single tool, single config, fast.
- **Test runner:** Vitest — native ESM/TS, Jest-compatible API, first-class mocking.
- **Build:** `tsup` — fast esbuild bundle with shebang injection for the CLI entrypoint.

These are locked until explicitly modified by a new SDD change.

## Open decisions

The following are intentionally unresolved and should be decided through change proposals:

- Template strategy (static copy vs. programmatic generation).
- Versioning and release strategy (SemVer + changesets? release-please? manual?).
- Distribution channels (npm only, or also Homebrew / standalone binary?).
- Configuration format for SpecForge itself (TOML / YAML / JSON / JS).
- Whether `init` ships as a wizard, a non-interactive command, or both.
- Strategy for detecting existing project type during `adapt` (heuristics vs. explicit flags).
- Coverage thresholds for tests.
