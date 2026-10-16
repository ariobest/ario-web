import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This is a working Vite preview app. When the original TanStack Start
// server routes are migrated, merge the official Netlify Start plugin here.
export default defineConfig({
  plugins: [react()],
});