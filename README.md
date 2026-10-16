# ARIO SCRIPTS — Netlify migration workspace

> Migration target: `ariobest/ario-web`. Original source: [ArioScripts/arioscripthub](https://github.com/ArioScripts/arioscripthub).

## Migration status

The target repository began without the original application files. I verified that the source app is Vite + TanStack Start + React + TypeScript, not Next.js. This target still does not contain the source app's `package.json`, Vite config, routes, components, assets, or lockfile, so it is **not yet a complete or buildable migration**. The existing branding and features must be copied from the source before the target can be considered ready.

This repository currently contains migration/deployment notes and environment examples only. No production database schema or data was changed, and no build or deployment has been verified.

## Selected Supabase project

`https://yxbzblbtzqioexszjjkc.supabase.co`

The connected Supabase management account did not grant access to inspect this project. I could not verify tables, migrations, RLS policies, authentication settings, storage buckets, or Edge Functions. Do not apply database changes until access is fixed and the live schema is inspected.

## Environment variables

Configure these in Netlify Site configuration → Environment variables. Keep privileged values server-only.

- `VITE_SUPABASE_URL` — `https://yxbzblbtzqioexszjjkc.supabase.co` (public URL).
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public/publishable key only; never a service-role key.
- `SUPABASE_URL` — server-side project URL.
- `SUPABASE_PUBLISHABLE_KEY` — server-side publishable key where needed.
- `SUPABASE_SERVICE_ROLE_KEY` — only if a trusted server function genuinely requires it. Store as a secret and never prefix it with `VITE_`.

Use `.env.example` as a local template. Never commit real credentials.

## Netlify

The source uses TanStack Start server functions, so a static-only publish is insufficient. Follow the [official Netlify TanStack Start guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/) to add `@netlify/vite-plugin-tanstack-start` to the existing Vite configuration while preserving the app's current plugins. Current guidance uses `vite build` and publishes `dist/client`, with SSR/server functions deployed as Netlify Functions.

After the full source tree is migrated, run install, lint/type-check, and production build. Deploy a preview first and test SSR, nested route refreshes, authentication redirects, and server functions before production promotion.

## Security notes

- Supabase RLS is mandatory for browser-accessible tables.
- Publishable keys are not secrets; service-role keys are.
- A role shown in client state is not authorization. Privileged actions must be checked server-side and by database policies.
- Lua delivered to a client can be copied. No client-delivery system can guarantee source secrecy after delivery.
