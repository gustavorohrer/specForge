# Git conventions

## Branches

- `main` is always releasable.
- Feature work: `feat/<short-slug>`.
- Bug fixes: `fix/<short-slug>`.
- Docs-only: `docs/<short-slug>`.
- Chore / tooling: `chore/<short-slug>`.

## Commits

- One coherent change per commit.
- Subject: imperative mood, ≤ 72 characters (`add change template`, not `added change template`).
- Body (optional): explain the **why**, not the **what** — the diff already shows the *what*.
- When a commit corresponds to a change proposal, reference it:
  `Refs: sdd/changes/2026-04-22-cli-init-command.md`.

## Pull requests

- Title mirrors the main commit subject.
- Description links to the relevant change file in `sdd/changes/`.
- Keep PRs small. If a PR needs section headers to explain itself, split it.
- Merge strategy: squash-merge unless the branch's history is already clean and meaningful.
