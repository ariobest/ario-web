# ARIO SCRIPTS

A responsive, dark-themed ARIO SCRIPTS hub built with React, TypeScript, Vite, and Lucide icons.

## Current website

The repository now contains a working frontend preview with:
- Responsive landing page and ARIO SCRIPTS branding
- Search across listing titles, games, and descriptions
- Category filters and sorting
- Featured cards and script detail dialogs
- Lua-style code viewer with copy-to-clipboard
- Saved/favorite listings and a saved-only filter
- Responsive mobile navigation and polished hover states
- Clear preview labels so sample listings are not mistaken for live database records

**Important:** the listings are demonstration content, not live Supabase data. Favorites currently live only in component state and reset when the page reloads. Sign-in, admin CRUD, badges backed by roles, protected script delivery, and real analytics are not connected yet.

## Run locally

Requires Node.js 22 or a compatible recent Node.js release.

```bash
npm install
npm run dev
```

To type-check and build:

```bash
npm run typecheck
npm run build
npm run preview
```

## Netlify

The current frontend is a Vite single-page app. Netlify uses `npm run build` and publishes `dist`, configured in `netlify.toml`. Connect this repository to Netlify to create a deploy preview.

## Selected Supabase project

`https://yxbzblbtzqioexszjjkc.supabase.co`

The project URL is recorded in `.env.example`, but the connected Supabase management account did not grant access to inspect the project. No database changes have been made. Do not treat the current sample listings as live records or add privileged credentials to browser code.

Before connecting Supabase, verify access and inspect the live schema, RLS policies, auth settings, storage buckets, and functions. Keep publishable keys public and protected with RLS. Keep any service-role key server-only; never put it in a `VITE_*` variable.

## Original source

The original app repository is [ArioScripts/arioscripthub](https://github.com/ArioScripts/arioscripthub). This target currently has a newly built frontend preview and is **not yet a complete migration** of all original TanStack Start server routes and backend features. Preserve and merge the original app's working functionality during the next migration phase.

## Security and script delivery

A script sent to a user's browser can be copied. Do not promise source secrecy after delivery. Any future privileged operations must be authorized in trusted server-side code and protected by database RLS.
