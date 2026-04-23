# Tasks — install CLI foundation

**Change:** `2026-04-22-install-cli-foundation`
**Status:** Not started

---

## Phase 1 — Prepare project structure

**T1.1** Confirm the working directory is the repository root by verifying `AGENTS.md` is present.
→ **STOP** if `AGENTS.md` is not found.

**T1.2** Check whether any of `src/`, `src/commands/`, `src/lib/`, or `test/` already exist.
→ If any exist, inspect their contents before proceeding. Do not overwrite without understanding what is there.

**T1.3** Create directory `src/`.

**T1.4** Validate that `src/` exists.
→ **STOP** if absent.

**T1.5** Create directory `src/commands/`.

**T1.6** Create file `src/commands/.gitkeep` with empty content.

**T1.7** Validate that `src/commands/` contains exactly one file named `.gitkeep` and nothing else.
→ **STOP** if any other file is present.

**T1.8** Create directory `src/lib/`.

**T1.9** Create file `src/lib/.gitkeep` with empty content.

**T1.10** Validate that `src/lib/` contains exactly one file named `.gitkeep` and nothing else.
→ **STOP** if any other file is present.

**T1.11** Create directory `test/`.

**T1.12** Create file `test/.gitkeep` with empty content.

**T1.13** Validate that `test/` contains exactly one file named `.gitkeep` and nothing else.
→ **STOP** if any other file is present.

**T1.14** Validate that no directory other than `src/`, `src/commands/`, `src/lib/`, and `test/` was created in this phase.
→ **STOP** if any unexpected directory exists.

---

## Phase 2 — Create package.json

**T2.1** Read `README.md`. Extract the one-line description: the sentence beginning with "SpecForge is" from the first paragraph, with no markdown formatting.

The value to use is:
```
SpecForge is a CLI-first tool that bootstraps and adapts software projects for Spec-Driven Development (SDD), enabling efficient AI-assisted development with minimal setup.
```

**T2.2** Write `package.json` at the repository root with exactly this content:

```json
{
  "name": "specforge",
  "version": "0.0.0",
  "description": "SpecForge is a CLI-first tool that bootstraps and adapts software projects for Spec-Driven Development (SDD), enabling efficient AI-assisted development with minimal setup.",
  "type": "module",
  "bin": {
    "specforge": "./dist/cli.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "biome check .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "commander": "latest"
  },
  "devDependencies": {
    "@biomejs/biome": "latest",
    "tsup": "latest",
    "tsx": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

**T2.3** Validate that `package.json` has exactly 8 top-level keys: `name`, `version`, `description`, `type`, `bin`, `scripts`, `dependencies`, `devDependencies`.
→ **STOP** if any key is missing or any additional key is present.

**T2.4** Validate that `name` is exactly `"specforge"`.
→ **STOP** if not.

**T2.5** Validate that `version` is exactly `"0.0.0"`.
→ **STOP** if not.

**T2.6** Validate that `type` is exactly `"module"`.
→ **STOP** if not.

**T2.7** Validate that `bin` has exactly one entry: key `"specforge"`, value `"./dist/cli.js"`.
→ **STOP** if the entry is missing, renamed, or has a different value.

**T2.8** Validate that `scripts` has exactly 7 keys with exactly these values:

| Key | Value |
|---|---|
| `dev` | `tsx src/cli.ts` |
| `build` | `tsup` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |
| `lint` | `biome check .` |
| `format` | `biome format --write .` |
| `typecheck` | `tsc --noEmit` |

→ **STOP** if any script is missing, renamed, has extra scripts, or has a different command string.

**T2.9** Validate that `dependencies` has exactly one key: `"commander"`.
→ **STOP** if any other key is present or if `"commander"` is absent.

**T2.10** Validate that `devDependencies` has exactly 5 keys: `"@biomejs/biome"`, `"tsup"`, `"tsx"`, `"typescript"`, `"vitest"`.
→ **STOP** if any key is missing or any additional key is present.

**T2.11** Validate that `package.json` does not contain any of the following keys at any level: `engines`, `packageManager`, `keywords`, `author`, `license`, `homepage`, `repository`, `bugs`, `contributors`, `funding`.
→ **STOP** if any forbidden key is found.

---

## Phase 3 — Create configuration files

### 3a — tsconfig.json

**T3.1** Write `tsconfig.json` at the repository root with exactly this content:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

**T3.2** Validate that `tsconfig.json` contains `"strict": true`.
→ **STOP** if absent or set to `false`.

**T3.3** Validate that `tsconfig.json` contains `"noUncheckedIndexedAccess": true`.
→ **STOP** if absent or set to `false`.

**T3.4** Validate that `tsconfig.json` does not contain any of the following keys: `paths`, `references`, `composite`, `incremental`.
→ **STOP** if any forbidden key is present.

---

### 3b — biome.json

**T3.5** Write `biome.json` at the repository root with exactly this content:

```json
{
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true
  },
  "files": {
    "include": ["src/**", "test/**"]
  }
}
```

**T3.6** Validate that `biome.json` `files.include` is exactly `["src/**", "test/**"]` with no other entries.
→ **STOP** if any other path is present or if either entry is missing.

**T3.7** Validate that `biome.json` does not reference any path outside `src/` and `test/`.
→ **STOP** if any such reference exists.

---

### 3c — tsup.config.ts

**T3.8** Write `tsup.config.ts` at the repository root with exactly this content:

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  platform: 'node',
  banner: {
    js: '#!/usr/bin/env node',
  },
  clean: true,
})
```

**T3.9** Validate that `tsup.config.ts` `entry` is exactly `['src/cli.ts']` with no other entries.
→ **STOP** if any other entry is present or if `src/cli.ts` is absent.

**T3.10** Validate that `tsup.config.ts` `format` is exactly `['esm']`.
→ **STOP** if `cjs` or any other format is included.

**T3.11** Validate that `tsup.config.ts` does not contain any of the following options: `dts`, `splitting`, `external`, `noExternal`, `treeshake`, `minify`.
→ **STOP** if any forbidden option is present.

---

### 3d — vitest.config.ts

**T3.12** Write `vitest.config.ts` at the repository root with exactly this content:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
  },
})
```

**T3.13** Validate that `vitest.config.ts` `test.include` is exactly `['test/**/*.test.ts']`.
→ **STOP** if the pattern is different or if any additional include pattern is present.

**T3.14** Validate that `vitest.config.ts` does not contain any of the following keys under `test`: `coverage`, `setupFiles`, `globals`, `environment`, `reporters`.
→ **STOP** if any forbidden key is present.

---

## Phase 4 — Create CLI entrypoint

**T4.1** Write `src/cli.ts` with exactly this content:

```typescript
#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command()

program
  .name('specforge')
  .description('SpecForge is a CLI-first tool that bootstraps and adapts software projects for Spec-Driven Development (SDD), enabling efficient AI-assisted development with minimal setup.')
  .version('0.0.0')

program.parse(process.argv)
```

**T4.2** Validate that line 1 of `src/cli.ts` is exactly `#!/usr/bin/env node`.
→ **STOP** if the shebang is absent, on a different line, or has a different value.

**T4.3** Validate that `src/cli.ts` contains exactly one import statement and that it imports only `Command` from `'commander'`.
→ **STOP** if any other import is present.

**T4.4** Validate that `src/cli.ts` contains no import from any local path (i.e., no path beginning with `./` or `../`).
→ **STOP** if any local import is present.

**T4.5** Validate that `src/cli.ts` defines no functions, classes, exported symbols, or type declarations beyond the single `const program` assignment.
→ **STOP** if any such definition is found.

**T4.6** Validate that `src/cli.ts` contains no calls to `.command()`, `.argument()`, or `.option()`.
→ **STOP** if any such call is found.

**T4.7** Validate that `src/cli.ts` contains exactly one call to `program.parse(process.argv)`.
→ **STOP** if absent or if more than one call is present.

**T4.8** Count the lines of `src/cli.ts`. Validate the total is fewer than 20 lines.
→ **STOP** if the file is 20 lines or longer.

---

## Phase 5 — Update .gitignore

**T5.1** Check whether `.gitignore` exists at the repository root.

**T5.2** If `.gitignore` does not exist, create it as an empty file.

**T5.3** Read the current contents of `.gitignore` and record every line present.

**T5.4** Check each of the following six entries individually against the recorded lines:

```
node_modules/
dist/
.env*
*.log
.DS_Store
coverage/
```

**T5.5** Append only the entries not already present as exact line matches. Preserve all existing content verbatim — do not reorder, remove, or modify any existing line.

**T5.6** Validate that `.gitignore` now contains all six required entries as exact line matches.
→ **STOP** if any entry is missing.

**T5.7** Validate that every line present in the file before T5.5 is still present, in the same order, at the same position.
→ **STOP** if any pre-existing line was altered, removed, or reordered.

---

## Phase 6 — Install dependencies

**T6.1** Confirm Phase 2 validations (T2.3–T2.11) all passed before proceeding.
→ **STOP** if any Phase 2 validation was not completed successfully.

**T6.2** Check whether `node_modules/` already exists at the repository root.
→ **STOP** if `node_modules/` is present. Do not run `pnpm install` over an existing installation.

**T6.3** Check whether `pnpm-lock.yaml` already exists at the repository root.
→ **STOP** if present. Do not run `pnpm install` when a lockfile already exists.

**T6.4** Run `pnpm install` exactly once from the repository root.

**T6.5** Validate that `pnpm install` exited with code 0.
→ **STOP** if the exit code is non-zero. Do not re-run `pnpm install`. Fix `package.json` and restart from a clean state.

**T6.6** Validate that `node_modules/` was created at the repository root.
→ **STOP** if absent.

**T6.7** Validate that `pnpm-lock.yaml` was created at the repository root.
→ **STOP** if absent.

**T6.8** Validate that `node_modules/commander` exists.
→ **STOP** if absent.

**T6.9** Validate that `node_modules/@biomejs` exists.
→ **STOP** if absent.

**T6.10** Validate that `node_modules/tsup` exists.
→ **STOP** if absent.

**T6.11** Validate that `node_modules/tsx` exists.
→ **STOP** if absent.

**T6.12** Validate that `node_modules/typescript` exists.
→ **STOP** if absent.

**T6.13** Validate that `node_modules/vitest` exists.
→ **STOP** if absent.

---

## Phase 7 — Final validation

**T7.1** Run `pnpm run typecheck` from the repository root. Validate exit code is 0.
→ **STOP** if it fails. Do not proceed to further steps until resolved.

**T7.2** Run `pnpm run build` from the repository root. Validate exit code is 0.
→ **STOP** if it fails.

**T7.3** Validate that `dist/cli.js` was created by the build.
→ **STOP** if absent.

**T7.4** Read line 1 of `dist/cli.js`. Validate it is exactly `#!/usr/bin/env node`.
→ **STOP** if the shebang is absent or incorrect.

**T7.5** Run `node dist/cli.js --help` from the repository root. Validate exit code is 0 and that the output contains the string `specforge`.
→ **STOP** if the command errors or the string is not found.

**T7.6** Run `pnpm run lint` from the repository root. Validate exit code is 0.
→ **STOP** if it fails.

**T7.7** Confirm `dist/` is listed in `.gitignore` (verified in Phase 5) and is not tracked by git.
Run `git status --short dist/` and confirm no tracked files are reported.
→ **STOP** if any file under `dist/` appears as tracked.

**T7.8** Confirm `node_modules/` is listed in `.gitignore` and is not tracked by git.
Run `git status --short node_modules/` and confirm no tracked files are reported.
→ **STOP** if any file under `node_modules/` appears as tracked.

**T7.9** List all files changed or created during this change. Confirm the complete set is exactly:

| File | Status |
|---|---|
| `package.json` | created |
| `tsconfig.json` | created |
| `biome.json` | created |
| `tsup.config.ts` | created |
| `vitest.config.ts` | created |
| `src/cli.ts` | created |
| `src/commands/.gitkeep` | created |
| `src/lib/.gitkeep` | created |
| `test/.gitkeep` | created |
| `.gitignore` | modified (entries appended) |
| `pnpm-lock.yaml` | created |

→ **STOP** if any file outside this list was created, modified, or deleted.

**T7.10** Explicitly confirm none of the following files were modified:
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `sdd/project.md`
- Any file under `docs/`
- Any file under `sdd/changes/` other than this change folder

→ **STOP** if any was modified.

**T7.11** All phases complete. This change is ready for review.
