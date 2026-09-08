[![banner](docs/assets/banner.png)](https://bosonprotocol.io)

<h2 align="center">Boson Protocol Widgets</h2>

## Getting started

- How tos & guides:
   - [Commit Widget](./docs/commit-widget.md)
   - [Redemption Widget](./docs/redemption-widget.md)
   - Finance Widget
- [Local development](docs/local-development.md)

## Environments

Each environment is built by GitHub Actions and uploaded to a Cloudflare Pages project with
`wrangler pages deploy`. Cloudflare builds nothing — every `REACT_APP_*` value is inlined into
the bundle at build time, so the projects' dashboard build settings and environment variables
are not used.

| Env        | Networks          | Cloudflare project      | URL                                       |
| ---------- | ----------------- | ----------------------- | ----------------------------------------- |
| testing    | base sepolia, sepolia     | `boson-widgets-testing` | https://boson-widgets-testing.pages.dev/  |
| staging    | base sepolia, sepolia     | `boson-widgets-staging` | https://boson-widgets-staging.pages.dev/  |
| production | base, ethereum | `boson-widgets`         | https://widgets.bosonprotocol.io/         |

Deployments are triggered as follows:

| Env        | Trigger                                                           |
| ---------- | ----------------------------------------------------------------- |
| preview    | Every pull request, published at `pr-<n>.boson-widgets-testing.pages.dev` |
| testing    | Every push to `main`, gated on the CI checks                      |
| staging    | Publishing a GitHub Release (deploys that tag)                    |
| production | Manually running the **Deploy to production** workflow with a tag |

Build-time configuration lives in two places. Non-secret values — the IPFS gateway, the
`ipfs://` templates, the dispute periods and the per-environment dApp and DR Center URLs — are
committed in [`deploy_reusable.yaml`](.github/workflows/deploy_reusable.yaml), where they are
diffable and reviewed alongside the code that reads them. Secrets are held by the `testing`,
`staging` and `production` GitHub Environments, under names with no environment suffix; GitHub
resolves the environment's value and falls back to the repository-level one when unset.

Each environment also needs a `CF_PROJECT` variable holding the exact Cloudflare project name
(`wrangler pages project list`), plus the repository secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`.

An unset `REACT_APP_*` is not a build error — it becomes an empty string, and
[`src/config.ts`](src/config.ts) then throws at module load *in the browser*, so the deploy is
green and the page is blank. The **Check the build configuration is complete** step in
`deploy_reusable.yaml` lists the values a deployment cannot work without and fails the run
before building if any is missing. Add to that list when you add a variable the app depends
on.

Branch protection on `main` should require the **Format, lint, types and build** job of
**CI - Widgets**. Required checks are matched by name, so renaming either the workflow or the
job detaches the rule silently.

## Contributing

We welcome contributions! Until now, Boson Protocol has been largely worked on by a small dedicated team. However, the ultimate goal is for all of the Boson Protocol repositories to be fully owned by the community and contributors. Issues, pull requests, suggestions, and any sort of involvement are more than welcome.

Questions and feedback are always welcome, we will use them to improve our offering.

All PRs must pass all tests before being merged.

By being in this community, you agree to the [Code of Conduct](/docs/code-of-conduct.md). Take a look at it, if you haven't already.
