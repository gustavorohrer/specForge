# Workflow — start a change

Use this when proposing **any** meaningful modification to the project: feature, refactor, new convention, tooling, infra, etc.

## Steps

1. **Classify the change type first.**
   - Allowed types: `feature`, `tooling/foundation`, `sdd-system`, `fix`.
   - If the type is `feature`, a ready spec must already exist in `sdd/specs/`.
   - If no ready spec exists, stop. Create or finish the spec first.
   - Readiness is defined in `docs/conventions/spec-change-gating.md`.

2. **Create the change file.**
   - Path: `sdd/changes/YYYY-MM-DD-<slug>.md`.
   - Use a descriptive slug (`cli-init-command`, `adopt-commander`, `adapt-detection-heuristics`).

3. **Fill in the proposal.** Required sections:
   - **Context** — what problem or opportunity triggered this.
   - **Proposal** — what you want to change, at a high level.
   - **Scope** — what's included, what's explicitly excluded.
   - **Risks / unknowns** — what could go wrong or what is uncertain.
   - **Success criteria** — how we will know the change did its job.
   - **Type** — one of the four allowed types.
   - **Spec reference (feature only)** — exact `sdd/specs/<topic>.md` path.

4. **Stop at the proposal level.**
   - Do not plan or implement yet.
   - Request review (human or agent) before proceeding.

## Output

A single Markdown file under `sdd/changes/` ready for review.

## Next

Once approved → `docs/workflows/start-plan.md`.
