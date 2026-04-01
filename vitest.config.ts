import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthProvider': './src/app/providers/AuthProvider.tsx',
        './LoginPage': './src/features/auth/pages/LoginPage.tsx',
        './SignupPage': './src/features/auth/pages/SignupPage.tsx',
        './useAuth': './src/features/auth/hooks/useAuth.ts',
        './UserMenu': './src/features/auth/components/UserMenu.tsx',
        './ProtectedRoute': './src/shared/components/ProtectedRoute.tsx',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
