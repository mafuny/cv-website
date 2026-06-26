// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//   - componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//   - error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Настройки для серверного рендеринга TanStack (оставляем как было)
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  
  // НАСТРОЙКИ ДЛЯ VITE
    vite: {
      base: '/cv-website/',
      server: {
        // Разрешаем ngrok домены. Использование true разрешает любые хосты.
        // Если true вызывает ошибку типов, используйте: allowedHosts: ['.ngrok-free.app', 'ee5d-185-41-76-158.ngrok-free.app']
        allowedHosts: true, 
      }
    }
}); 