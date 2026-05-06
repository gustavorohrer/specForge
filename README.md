# SpecForge

SpecForge is a CLI-first tool that bootstraps and adapts software projects for **Spec-Driven Development (SDD)**, enabling efficient AI-assisted development with minimal setup.

## Status

Early development. The CLI is **not yet implemented**. The repository is currently bootstrapped so SpecForge itself can be built using SDD.

## Goals

- **Bootstrap** greenfield projects with an SDD-ready structure.
- **Adapt** existing repositories to SDD, non-destructively.
- **Stay agent-agnostic**: the generated structure works with any capable coding agent.

## Implementation stack

- Node.js + TypeScript
- pnpm

## Working in this repository

This repo is developed using SDD. Before making any change:

1. Read [`AGENTS.md`](./AGENTS.md) — the operating contract.
2. Read [`sdd/project.md`](./sdd/project.md) — project context and principles.
3. Check [`sdd/changes/`](./sdd/changes/) for active proposals.
4. Follow a workflow from [`docs/workflows/`](./docs/workflows/).

## Layout

```
AGENTS.md              # operating contract for all contributors
CLAUDE.md              # Claude-specific pointer to AGENTS.md
sdd/
  project.md           # project objective, scope, principles, status
  specs/               # formal specifications
  changes/             # change proposals and plans
docs/
  conventions/         # stable rules (base, git, documentation)
  workflows/           # how-to guides for SDD activities
  features/
    _template/         # template for documenting a feature
```

## License

TBD.
