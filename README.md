# Kredix - Desafio Fintech
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%230074c1.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Aplicação desenvolvida como desafio técnico para uma empresa fintech. O Kredix é um aplicativo de banco digital com gerenciamento de saldo, histórico de transações e capacidades de transferência de fundos.

## Tech Stack (Pilha Tecnológica)

- **Frontend**: React 19 + TypeScript + Vite
- **State Management (Gerenciamento de Estado)**: Zustand (com persistência no localStorage)
- **Routing (Roteamento)**: React Router v7
- **HTTP Client**: Axios
- **Forms & Validation (Formulários e Validação)**: React Hook Form + Zod
- **UI Components (Componentes de UI)**: Shadcn UI + Tailwind CSS v4
- **Testing (Testes)**: Vitest + React Testing Library + Happy DOM

## Estrutura do Projeto

```
src/
├── __tests__/              # Arquivos de teste
│   ├── stores/             # Testes de gerenciamento de estado
│   ├── utils/              # Testes de funções utilitárias
│   └── components/         # Testes de componentes
├── components/
│   ├── custom/             # Componentes personalizados
│   ├── layout/             # Componentes de layout
│   └── ui/                 # Primitivos de UI
├── data/                   # Dados mockados
├── hooks/                  # React hooks personalizados
├── loaders/                # Loaders de rota (React Query)
├── lib/                    # Bibliotecas compartilhadas
├── loaders/                # Loaders de dados
├── pages/                  # Componentes de página
├── store/                  # Gerenciamento de estado (Zustand)
├── types/                  # Tipos TypeScript
├── utils/                  # Funções utilitárias
├── validators/             # Schemas de validação Zod
└── vitest.setup.ts         # Configuração de testes
```

## Começando

### Pré-requisitos

- Node.js 18+
- pnpm 8+

### Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Criar build para produção
pnpm build

# Rodar preview da build de produção
pnpm preview

# Executar testes
pnpm test

# Executar testes com cobertura
pnpm test:coverage
```

### Variáveis de Ambiente

Nenhuma variável de ambiente é necessária para desenvolvimento. O aplicativo utiliza dados mockados para fins de teste.

### Variáveis de Ambiente
Usuário para teste
```json
{
  "email": "felipe.o@example.com",
  "password": "123456"
}
```
---

## Estratégia de Testes

### Cobertura de Testes

Este projeto implementa testes unitários abrangentes usando **Vitest** com as seguintes áreas cobertas:

#### Gerenciamento de Estado (`src/__tests__/stores/`)
- **Auth Store**: Fluxo de login/saída, validação de credenciais, estrutura do objeto do usuário
- **Wallet Store**: Gerenciamento de saldo, validação de transferência, histórico de transações

#### Utils (`src/__tests__/utils/`)
- **Formatação de números**: Formatador de moeda
- **Masks**: formatação de dinheiro
- **Utilitários de data**: Ordenação de transações, formatação de data, cálculos de meses

### Executando Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes no modo watch
pnpm test --watch

# Executar testes com relatório de cobertura
pnpm test:coverage

# Executar arquivo de teste específico
pnpm test src/__tests__/stores/auth.store.test.ts
```

### Escrevendo Testes

Todos os testes estão localizados em `src/__tests__` seguindo o padrão de nomes de arquivo `*.test.ts` ou `*.test.tsx`.

**Estrutura de exemplo de teste:**

```typescript
import { describe, expect, it } from "vitest";
import { myFunction } from "../../utils/myFunction";

describe("Minha Função", () => {
  it("deve fazer algo", () => {
    const result = myFunction("input");
    expect(result).toBe("esperado");
  });
});
```

### Relatórios de Cobertura de Testes

Relatórios de cobertura são gerados no diretório `coverage/` após executar:

```bash
pnpm test:coverage
```

Relatórios disponíveis:
- **HTML**: Relatório interativo no navegador
- **JSON**: Formato legível por máquina
- **Text**: Saída de console

---

## Arquitetura de Segurança

### Proteção contra Engenharia Reversa

Este aplicativo implementa múltiplas camadas de defesa contra engenharia reversa:

#### 1. Proteções em Build-Time

**Source Maps Desativados**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: false // Desativar source maps em produção
  }
});
```

#### 2. Segurança no Client-Side

**Proteção de Dados Sensíveis**
- Chaves de API nunca expostas no código do client, uso rigoroso de variáveis de ambiente
- Credenciais nunca armazenadas no localStorage
- Tokens de sessão usam cookies HTTP-only, Secure (quando implementado com backend)
- Regras de negócio sempre definidas no backend, caso alguma for extremamente necessária no frontend, pode haver necessidade de ofuscação, desde que cientes dos eventuais problemas de performance.

**Prevenção de Debugging**
```typescript
// Desativar console em produção

// vite.config.ts
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  }
});
```


---

### Prevenção de Vazamento de Dados

#### 1. Validação de Input

Todos os inputs dos usuários são validados usando schemas **Zod**:

```typescript
// validators/auth/auth.validator.ts
export const loginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Za-z]/, "Senha deve conter uma letra")
    .regex(/[0-9]/, "Senha deve conter um número"),
});

// validators/transfer/transfer.validator.ts
export const transferSchema = z.object({
  amount: z.number()
    .positive("Valor deve ser positivo")
    .max(1000000, "Valor excede limite máximo"),
  recipient: z.string()
    .min(5, "Identificador de destinatário muito curto")
    .regex(/^[^<>\"&]+$/, "Caracteres inválidos detectados"),
});
```

#### 2. Prevenção de XSS

Todos os componentes React usam escape apropriado através da proteção integrada do React:

```typescript
// React automaticamente escapa valores interpolados
// Não precisa de sanitização manual na maioria dos casos

// Sempre use interpolação JSX, não dangerouslySetInnerHTML
<p>{userInput}</p>  // Seguro
```

#### 3. Segurança de Rede

**Aplicação HTTPS**
```typescript
// Todas as chamadas de API devem usar HTTPS
// Em produção, configurar instância do axios com baseURL HTTPS

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**CSP Headers (Recomendado Server-Side)**
```
Content-Security-Policy: \
  default-src 'self'; \
  script-src 'self' 'unsafe-inline'; \
  style-src 'self' 'unsafe-inline'; \
  img-src 'self' data: https:; \
  connect-src 'self' https://api.kredix.io;
```

---

## Decisões Técnicas

### 1. Gerenciamento de Estado: Zustand

**Por que Zustand?**
- Boilerplate mínimo comparado ao Redux
- Suporte nativo a middleware (persistência, devtools)
- Design focused em TypeScript
- Menor tamanho de bundle

**Trade-offs:**
- Menor ecossistema de middleware comparado ao Redux
- Apenas global state (sem gerenciamento de local component state)

```typescript
// Exemplo: Configuração de store persistido
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData) => set({ isAuthenticated: true, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "kredix-auth" } // chave localStorage
  )
);
```

### 2. Gerenciamento de Formulários: React Hook Form

**Por que React Hook Form?**
- Otimizado para performance (mínimo de re-renders)
- Suporte nativo a validação
- Grande ecossistema de integrações (Zod, Yup)
- Excelente suporte TypeScript

### 3. Arquitetura de UI: Shadcn UI

**Por que Shadcn UI?**
- Biblioteca de componentes totalmente customizável
- Sem dependências de runtime
- Sistema de design consistente
- Fácil de modificar e expandir

```bash
# Adicionar componentes
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
```

### 4. Estratégia de Testes: Vitest

**Por que Vitest?**
- Suporte nativo a ES modules
- Execução ultra-rápida
- Configuração compatível com Vite
- Cobertura integrada

---

## Melhorias Futuras

### 1. Integração Backend

**Estado Atual**: Apenas dados mockados
**Futuro**: Backend REST API / GraphQL

```text
// Endpoints de API esperados
GET    /api/auth/login        - Login do usuário
POST   /api/auth/logout       - Logout do usuário
GET    /api/account           - Obter detalhes da conta
POST   /api/transfer          - Criar transferência
GET    /api/transactions      - Obter histórico de transações
```

**Plano de Migração**:
```typescript
// Plano de Migração: Separação de responsabilidades (Server State vs Client State).
// Atualmente, o método `transfer` acumula a função de cálculo com a mutação do estado local.
// No futuro, a chamada de rede seria extraída para um hook de mutação dedicado (ex: React Query), 
// e o Zustand seria atualizado apenas no callback de sucesso (onSuccess) da requisição,
// garantindo uma fonte de verdade única e facilitando o tratamento de erros/loading.

const useWalletStore = create<WalletDetail>()(
  (set) => ({
    // ... outros campos

    refresh: async () => {
      const response = await api.get("/account");
      set({ account: response.data });
    },

    transfer: async (amount, recipient) => {
      const response = await api.post("/transfer", { amount, recipient });
      set((state) => ({
        account: {
          ...state.account,
          // Atualizar com dados da resposta
        },
      }));
    },
  })
);
```

### 2. Melhorias de Autenticação

**Atual**: Validação simples de email/senha
**Futuro**:

- [ ] Autenticação baseada em JWT
- [ ] Refresh token rotation
- [ ] Suporte a autenticação biométrica
- [ ] Two-factor authentication (2FA)
- [ ] Gerenciamento de sessão com auto-logout

```typescript
// Store de autenticação futura
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  tokenExpiry: Date | null;

  // Ações
  login: (credentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  isAuthenticated: () => boolean;
}
```

### 3. Otimizações de Performance

**Atual**: Single bundle, code splitting básico
**Futuro**:

- [x] Code splitting baseado em rotas
- [ ] Lazy loading para componentes pesados (gráficos, histórico)
- [ ] Virtual scrolling para listas de transações
- [ ] Otimização de imagens (WebP, lazy loading)

```typescript
// Exemplo: Lazy load componente
const History = lazy(() => import("./pages/Home/components/history"));

// Usar Suspense
<Suspense fallback={<LoadingSpinner />}>
  <History />
</Suspense>
```

### 4. Internacionalização (i18n)

**Atual**: Strings hardcoded em Inglês
**Futuro**: Suporte completo i18n

```typescript
// Adicionar React i18next
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return <h1>{t("welcome")}</h1>;
}
```

### 5. Acessibilidade (a11y)

**Atual**: Acessibilidade básica
**Futuro**:

- [ ] ARIA labels em todos elementos interativos
- [ ] Suporte a navegação por teclado
- [ ] Testes com screen reader
- [ ] Conformidade de contraste de cores (WCAG 2.1 AA)
- [ ] Gerenciamento de foco em modais

### 6. Monitoramento e Analytics

**Atual**: Nenhum
**Futuro**:

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Web Vitals)
- [ ] User analytics (Google Analytics)
- [ ] Feature flag system

### 7. Pipeline CI/CD

**Atual**: Builds manuais
**Futuro**:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm build
      - name: Deploy para Vercel
        uses: amondnet/vercel-action@v25
```

### 8. Melhorias em Testes

**Atual**: Apenas unit tests
**Futuro**:

- [ ] Integration tests com React Query
- [ ] E2E tests com Playwright
- [ ] Accessibility tests com axe-core
- [ ] Visual regression tests
- [ ] API contract tests

```typescript
// Exemplo de E2E test Playwright
test("deve completar uma transferência", async ({ page }) => {
  await page.goto("/login");
  await page.fill('[name="email"]', "user@example.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("/");
  // ... mais assertions
});
```

---

## License

Este projeto é para fins de demonstração como parte de um desafio técnico.

---

## Suporte

Para dúvidas ou questões relacionadas à implementação deste desafio técnico, por favor refira-se à documentação original do projeto ou entre em contato com a equipe contratante.
