# Netlify + Supabase setup

## Current site status

The target repository now contains a React + TypeScript + Vite frontend preview. It has a responsive ARIO SCRIPTS landing page, searchable sample listings, category filters, sorting, detail dialogs, copy-to-clipboard, and local in-session favorites.

The listing data is currently hard-coded sample content. Authentication, admin CRUD, role-based badges, protected delivery, real analytics, and live Supabase reads/writes are not connected. The target is not yet a full migration of all original source routes and server functions.

## Netlify deployment

The current frontend is a Vite SPA, so `netlify.toml` uses:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 22

Connect `ariobest/ario-web` to Netlify and deploy a preview. Check the build log and open the deployed preview before promoting it to production.

## Selected Supabase project and access

Selected URL: `https://yxbzblbtzqioexszjjkc.supabase.co`.

The connected Supabase management account did not grant access to inspect this project. I could not verify project metadata, tables, migrations, RLS policies, authentication settings, storage buckets, or Edge Functions. No database changes have been made.

Before connecting or modifying the database:
1. Ensure the management account has access to project `yxbzblbtzqioexszjjkc`.
2. Inspect current tables, constraints, migrations, RLS policies, auth settings, storage buckets/policies, and Edge Functions.
3. Back up existing data.
4. Reconcile any proposed migrations with the live schema.
5. Verify anonymous and cross-user access is denied where required.

## Environment variables

The `.env.example` file is a template, not real credentials. Configure variables in Netlify Site configuration → Environment variables when the app integration is implemented:

- `VITE_SUPABASE_URL`: selected project URL (public)
- `VITE_SUPABASE_PUBLISHABLE_KEY`: publishable key only; browser-exposed by design
- `SUPABASE_URL`: server-side project URL where needed
- `SUPABASE_PUBLISHABLE_KEY`: server-side publishable key where needed
- `SUPABASE_SERVICE_ROLE_KEY`: only if trusted server-only code truly needs it; mark as secret and never expose it to browser code

Do not commit real credentials or put service-role keys in `VITE_*` variables.

## Full migration checklist

- [ ] Review and merge original source routes, components, assets, and existing Supabase functions
- [ ] Verify the selected Supabase project is accessible
- [ ] Inspect and reconcile the live database schema before migrations
- [ ] Connect Supabase Auth and verify sign-in, sign-up, sign-out, password reset, and redirects
- [ ] Enforce RLS for browser-accessible data
- [ ] Add trusted server-side admin checks for every privileged operation
- [ ] Implement persistent favorites, badges, reports, and observed analytics
- [ ] Design protected script delivery without promising that client-delivered code remains secret
- [ ] Add storage policies and upload type/size validation
- [ ] Run type-check/build and test a Netlify deploy preview
