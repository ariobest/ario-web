# Netlify + Supabase deployment checklist

## Current migration status

The source app is a Vite + TanStack Start + React + TypeScript application. It uses TanStack Start server functions, so a static-only deploy is not sufficient. The target repository currently does not contain the source app's `package.json`, `vite.config.ts`, routes, components, assets, or lockfile. Copy and verify the complete source tree from `ArioScripts/arioscripthub` before attempting a build.

The correct Netlify integration for current TanStack Start apps is `@netlify/vite-plugin-tanstack-start`. Add it to the existing Vite config alongside the TanStack Start plugin, preserving the project's existing configuration rather than replacing it with a generic Vite template. Netlify's current guidance uses `npm run build` / `vite build` and publishes `dist/client`; SSR, server routes, server functions, and middleware are deployed as Netlify Functions. See the [official Netlify TanStack Start guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/).

## Supabase project and access

The selected project URL is `https://yxbzblbtzqioexszjjkc.supabase.co`.

The connected Supabase management account currently does not have permission to inspect this project. I could not verify its project metadata, tables, migrations, RLS policies, authentication settings, storage buckets, or Edge Functions. No database changes have been made. Do not apply migrations until the correct project is connected and the live schema has been inspected.

## Netlify environment variables

In Netlify → Site configuration → Environment variables, add:

- `VITE_SUPABASE_URL`: `https://yxbzblbtzqioexszjjkc.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY`: the project's publishable key (public; access must be protected by RLS)
- `SUPABASE_URL`: same project URL for server-side code
- `SUPABASE_PUBLISHABLE_KEY`: publishable key for server-side code if needed
- `SUPABASE_SERVICE_ROLE_KEY`: only if a trusted server-only operation needs it; mark as secret and never expose it to browser code

Use `.env.example` as a reference only. Never commit real credentials. Never place service-role keys in `VITE_*` variables, source files, logs, or client responses.

## Supabase Auth

After deployment, configure Supabase Authentication → URL Configuration with the actual production site URL and only the required redirect URLs for production and preview environments. Avoid broad wildcard redirects in production.

## Database safety

Before applying migrations:
1. Connect an account that can access project `yxbzblbtzqioexszjjkc`.
2. Inspect current tables, constraints, migrations, RLS policies, auth settings, storage buckets/policies, and Edge Functions.
3. Back up production data.
4. Reconcile migrations with the live schema and preserve compatible existing data.
5. Verify all privileged operations are checked in trusted server code and RLS.

## Verification checklist

- [ ] Complete source tree and original assets/routes are migrated
- [ ] Netlify TanStack Start plugin is configured in the existing Vite config
- [ ] `npm ci` succeeds from the migrated source tree
- [ ] lint and TypeScript checks pass
- [ ] production build succeeds
- [ ] Netlify deploy preview starts SSR and server routes successfully
- [ ] nested script routes work on direct navigation and refresh
- [ ] Supabase sign-up, sign-in, sign-out, password reset, and redirects work
- [ ] RLS blocks unauthenticated and cross-user access
- [ ] privileged operations reject non-admin users server-side
- [ ] protected script delivery does not expose private content or server secrets
- [ ] images use appropriate bucket policies and file size/type validation
- [ ] analytics report observed events only, not fabricated execution counts
