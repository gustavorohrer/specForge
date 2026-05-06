# Workflow — write a spec

Use this when a change may add, remove, or change user-observable behavior. A spec in `sdd/specs/` must be ready before any `feature` change proposal is created.

## Purpose

Define user-observable behavior before planning or implementation. The spec is the source of truth for what the feature must do, independent of implementation choices.

## When to use

Use this workflow when any condition is true:

- A planned change adds, removes, or modifies CLI behavior (commands, flags, arguments, output, exit semantics).
- A planned change changes what SpecForge generates into target repositories.
- A planned change introduces new externally observable behavior.
- `docs/workflows/start-change.md` sends you here because no ready spec exists for a `feature` change.

## Inputs

Read before writing:

- `sdd/project.md` — project objective, scope, and design principles.
- `docs/conventions/spec-change-gating.md` — readiness gate and feature classification rules.
- `sdd/specs/` — existing specs; avoid duplication or conflict.

## Output

A ready spec at `sdd/specs/<topic>.md`.

---

## 1. Idea → spec creation

1. Identify the user-observable behavior to specify. If unsure what counts as user-observable, consult the feature classification criteria in `docs/conventions/spec-change-gating.md §2.1`.
2. Choose a stable topic name: kebab-case, short, behavior-focused (for example `cli-init`, `adapt-detection`).
3. Create `sdd/specs/<topic>.md` using the spec template in §2.
4. Fill in Purpose, Scope, and User-observable behavior first. Do not fill in Acceptance criteria until behavior is fully explicit.

## 2. How to write the spec

- Write from the user's perspective. Describe what the user does and what happens.
- Be explicit about inputs (commands, flags, files), outputs (stdout, files created), and side effects (artifacts mutated or created).
- Keep each behavior statement falsifiable: it must be verifiable by running the tool or inspecting output.
- Use MUST / MUST NOT for acceptance criteria. Avoid "should", "may", or aspirational phrasing in normative content.
- State what the spec does not cover in Non-goals.

### Spec template

```md
# Spec — <feature name>

## Purpose

State what behavior this spec defines and for whom.

## Scope

List in-scope behavior.

List explicit out-of-scope behavior.

## User-observable behavior

### Inputs

Describe user inputs: commands, args, flags, files, repository context, or other relevant context.

### Outputs

Describe user-visible outputs: stdout, stderr, files produced, or visible state changes.

### Side effects

Describe created, updated, or deleted artifacts and when they occur.

### Error modes

Describe expected failures and how they surface.

## Acceptance criteria

List independently testable statements using MUST / MUST NOT language.

Each criterion must be verifiable by observation or test.

## Non-goals

List behavior intentionally excluded by this spec.
```

## 3. Spec ready criteria

A spec is ready only when all conditions are true (binding definition in `docs/conventions/spec-change-gating.md §2.2`):

1. File exists at `sdd/specs/<topic>.md` with a stable topic name.
2. Scope is explicit: what is in scope and what is out of scope are both listed.
3. User-observable behavior is explicit: inputs, outputs, side effects, and error modes are all present.
4. Acceptance criteria are testable and verifiable; no aspirational wording.
5. No unresolved placeholders in normative content (`TODO`, `TBD`, `decide later`, `???`).

If any condition fails, the spec is not ready. Continue refining until all conditions pass.

## 4. Ambiguity detection rules

Stop and resolve explicitly when any of these occur:

- A behavior statement cannot be verified by running the tool or inspecting output.
- An input or output is described with vague scope ("some", "various", "appropriate").
- An acceptance criterion requires human judgment to evaluate.
- A scope boundary is missing (unclear whether a case is in or out of scope).
- Two acceptance criteria conflict.

Do not write around ambiguity by softening language. Resolve it explicitly or move the ambiguous case to Non-goals.

## 5. Integration with changes

Once the spec is ready:

1. Do not merge spec authoring with a feature change proposal in the same artifact. The spec lives in `sdd/specs/`; the proposal lives in `sdd/changes/`.
2. When creating the feature change proposal, reference the ready spec: `**Spec reference:** sdd/specs/<topic>.md`.
3. If the spec requires revision after a feature proposal is open, revise the spec first and confirm it is still ready before proceeding with planning.

## 6. Lifecycle and checkpoints

| Checkpoint | Check |
|---|---|
| Before opening a feature proposal | Spec exists and all readiness conditions in §3 pass |
| During planning (`start-plan.md`) | Linked spec is still ready and unchanged |
| During implementation | If behavior diverges from spec, stop and revise spec first |
| At closure | Spec reflects the behavior as implemented |

## 7. Failure modes and required actions

| Failure | Required action |
|---|---|
| Spec has unresolved `TODO`/`TBD` | Stop. Resolve or move to Non-goals. |
| Acceptance criterion is not verifiable | Stop. Rewrite as a falsifiable MUST/MUST NOT statement, or remove. |
| Scope boundary is missing | Stop. Explicitly list the ambiguous case as in-scope or out-of-scope. |
| Feature proposal opened without a ready spec | Stop. Pause the proposal. Create the spec first. |
| Implementation diverges from spec | Stop implementation. Revise spec. Confirm readiness before continuing. |

## 8. Minimal linkage rules

- The spec file must be self-contained. Do not split spec content across multiple files.
- A spec covers its topic only. It does not reference a specific change, PR, or implementation.
- A feature proposal references the spec by path: `sdd/specs/<topic>.md`.
- Do not embed a spec inside a proposal or tasks file. Keep them separate.

## 9. Amending a spec during execution

Use this when implementation reveals a divergence between the spec and reality, and the spec must be corrected.

**When amendment is required:**
- An acceptance criterion cannot be satisfied as written.
- A required behavior is not covered by the spec.
- A scope boundary is wrong and must be corrected.

Do not amend a spec to match a shortcut or workaround. Amend only when the spec itself is incorrect or incomplete.

**How to apply minimal changes:**
1. Identify the exact delta — the specific statement(s) that must change.
2. Apply the minimum change: correct the incorrect statement, add the missing case, or move the ambiguous case to Non-goals.
3. Do not rewrite surrounding content. Change only what is necessary.

**Re-validate readiness:**
After amending, re-run all 5 readiness conditions from `docs/conventions/spec-change-gating.md §2.2`. All conditions must pass before resuming execution. If any condition fails, the amendment is incomplete — fix it first.

**Record the amendment:**
Add a note in the change's `tasks.md` under the relevant task: "Spec amended: `sdd/specs/<topic>.md` — <one-line description of the delta>." Do not document the amendment inside the spec file itself.

Once re-validated, resume execution from the point where the mismatch was detected.

## Next

Once the spec is ready → `docs/workflows/start-change.md` (to open the feature change proposal).
