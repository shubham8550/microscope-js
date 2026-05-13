# Release process

microscope-js publishes to npm via **Trusted Publishers** (OIDC). No long-lived `NPM_TOKEN` lives in this repo.

## How it works (per push to `main`)

1. You commit your code change **plus a changeset file** in `.changeset/*.md`
   (run `pnpm changeset` to scaffold one — pick affected packages, choose patch/minor/major,
   write a one-line summary).
2. Push to `main`. The [`Release`](./.github/workflows/release.yml) workflow runs.
3. The `changesets/action` step does **one of two things**:
   - If unreleased changesets exist → it opens / updates a PR titled
     **"chore: release"** that bumps every affected `package.json` version and
     prepends entries to each `CHANGELOG.md`.
   - If no unreleased changesets exist (i.e. you just merged that PR) → it calls
     `pnpm run release`, which runs `pnpm build && changeset publish`, publishing
     every changed package to npm with SLSA provenance.
4. Maintainer merges the PR. The next workflow run publishes the new versions.

So a typical release is just: **"commit code + changeset → push → merge release PR"**. Everything else is automated.

## One-time setup for the maintainer (npm side)

You only do this once per package on npmjs.com. Trusted Publishing is the new npm
feature that lets GitHub Actions publish without a token, using OIDC.

1. **Claim the `@microscope-js` scope.**
   - Log in to https://www.npmjs.com.
   - Go to *Add Organization* → name it `microscope-js` (free tier, public packages).

2. **Pre-register each package as Trusted-Publisher-managed.**
   For every package in `packages/*` (one-time, before the very first publish):
   - Visit `https://www.npmjs.com/package/@microscope-js/<name>/access`
     *(works even before the package exists thanks to npm's pre-registration flow — use
     "Add a package" → "Trusted Publisher" if the package page 404s.)*
   - Choose **GitHub Actions** as the publisher.
   - Fill in:
     - Organization or user: `shubham8550`
     - Repository: `microscope-js`
     - Workflow filename: `release.yml`
     - Environment: *(leave blank — we don't use a deployment environment)*
   - Save.

3. **That's it.** No NPM_TOKEN, no organization admin token, no rotation.

## Removing a release

`npm unpublish @microscope-js/<name>@<version>` within 72 hours, or contact npm
support after that. Don't republish the same version — bump to a new one.

## Local dry-run

```bash
pnpm changeset                 # add a changeset
pnpm changeset version         # bump versions + write CHANGELOGs (does NOT publish)
pnpm changeset publish --dry-run
```
