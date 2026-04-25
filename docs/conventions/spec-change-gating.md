# Convention — spec/change gating for features

This convention applies to **SpecForge's own SDD process**.

## 1. Final decisions (binding)

### 1.1 Spec creation timing

Decision: For any `feature` change, a spec **must already exist and be ready before** the feature change proposal is created.

Rationale: The proposal/planning phases execute an already-defined "what". Allowing spec authoring inside the same feature change reintroduces circular scope and weakens review gates.

### 1.2 Feature classification

Decision: `feature` is a strict behavior-based classification (see §2.1). Classification is not optional and must be decided before proposal authoring.

### 1.3 Spec readiness gate

Decision: Only specs that satisfy all readiness conditions in §2.2 are valid inputs for `feature` proposals.

## 2. Updated definitions

### 2.1 `feature` change (strict operational definition)

A change is `feature` if **any** included condition is true.

Included (any one is sufficient):

- Adds, removes, or changes any user-facing CLI behavior (commands, subcommands, flags, arguments, defaults, help text, exit semantics).
- Adds, removes, or changes files/content SpecForge generates into target repositories.
- Adds, removes, or changes user-observable side effects when running SpecForge (what is created/updated/deleted, and when).
- Introduces new externally observable behavior not currently specified.

Excluded (all excluded cases are **not** `feature`):

- `tooling/foundation`: dependency/runtime/build/linter/test/tooling installation, upgrade, or reconfiguration only.
- `sdd-system`: changes to workflows, conventions, templates for process governance only.
- `fix`: restores behavior already defined by an existing approved spec or convention, without expanding behavior.
- Trivial edits: typo/comment/format-only changes with no behavior effect.

Mixed-case rule:

- If a change both fixes a defect and introduces behavior beyond the existing spec, classify it as `feature`.

### 2.2 Spec readiness (strict operational definition)

A spec is **ready** only if all conditions below are true:

1. File exists at `sdd/specs/<topic>.md` with stable topic naming.
2. Scope is explicit: what is in scope and what is out of scope.
3. User-observable behavior is explicit: inputs, outputs, side effects, and error modes.
4. Acceptance statements are testable/verifiable (no aspirational wording only).
5. No unresolved placeholders in normative content (`TODO`, `TBD`, `decide later`, `???`).

If any condition fails, the spec is not ready.

## 3. Updated lifecycle

1. Draft or amend spec in `sdd/specs/` until it is ready per §2.2.
2. Open `feature` change proposal in `sdd/changes/<change-id>/proposal.md` and reference the ready spec path.
3. Approve proposal, then create `sdd/changes/<change-id>/tasks.md`.
4. Implement tasks.
5. If execution reveals a mismatch between implementation reality and spec, stop and revise the spec first (per `docs/conventions/documentation.md`).

Trigger rules:

- `start-change`: if classification is `feature` and no ready spec exists, stop. Create/finish the spec first.
- `start-plan`: a `feature` proposal without a linked ready spec is invalid and must return to proposal stage.

## 4. Impact on current model

- Feature work gains a hard spec-first gate; proposal quality becomes consistent and reviewable.
- Change classification becomes deterministic across `feature`, `fix`, `tooling/foundation`, and `sdd-system`.
- No new system layers were introduced; existing lifecycle remains proposal → plan → task execution, now with explicit preconditions.

## See also

- [`docs/workflows/start-change.md`](../workflows/start-change.md)
- [`docs/workflows/start-plan.md`](../workflows/start-plan.md)
- [`docs/conventions/change-artifacts.md`](./change-artifacts.md)
- [`docs/conventions/documentation.md`](./documentation.md)
- [`sdd/specs/README.md`](../../sdd/specs/README.md)
