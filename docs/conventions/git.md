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
  - `Refs: sdd/changes/<change-id>/proposal.md`
  - `Refs: sdd/changes/<change-id>/tasks.md`

## Pull requests

- Title mirrors the main commit subject.
- Description links to the relevant change artifacts in `sdd/changes/<change-id>/`.
- Keep PRs small. If a PR needs section headers to explain itself, split it.
- Merge strategy: squash-merge unless the branch's history is already clean and meaningful.
