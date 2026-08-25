import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'Like A Book Mode',
    description: 'Turn every web into a book style',
    version: '1.0.0',
    permissions: ['activeTab', 'storage'],
    action: {},
  }
});
