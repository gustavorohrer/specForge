# Workflow — start a change

Use this when proposing **any** meaningful modification to the project: feature, refactor, new convention, tooling, infra, etc.

## Steps

1. **Classify the change type first.**
   - Allowed types: `feature`, `tooling/foundation`, `sdd-system`, `fix`.
   - If the type is `feature`, a ready spec must already exist in `sdd/specs/`.
   - If no ready spec exists, stop. Create or finish the spec first by following `docs/workflows/write-spec.md`.
   - Readiness is defined in `docs/conventions/spec-change-gating.md`.

2. **Create the change folder.**
   - Path: `sdd/changes/<change-id>/`.
   - `<change-id>` must be kebab-case; date prefix is optional.
   - Artifact and status rules are defined in `docs/conventions/change-artifacts.md`.
   - Examples:
     - `sdd/changes/standardize-change-artifacts-and-status/`
     - `sdd/changes/2026-04-25-standardize-change-artifacts-and-status/`

3. **Create and fill `proposal.md`.** Required sections:
   - **Problem statement** — what problem or opportunity triggered this.
   - **Objectives** — what this change intends to achieve.
   - **Scope** — what's included, what's explicitly excluded.
   - **Risks / unknowns** — what could go wrong or what is uncertain.
   - **Success criteria** — how we will know the change did its job.
   - **Type** — one of the four allowed types.
   - **Status** — set to `Draft`.
   - **Spec reference (feature only)** — exact `sdd/specs/<topic>.md` path.

4. **Stop at the proposal level.**
   - Do not create task execution details yet.
   - Do not implement yet.
   - Confirm the proposal is approved before proceeding to planning.

## Approval

A proposal is approved when the author has confirmed:

- All required sections are present and non-contradictory.
- Scope has explicit in-scope and out-of-scope statements.
- Success criteria are verifiable.
- For `feature` changes: a ready spec is linked at `sdd/specs/<topic>.md`.
- For `tooling/foundation` changes: all items in `docs/conventions/tooling-changes.md` are satisfied.

**Solo or agent development:** Self-review constitutes approval. No external approver is required.

Record approval by setting `proposal.md` status to `In Progress` when creating `tasks.md`. A proposal that remains at `Draft` is not approved.

If any required section is missing or contradictory, the proposal stays `Draft`. Do not proceed to planning.

## Output

A change folder containing `proposal.md` ready for planning.

## Next

Once approved → `docs/workflows/start-plan.md`.
