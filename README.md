# ARIO SCRIPTS

A responsive ARIO SCRIPTS creator hub built with React, TypeScript, Vite, Supabase JS, and Lucide icons.

## What's in this version

- New animated dark interface with a custom terminal-style ARIO logo
- Four selectable accent themes: Midnight, Ocean, Emerald, and Rose
- Theme choice saved in this browser
- Sign-up and sign-in screen wired to Supabase Auth when environment variables are configured
- Owner dashboard UI reserved in the interface for `ariobesst2014@gmail.com`
- Original hard-coded demo script listings removed; the home page does not pretend sample listings are real
- Responsive layout, hover effects, reduced-motion support, and mobile navigation

## Supabase environment variables

Copy the contents of [`.env.example`](./.env.example). Replace the placeholder publishable key with the real publishable key from your Supabase project's API settings.

```env
VITE_SUPABASE_URL=https://yxbzblbtzqioexszjjkc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_PASTE_YOUR_REAL_KEY_HERE
```

The publishable key is intended to be used in a browser app. **Never** add a Supabase service-role or secret key to a `VITE_*` variable or commit it to GitHub.

### Add the variables to Netlify

1. Open your site in Netlify.
2. Go to **Site configuration → Environment variables** (the exact menu label can vary).
3. Add `VITE_SUPABASE_URL` with the project URL above.
4. Add `VITE_SUPABASE_PUBLISHABLE_KEY` with your actual publishable key.
5. Trigger a new deploy so Vite bakes the new values into the frontend bundle.

Do not paste the whole `.env` file into a single Netlify variable. Add each variable separately with its name and value.

## Local development

Requires Node.js 22 or a compatible recent Node.js release.

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Netlify build

The current app is a Vite single-page application. Netlify uses:

- Build command: `npm run build`
- Publish directory: `dist`

These settings are in `netlify.toml`.

## Important backend and security status

- Supabase sign-up/sign-in uses Supabase Auth when the two environment variables are configured. The Supabase project's Auth settings still need to allow the desired sign-up and redirect URLs.
- The selected project is `https://yxbzblbtzqioexszjjkc.supabase.co`. The connected management account did not grant access to inspect it, so its tables, Auth configuration, and RLS policies have not been verified or changed.
- The dashboard checks the signed-in email in the frontend for display/navigation. This is **not sufficient authorization for real admin operations**. Before adding script management, user management, uploads, analytics, or protected delivery, enforce the owner role with trusted server-side checks and Supabase RLS policies.
- The script database, CRUD, role-backed badges, real execution analytics, and protected delivery are not connected yet.
- A browser-delivered script can always be copied by a determined visitor. Disabling right-click or Ctrl+A does not secure it, so this site does not disable those standard browser/accessibility shortcuts.

## Original source

The original site repository is [ArioScripts/arioscripthub](https://github.com/ArioScripts/arioscripthub). This target remains a redesign/frontend step rather than a complete migration of all original TanStack Start routes and server functions.
