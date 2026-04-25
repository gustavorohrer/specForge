# Proposal — operationalize feature/spec gating

- **Change ID:** `2026-04-23-operationalize-feature-spec-gating`
- **Status:** Closed
- **Type:** `sdd-system` — workflow and convention refinement; no application code changes
- **Author:** Gustavo Rohrer
- **Date:** 2026-04-23

---

## 1. Problem statement

The SDD model is consistent but still leaves three operational ambiguities:

- It does not strictly define whether a feature spec must exist before opening a feature change proposal.
- It does not provide a strict, enforceable definition of what counts as a `feature` change versus adjacent types.
- It does not define when a spec is "ready" to be used as the source of truth for planning and execution.

These ambiguities create classification drift and proposal quality variance. The model needs strict gates so contributors make the same decision every time.

---

## 2. Objectives

1. Resolve spec creation timing with a single, binding rule.
2. Define `feature` changes with explicit inclusion and exclusion criteria.
3. Define spec readiness with objective checks.
4. Encode the rules in conventions and planning workflows, not only in narrative text.

---

## 3. Scope

### In scope

- Add one canonical convention file that captures:
  - final decisions,
  - operational definitions,
  - lifecycle and trigger rules,
  - impact notes.
- Update `docs/workflows/start-change.md` and `docs/workflows/start-plan.md` so the new rules are enforced at proposal/plan time.
- Update `sdd/specs/README.md` to align with the same gate.

### Out of scope

- Any change to application code (`src/`, `test/`, `dist/`).
- Any new CLI behavior, command, flag, or output.
- Any redesign of SDD structure beyond minimal wording and gate refinements.

---

## 4. Key decisions

1. **Spec-first rule (feature changes):** a ready spec must exist before creating a `feature` change proposal.
2. **Strict feature definition:** `feature` classification is based on user-observable behavior changes, with explicit inclusion/exclusion checks.
3. **Spec readiness gate:** a spec is usable for feature proposals only when all defined readiness conditions are met.

---

## 5. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Added process friction for first-time feature work | Keep the readiness checklist minimal and objective |
| Misclassification between `fix` and `feature` | Add hard inclusion/exclusion and mixed-case rule |
| Rule drift across files | Keep one canonical convention and make workflows link to it |

---

## 6. Success criteria

- A contributor can classify a change as `feature` or not without subjective interpretation.
- A contributor can determine spec readiness without ad-hoc judgment.
- Workflow docs block feature proposal/planning when no ready spec exists.
- The resulting model update is minimal and does not introduce new system layers.

---

## See also

- [`docs/conventions/spec-change-gating.md`](../../../docs/conventions/spec-change-gating.md)
- [`docs/workflows/start-change.md`](../../../docs/workflows/start-change.md)
- [`docs/workflows/start-plan.md`](../../../docs/workflows/start-plan.md)
- [`sdd/specs/README.md`](../../../sdd/specs/README.md)
