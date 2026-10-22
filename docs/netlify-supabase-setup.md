# Netlify + Supabase setup

## Current site status

The target repository now has a redesigned React + TypeScript + Vite frontend with an animated ARIO SCRIPTS logo, four accent themes, a sign-up/sign-in screen wired to Supabase Auth, and an owner-dashboard interface. The previous hard-coded sample script listings have been removed.

The active Supabase project was inspected. It already contains `scripts`, `script_keys`, `script_key_challenges`, and the `script-api` Edge Function. The frontend now includes a server-backed key verification page and an owner Verification tab for creating scripts with generated slugs. Netlify must use the same active project's URL and publishable key for sign-in and admin script management.

## Netlify deployment

The current frontend is a Vite single-page app. Netlify uses:
- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 22

Connect `ariobest/ario-web` to Netlify. After setting environment variables, trigger a new deploy because Vite reads `VITE_*` values at build time.

## Environment variables

The `.env.example` file is a template. Add these as two separate Netlify environment variables:

```env
VITE_SUPABASE_URL=https://cqtwmxojwwyeasstuhgb.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_qBPb1ltQbHNZ-fO3PFmDeg_IQj0QfNB
```

Replace the placeholder with the actual publishable key from Supabase project API settings. In Netlify, add each variable by name and value; do not paste the entire file into one variable.

The publishable key is expected to be visible in browser code. Never add a service-role/secret key to a `VITE_*` variable, frontend source, or GitHub. The current Vite app has no trusted server runtime for secret database operations.

## Supabase Auth setup

1. Confirm you can open project `cqtwmxojwwyeasstuhgb` in the Supabase dashboard.
2. In Authentication settings, configure allowed sign-up methods and email confirmation as desired.
3. Add the local development URL and your deployed Netlify site URL to the allowed redirect/site URL configuration as appropriate.
4. Add the two environment variables above in Netlify and redeploy.
5. Test sign-up, email confirmation (if enabled), sign-in, and sign-out on the deployed site.

## Owner/admin security

The UI recognizes `arioscripts@gmail.com` for the owner dashboard; the active database has an `admin` role for this account. Server-side operations still enforce the `user_roles` admin role. A browser-only email check is not a secure authorization boundary. Before enabling script creation, uploads, user management, analytics, or other privileged actions, enforce authorization with trusted server-side checks and correctly designed Supabase RLS policies. Do not rely on hidden buttons or client state for security.

## Migration checklist

- [ ] Inspect the live Supabase schema, policies, Auth settings, storage, and functions
- [ ] Migrate original routes, components, assets, and server functions from the source app
- [x] Connect script creation and listing to existing `scripts` table policies
- [ ] Add a server-enforced owner role and test non-owner denial
- [ ] Add persistent favorites, role-backed badges, reports, and measured analytics
- [x] Connect the UI to the existing `script-api` key validation and key claim endpoints
- [ ] Add storage policies and upload type/size validation
- [ ] Run type-check/build and test a Netlify deploy preview
