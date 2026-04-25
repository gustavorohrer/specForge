# Workflow — validate documentation

Run this checklist before opening a pull request.

## Checklist

- [ ] `sdd/project.md` reflects current scope and status.
- [ ] The change folder in `sdd/changes/<change-id>/` has required artifacts (`proposal.md`, `tasks.md`).
- [ ] `tasks.md` is `Complete`, and all task items are checked off (`[x]`) unless explicitly moved to a successor change.
- [ ] `proposal.md` is `Closed`, and it was not closed before `tasks.md` became `Complete`.
- [ ] Any new or modified behavior is reflected under `docs/features/`.
- [ ] `docs/conventions/` is still accurate. Update or confirm no changes needed.
- [ ] `docs/workflows/` is still accurate. Update or confirm no changes needed.
- [ ] `README.md` status section matches reality.
- [ ] No `DRAFT-` files remain in the change.
- [ ] No doc points to a file that no longer exists.

## Output

A clean diff where documentation and code describe the same system.

## Next

Open the PR. Link `sdd/changes/<change-id>/proposal.md` and `sdd/changes/<change-id>/tasks.md` in the description.
