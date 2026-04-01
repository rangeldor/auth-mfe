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
        './LoginPage': './src/features/auth/pages/LoginPageHost.tsx',
        './SignupPage': './src/features/auth/pages/SignupPageHost.tsx',
        './useAuth': './src/features/auth/hooks/useAuth.ts',
        './UserMenu': './src/features/auth/components/UserMenu.tsx',
        './ProtectedRoute': './src/shared/components/ProtectedRoute.tsx',
        './routes': './src/routes/authRoutes.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '18.3.1' },
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
