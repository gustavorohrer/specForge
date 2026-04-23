# Workflow — validate documentation

Run this checklist before opening a pull request.

## Checklist

- [ ] `sdd/project.md` reflects current scope and status.
- [ ] The change file in `sdd/changes/` has its plan, and all tasks are checked off.
- [ ] Any new or modified behavior is reflected under `docs/features/`.
- [ ] `docs/conventions/` is still accurate. Update or confirm no changes needed.
- [ ] `docs/workflows/` is still accurate. Update or confirm no changes needed.
- [ ] `README.md` status section matches reality.
- [ ] No `DRAFT-` files remain in the change.
- [ ] No doc points to a file that no longer exists.

## Output

A clean diff where documentation and code describe the same system.

## Next

Open the PR. Link the change file in the description.
