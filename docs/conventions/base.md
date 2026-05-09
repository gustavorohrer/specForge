# Base conventions

Stable, low-level rules that apply everywhere in the repo.

- **Language:** English, for all documentation and identifiers.
- **Tone in docs:** direct, minimal, opinionated. No filler.
- **File naming:** kebab-case for docs and folders (`start-change.md`, not `Start_Change.md`).
- **Headings:** exactly one top-level `#` per Markdown file — the title.
- **Paths in docs** are repo-relative starting at the project root: `sdd/project.md`.
- **Dates:** ISO 8601 (`YYYY-MM-DD`).
- **Drafts:** prefix the filename with `DRAFT-` while in progress; remove the prefix when ready.
- **Do not commit:** half-implementations, commented-out code, speculative abstractions, or dead scaffolding "for later".
- **One idea per paragraph.** Use lists and tables when content is structural.

## Tooling

- CLI entrypoint and canonical script names are defined in [`docs/conventions/cli-entrypoint.md`](./cli-entrypoint.md). Do not introduce new scripts without a change proposal.
- Target stack conventions (named stack IDs, the binding rule separating implementation from target stack, and the preset model) are defined in [`docs/conventions/target-stack.md`](./target-stack.md).
- Change artifact structure and status semantics are defined in [`docs/conventions/change-artifacts.md`](./change-artifacts.md).

## Engineering conventions (implementation code)

The following convention documents apply to all implementation work. Read the ones relevant to your task before writing code.

- [`docs/conventions/architecture.md`](./architecture.md) — three-layer model (`cli.ts` / `commands/` / `lib/`), dependency injection, no global state
- [`docs/conventions/typescript.md`](./typescript.md) — TypeScript coding rules beyond `tsconfig.json`
- [`docs/conventions/errors.md`](./errors.md) — error categories, exit codes, stdout/stderr rules
- [`docs/conventions/filesystem-safety.md`](./filesystem-safety.md) — write safety rules for commands that generate files
- [`docs/conventions/testing.md`](./testing.md) — test structure, patterns, and coverage requirements
- [`docs/conventions/quality-gates.md`](./quality-gates.md) — minimum automated checks before marking a task complete
