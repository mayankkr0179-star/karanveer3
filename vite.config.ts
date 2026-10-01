// @lovable.dev/vite-tanstack-config already includes tanstackStart, react, tailwind, paths, nitro etc.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Static HTML output so the site can be hosted on GitHub Pages.
    pages: [{ path: "/" }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
