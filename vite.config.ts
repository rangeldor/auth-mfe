import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    port: 3008,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 3008,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthProvider': './src/app/providers/AuthProvider.tsx',
        './LoginPage': './src/exports/LoginPage.ts',
        './SignupPage': './src/exports/SignupPage.ts',
        './AuthNav': './src/exports/AuthNav.ts',
        './UserMenu': './src/exports/UserMenu.ts',
        './ProtectedRoute': './src/exports/ProtectedRoute.ts',
        './useAuth': './src/features/auth/hooks/useAuth.ts',
        './authActions': './src/features/auth/services/authActions.ts',
        './routes': './src/routes/authRoutes.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '18.3.1' },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true },
        '@tanstack/react-query': { singleton: true, requiredVersion: '5.96.1' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
