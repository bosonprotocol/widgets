[Boson Widgets docs](../README.md)

# Local development

> The following is targeting developers who want to set up this repository locally to contribute, test or just play around.

## Contents

- [Local development](#local-development)
  - [Contents](#contents)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
  - [Building](#building)
  - [Running locally](#running-locally)

## Prerequisites

The required Node version is in [`.nvmrc`](../.nvmrc) — run `nvm use` (or `fnm use`) to pick it
up. It is the same version CI builds and deploys with. npm ships with Node, so there is
nothing else to install.

## Local setup

```bash
# checkout repo
git clone https://github.com/bosonprotocol/widgets.git

# install deps
cd widgets
npm ci
```

`npm ci` runs the `copy-zoid` postinstall, which populates the git-ignored
`public/scripts/zoid` directory the build needs — so always install before building.

Copy [`.env.example`](../.env.example) to `.env` and fill it in. `src/config.ts` throws at
module load for a missing value, so the app renders a blank page with a console error rather
than failing to build.

## Building

```bash
npm run build
```

## Checks

These are exactly what CI runs, and none of them modify files:

```bash
npm run prettier:check
npm run lint:check
npm run tsc
```

The `prettier` and `lint` scripts (without `:check`) rewrite files instead, and are what the
husky pre-commit hook uses.

## Running locally

```bash
npm run dev
```

