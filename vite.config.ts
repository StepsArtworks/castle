import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/castle/', // Deploy to /castle/ directory
  build: {
    assetsDir: 'assets', // Put assets in the assets directory
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep GLB files in models directory
          if (assetInfo.name.endsWith('.glb')) {
            return 'models/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});