# Workflow — start a change

Use this when proposing **any** meaningful modification to the project: feature, refactor, new convention, tooling, infra, etc.

## Steps

1. **Create the change file.**
   - Path: `sdd/changes/YYYY-MM-DD-<slug>.md`.
   - Use a descriptive slug (`cli-init-command`, `adopt-commander`, `adapt-detection-heuristics`).

2. **Fill in the proposal.** Required sections:
   - **Context** — what problem or opportunity triggered this.
   - **Proposal** — what you want to change, at a high level.
   - **Scope** — what's included, what's explicitly excluded.
   - **Risks / unknowns** — what could go wrong or what is uncertain.
   - **Success criteria** — how we will know the change did its job.

3. **Stop at the proposal level.**
   - Do not plan or implement yet.
   - Request review (human or agent) before proceeding.

## Output

A single Markdown file under `sdd/changes/` ready for review.

## Next

Once approved → `docs/workflows/start-plan.md`.
