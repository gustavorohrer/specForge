# Convention — tooling and foundation changes

Canonical requirements for any change classified as **tooling/foundation**.

A tooling/foundation change installs, upgrades, or reconfigures dev tools, build tools, runtimes, or a package manager. All items in this file are mandatory. A proposal that omits any item must be sent back to the proposal stage.

## Versioning

- All package versions must be **pinned exactly** (e.g. `"14.0.3"` — not `"^14"`, not `"latest"`, not `"*"`).
- Each pinned version must be justified in the proposal: name the version and state why it was chosen (e.g. "latest stable as of YYYY-MM-DD", "last version before breaking API change").
- The full set of pinned versions must be verified for known cross-package incompatibilities before the proposal is approved.

## Compatibility assumptions

The proposal must include an explicit `## Compatibility assumptions` section declaring:

- The minimum runtime version required and why.
- Known constraints between tools at the pinned versions (e.g. "`@types/node` 20.x required for TypeScript 5.5 to resolve `node:` imports correctly").
- Any known API changes or deprecations in the pinned versions that affect this change.
- What was verified against changelogs or release notes.

If an assumption cannot be verified before approval, list it as a **risk** in the proposal.

## Cross-cutting concern ownership

Any artifact or behavior that more than one tool or file could produce must have a **single declared owner**:

- Name the owner explicitly in the proposal (e.g. "`tsup.config.ts` owns the shebang — `src/cli.ts` must not contain one").
- All tasks referencing that artifact defer to the declared owner.
- If ownership is ambiguous at planning time, resolve it in the proposal before approving tasks.

## Validation probes

Any task that depends on a tooling assumption not yet empirically verified must begin with a **validation probe**: a minimal, isolated check that confirms the assumption before the task's main body executes.

Examples:
- Before configuring `biome.json`, run `biome --version` and confirm the expected version is installed.
- Before writing TypeScript config, verify `tsc --version` matches the pinned version.
- Before injecting a shebang via `tsup`, build a trivial entrypoint and confirm the output contains the shebang.

If a probe fails, execution must stop. The task is not retried — the spec is revised first.

## Proposal completeness

A `tooling/foundation` proposal must explicitly include:

- **Exact artifacts** — every file to create or modify, enumerated with no ambiguity.
- **Decision lock** — a statement that this change executes (not re-opens) prior decisions.
- **Configuration constraints** — per-file rules when config files are created (minimal settings, no environment-specific values, no experimental flags).
- **Execution constraints** — explicit prohibitions on side work, extra dependencies, refactors, or abstractions not in scope.
- **Explicit out-of-scope items** — including deferred decisions a reader might otherwise assume are in scope.
- **Explicit prohibitions for the agent** — "do not" bullets covering the most likely wrong turns.

A proposal missing any of these items must be sent back to draft.

## See also

- [`docs/workflows/start-plan.md`](../workflows/start-plan.md) — where classification and this checklist are enforced during planning
- [`docs/workflows/implement-task.md`](../workflows/implement-task.md) — where probe-first validation is required during execution
- [`docs/conventions/documentation.md`](documentation.md) — spec-reality mismatch rule
