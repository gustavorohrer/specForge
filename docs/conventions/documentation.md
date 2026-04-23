# Documentation conventions

## Where things live

| Content | Location |
|---|---|
| Project context and principles | `sdd/project.md` |
| Formal specifications | `sdd/specs/` |
| Change proposals and plans | `sdd/changes/` |
| Stable rules (conventions) | `docs/conventions/` |
| Step-by-step workflows | `docs/workflows/` |
| Feature documentation | `docs/features/<feature-name>/` |
| Operating contract for contributors | `AGENTS.md` |
| Project overview | `README.md` |

## Writing rules

- Each doc answers **one** question. If it answers three, split it.
- Prefer lists and tables to prose when the content is structural.
- Examples beat abstract description — use them.
- Do not duplicate content; link instead.
- Update docs in the **same change** that changes behavior. Stale docs are bugs.
- Cross-link related docs at the bottom under a `## See also` section when helpful.

## Documentation sync

A change that affects any of the following must update the corresponding source-of-truth doc in the **same change**:

- Behavior or user-facing output.
- Project structure (directories, entrypoints, layout).
- Workflows (`docs/workflows/`).
- Operating contracts (`AGENTS.md`, `CLAUDE.md`).
- Confirmed decisions in `sdd/project.md`.
- Conventions in `docs/conventions/`.

Stale docs are bugs.

## Spec-reality mismatch

If execution reveals a mismatch between what the spec prescribes and how a tool actually behaves, treat it as a **source-of-truth issue**, not an implementation bug.

- Stop execution.
- Do not adapt around the mismatch at the implementation layer.
- Revise the spec first, get it approved, then resume.

This prevents silent divergence between the spec and reality, and prevents agents from accumulating undocumented workarounds.

## Meta

- A doc should not explain the tool used to produce it (no "generated with X" banners).
- Do not add emojis unless the surrounding style already uses them.
