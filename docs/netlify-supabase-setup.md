# Netlify + Supabase deployment checklist

## Before deploying

1. Copy the full source tree from `ArioScripts/arioscripthub` into this repository, preserving the original routes, assets, favicon, styles, and existing Supabase integration. This repository started empty, so its source code is not yet migrated.
2. Install dependencies from the committed lockfile and run the project's actual lint, type-check, and production-build commands.
3. Verify the installed TanStack Start/Nitro adapter emits a Netlify server function. `netlify.toml` selects `NITRO_PRESET=netlify` as an initial configuration; it is not considered verified until the real app is built and a deploy preview is tested.

## Netlify environment variables

In Netlify → Site configuration → Environment variables, add:

- `VITE_SUPABASE_URL`: `https://rytypdggxpklraueimzi.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY`: the project's publishable key (public, RLS-protected access only)
- `SUPABASE_URL`: same project URL for server-side code
- `SUPABASE_PUBLISHABLE_KEY`: publishable key for server-side code if needed
- `SUPABASE_SERVICE_ROLE_KEY`: only if necessary for a trusted server-only operation; mark as secret and never expose it to browser code

Do not place service-role keys in `VITE_*` variables, source files, logs, or client responses.

## Supabase Auth

After a Netlify deploy preview has a URL, configure Supabase Authentication → URL Configuration with the production site URL and only the required redirect URLs for production and preview environments. Avoid broad wildcard redirects in production.

## Database safety

The Supabase management connection available in this session does not list the project at `rytypdggxpklraueimzi`; the connected account currently lists a different project. No database tables, policies, buckets, or Edge Functions have been changed. Before applying migrations, connect the correct Supabase project, inspect existing tables/RLS/storage policies, back up production data, and reconcile migrations with the live schema.

## Verification checklist

- [ ] `npm ci` succeeds from the copied source tree
- [ ] lint and TypeScript checks pass
- [ ] production build succeeds
- [ ] Netlify deploy preview starts SSR and server routes successfully
- [ ] nested script routes work on direct navigation and refresh
- [ ] Supabase sign-up, sign-in, sign-out, password reset, and redirect URLs work
- [ ] RLS blocks unauthenticated and cross-user access
- [ ] privileged operations reject non-admin users server-side
- [ ] protected script delivery does not expose private content or server secrets
- [ ] images use appropriate bucket policies and file size/type validation
- [ ] analytics report observed events only, not fabricated execution counts
