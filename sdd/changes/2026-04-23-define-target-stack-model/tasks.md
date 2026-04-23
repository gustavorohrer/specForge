# Tasks — define target stack model

**Change:** `2026-04-23-define-target-stack-model`
**Status:** Complete

---

**T1** Verify proposal internal consistency — read `proposal.md` end-to-end and confirm: all section cross-references are accurate, the binding rule in §4 is unambiguous, no Node.js or TypeScript assumption appears in the model itself (only in examples), all named stack IDs are consistent across §3, §5, §6, and §7, and non-goals are explicit enough to prevent scope creep during implementation.

**T2** Create `docs/conventions/target-stack.md` — the binding rule and vocabulary from proposal §3 and §4 must live in `docs/conventions/` to be discoverable by agents implementing future commands. The file must define: the two-concept distinction (implementation stack vs target stack), the binding rule verbatim, the named stack ID table, the preset model summary (what a preset declares, the conceptual directory layout), and the sentinel-file detection table. Cross-link back to the proposal for the full specification.

**T3** Update `sdd/project.md` — add this change to the "Confirmed decisions" section, noting that the target stack model and the stack identification strategy are now defined. Annotate the "Strategy for detecting existing project type during `adapt`" open decision to indicate it is now partially specified by this change (§5.2 of proposal), with a link, while leaving it open pending implementation.

**T4** Update `docs/conventions/base.md` — add a reference line under the existing `## Tooling` section pointing to `docs/conventions/target-stack.md`, consistent with how `cli-entrypoint.md` is surfaced there.

**T5** Update `docs/workflows/start-plan.md` — add a check under the `feature` classification: any change that generates output into user projects (templates, scaffolded files, conventions) must declare which target stack(s) it affects and must be consistent with `docs/conventions/target-stack.md`. This ensures the binding rule is surfaced at planning time, not discovered mid-implementation.

**T6** Validate cross-links — confirm all links in the new `docs/conventions/target-stack.md` resolve (to the proposal, to `sdd/project.md`); confirm the reference added to `base.md` resolves; confirm the reference added to `start-plan.md` resolves; confirm the "See also" links in `proposal.md` resolve.

**T7** Validate no application code was modified — confirm the following files are untouched and match the repository state before this change began: `src/`, `test/`, `dist/`, `package.json`, `tsconfig.json`, `biome.json`, `vitest.config.ts`, `tsup.config.ts`, `pnpm-lock.yaml`.

**T8** Mark change closed — update `proposal.md` status from `Draft (proposed)` to `Closed` and update this file's status from `Open` to `Complete`.
