# Tasks — define Node.js + TypeScript CLI foundation

- **Change ID:** `2026-04-22-define-node-typescript-cli-foundation`
- **Status:** `Complete`
- **Companion doc:** [`./proposal.md`](./proposal.md)

Each task is atomic, ordered, and verifiable. **No task installs dependencies, creates config files, or writes source code.** This change ends with the project fully *described*; the next change will *install* the foundation.

---

## T1 — Freeze decisions in `sdd/project.md`

**Goal:** Reflect the choices from `proposal.md` §E into `sdd/project.md`.

**Scope:** Edits to `sdd/project.md` only.

**Steps:**
1. Add a new `## Confirmed decisions` section above `## Open decisions`.
2. List each confirmed item with a one-line rationale and a link to `sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`:
   - Runtime: Node.js 20.10+
   - Language: TypeScript 5.5+ strict ESM
   - Package manager: pnpm
   - CLI framework: commander
   - Linter/formatter: Biome
   - Test runner: Vitest
   - Build: tsup
   - Minimum Node version: 20.10
3. Remove the matching items from `## Open decisions` (CLI framework, minimum Node version, test framework, template strategy stays open).
4. Leave still-open items intact: versioning/release strategy, distribution channels, config format, `init` wizard vs non-interactive, `adapt` detection strategy, template strategy, coverage thresholds.

**Verification:** `sdd/project.md` has both sections; confirmed items no longer appear in "Open decisions"; all references resolve.

---

## T2 — Document the folder structure as a feature

**Goal:** Produce `docs/features/cli-foundation/feature.md` from `docs/features/_template/feature.md`.

**Scope:** One new file; no other edits.

**Steps:**
1. Copy `docs/features/_template/feature.md` to `docs/features/cli-foundation/feature.md`.
2. Fill in:
   - **Summary:** one paragraph describing the CLI foundation as a feature of the repository.
   - **Motivation:** link to `sdd/changes/2026-04-22-define-node-typescript-cli-foundation/proposal.md`.
   - **User-facing behavior:** list what running `specforge` *will* look like at a high level (no command semantics — just "shebang-launched Node CLI bundled from `dist/cli.js`").
   - **Non-goals:** copy from proposal §D.
   - **Status:** mark `Designed` only.
3. Add a `## Layout` section embedding the tree and the "Rules" bullet list from proposal §C.8 verbatim.

**Verification:** File renders; all links resolve; status reflects current reality (designed, not implemented).

---

## T3 — Document the CLI entrypoint convention

**Goal:** Add `docs/conventions/cli-entrypoint.md` capturing proposal §C.9.

**Scope:** One new file; no other edits.

**Content:**
- Binary name and source/built entrypoint paths.
- What `src/cli.ts` **may** contain (arg parsing, command dispatch, exit-code mapping) and **may not** contain (business logic, filesystem operations, network calls).
- The canonical script names table: `dev`, `build`, `test`, `test:watch`, `lint`, `format`, `typecheck` — each with its deferred implementation command.
- A single-sentence "Script names are reserved" rule: contributors must not invent new script names without a change proposal.

**Verification:** File exists; referenced from `docs/features/cli-foundation/feature.md` under "See also".

---

## T4 — Document the scripts strategy explicitly (no implementation)

**Goal:** Ensure the canonical script list is a contract, not a suggestion, by cross-referencing it from `docs/conventions/base.md`.

**Scope:** Additive edit to `docs/conventions/base.md` — one bullet pointing to `docs/conventions/cli-entrypoint.md` under a new "Tooling" sub-section.

**Verification:** `docs/conventions/base.md` has a "Tooling" section with a single cross-link. No script is created, no `package.json` touched.

---

## T5 — Prepare the follow-up change stub

**Goal:** Claim the next step so no agent re-proposes the same work.

**Scope:** Create `sdd/changes/<next-date>-install-cli-foundation/proposal.md` as a **stub only**:
- Title: `Install Node.js + TypeScript CLI foundation`.
- Status: `Draft (not started)`.
- Sections: `Problem`, `Scope`, `Prerequisites` (linking this change), `Out of scope`. No decisions. No tasks file yet.

**Constraint:** Do not fill `Decisions` or create `tasks.md` — that is the next change's own planning step.

**Verification:** Folder exists at `sdd/changes/<YYYY-MM-DD>-install-cli-foundation/` (date filled in when the stub is written); file contains only the four listed sections; explicit "Prerequisite: `2026-04-22-define-node-typescript-cli-foundation`" line is present.

---

## Definition of done

- [x] T1 — `sdd/project.md` updated with confirmed decisions.
- [x] T2 — `docs/features/cli-foundation/feature.md` created. (subsequently removed by `stabilize-sdd-base-workflow`)
- [x] T3 — `docs/conventions/cli-entrypoint.md` created.
- [x] T4 — `docs/conventions/base.md` cross-links to T3.
- [x] T5 — follow-up change stub claimed.
- [x] `docs/workflows/validate-docs.md` checklist passes.
- [x] No `.ts`, `package.json`, `tsconfig.json`, `biome.json`, `tsup.config.ts`, `vitest.config.ts`, or `node_modules/` exists in the working tree.

---

## Out of scope (reaffirmed)

- Creating `package.json`, `tsconfig.json`, `biome.json`, `tsup.config.ts`, `vitest.config.ts`, or any lockfile.
- Installing any dependency.
- Writing any `.ts` file under `src/` or `test/`.
- Implementing any CLI command or command stub.
- Updating `sdd/changes/README.md` or `docs/workflows/start-plan.md` to match the folder-per-change layout adopted here — tracked separately (see proposal §H).
