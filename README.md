# Auth MFE

Micro-frontend de autenticação standalone.

## Scripts

```bash
npm run dev          # Inicia em http://localhost:3005
npm run build        # Build para produção
npm run lint         # Verifica código
npm run test         # Executa testes
npm run test:ui      # Executa testes com UI
```

## Variáveis de Ambiente

```env
VITE_AUTH_API_URL=http://localhost:3001
VITE_AUTH_URL=http://localhost:3005
VITE_HOST_URL=http://localhost:3000
```

## Exposições Module Federation

| Expose | Descrição |
|--------|-----------|
| `./AuthProvider` | Provider de autenticação |
| `./LoginPage` | Página de login |
| `./SignupPage` | Página de cadastro |
| `./useAuth` | Hook de autenticação |
| `./UserMenu` | Menu do usuário |
| `./ProtectedRoute` | Rota protegida |

## Estrutura

```
src/
├── features/auth/     # Lógica de autenticação
├── shared/          # Componentes compartilhados
└── app/             # Configuração da app
```
