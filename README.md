# ARIO SCRIPTS — Netlify migration workspace

> Migration target: `ariobest/ario-web`. Original source: [ArioScripts/arioscripthub](https://github.com/ArioScripts/arioscripthub).

## Important migration status

This repository was empty when migration work began. The original app is a Vite + TanStack Start + React + TypeScript project, not Next.js. Do not replace it with a generic template. The source application files, existing routes, branding, and data must be copied from the source repository before this target can be considered a migrated, buildable website.

The configuration and database assets in this repository are migration scaffolding only; they do not prove the app has been deployed or that the Supabase project has been inspected or modified.

## Environment variables

Configure these in Netlify Site configuration → Environment variables. Keep privileged values server-only.

- `VITE_SUPABASE_URL` — public Supabase project URL (`https://rytypdggxpklraueimzi.supabase.co`).
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public/publishable key only; never a service-role key.
- `SUPABASE_URL` — server-side project URL.
- `SUPABASE_PUBLISHABLE_KEY` — server-side publishable key where needed.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only secret, only for trusted server functions that genuinely require it. Never prefix it with `VITE_`.

Use `.env.example` as a local template. Never commit real credentials.

## Supabase migrations

Review `supabase/migrations/` against the live project before applying anything. Back up production data first. The provided migration is additive and intentionally does not drop or rewrite existing tables.

## Netlify

The framework adapter/build output must be finalized after the complete source repository has been copied and the installed TanStack Start/Nitro versions are tested together. Do not treat a successful static publish as proof that server routes work. Deploy a preview first, test SSR and nested route refreshes, authentication redirects, and server functions, then promote to production.

## Security notes

- Supabase RLS is mandatory for browser-accessible tables.
- Public/publishable keys are not secrets; service-role keys are.
- A role shown in client state is not authorization. Privileged actions must be checked server-side and in database policies.
- Lua delivered to a client can be copied. This project cannot guarantee source secrecy after delivery.
