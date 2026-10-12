// The shared TanStack config package already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves this project from a sub-path (https://<owner>.github.io/deki/)
// unless a custom domain is attached. Absolute asset paths ("/assets/...") would then
// resolve against the domain root and 404, so the base is configurable per deploy:
//   - custom domain attached  -> PAGES_BASE=/     (site lives at the root)
//   - default <owner>.github.io/deki/  -> PAGES_BASE=/deki/
const base = process.env.PAGES_BASE ?? "/";

export default defineConfig({
  vite: { base },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pre-render the routes below to real HTML on build, so the site can be served by a
    // plain static host (GitHub Pages), which cannot run the nitro SSR bundle.
    prerender: { enabled: true },
    pages: [{ path: "/" }],
  },
});