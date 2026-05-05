# Workflow — validate documentation

Run this checklist before closing a change.

## Change artifacts

- [ ] The change folder `sdd/changes/<change-id>/` has `proposal.md` and `tasks.md`.
- [ ] `tasks.md` status is `Complete` and all task items are `[x]`, or any open items are explicitly moved to a successor change.
- [ ] `proposal.md` status is `Closed`. It was not closed before `tasks.md` became `Complete`.

## Specs (feature changes only)

- [ ] A ready spec exists at `sdd/specs/<topic>.md` and is referenced in `proposal.md`.
- [ ] If the spec was amended during implementation, the amendment is consistent with what was built.

## Process docs (sdd-system changes)

- [ ] Affected workflows in `docs/workflows/` are updated or confirmed unchanged.
- [ ] Affected conventions in `docs/conventions/` are updated or confirmed unchanged.

## Project-wide

- [ ] `sdd/project.md` reflects current scope and confirmed decisions.
- [ ] `README.md` status section matches reality.
- [ ] No `DRAFT-` files remain in the change.
- [ ] No doc points to a file that no longer exists.

## Output

A clean diff where documentation and code describe the same system.

## Next

Open the PR. Link `sdd/changes/<change-id>/proposal.md` and `sdd/changes/<change-id>/tasks.md` in the description.
