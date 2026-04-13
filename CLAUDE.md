# CLAUDE.md — Architect CV (Frontend)

> **OBRIGATÓRIO:** Este arquivo deve ser atualizado sempre que houver alteração estrutural no projeto (novos arquivos, rotas, serviços, componentes, paleta de cores, dependências) e commitado junto com a alteração.

---

## Visão Geral

**Produto:** SaaS de criação de currículos profissionais  
**Stack:** Angular 17+ (standalone components, signals), Tailwind CSS, TypeScript  
**URL Produção:** https://architectvc.aevon.online  
**API:** https://api.architectvc.aevon.online/api/v1  
**Repositório frontend:** `/home/gustavo-karnopp/cvCreate/architect-cv`

---

## Comandos Essenciais

```bash
npm start                                        # dev server → localhost:4200
npm run build -- --configuration=production      # build produção → dist/architect-cv/browser/
```

**Deploy produção:**
```bash
npm run build -- --configuration=production
scp -r dist/architect-cv/browser/. root@187.77.253.78:/var/www/architectvc/
```

---

## Paleta de Cores (Design System)

| Token Tailwind             | Hex       | Uso                          |
|----------------------------|-----------|------------------------------|
| `primary`                  | #C9A84C   | Dourado — CTAs, destaques    |
| `on-primary`               | #1A1A2E   | Texto sobre dourado          |
| `secondary`                | #A09880   | Texto secundário/muted       |
| `background` / `surface`   | #1A1A2E   | Azul noturno — fundo geral   |
| `on-surface`               | #E8E0D0   | Pergaminho — texto principal |
| `surface-container`        | #222242   | Cards/painéis                |
| `surface-container-high`   | #2A2A4A   | Hover de cards               |
| `tertiary`                 | #C9A84C   | Igual primary (gold)         |
| `error`                    | #CF6679   | Estados de erro              |
| `outline-variant`          | #35355A   | Bordas sutis                 |

**Regra de contraste:** fundo escuro → texto `text-on-surface` (#E8E0D0). Fundo claro/dourado → texto `text-on-primary` (#1A1A2E).  
**hero-gradient:** `linear-gradient(135deg, #C9A84C, #D4B668)` — usar `text-on-primary` sobre ele.

---

## Estrutura de Arquivos

```
src/
├── index.html                         # Meta tags SEO, JSON-LD, manifest
├── main.ts                            # Bootstrap Angular
├── styles.scss                        # Estilos globais, hero-gradient, glass-card, print
├── environments/
│   ├── environment.ts                 # apiUrl: http://localhost:3000/api/v1
│   └── environment.prod.ts            # apiUrl: https://api.architectvc.aevon.online/api/v1
└── app/
    ├── app.ts                         # Root component — inicializa SeoService, monta ToastComponent
    ├── app.config.ts                  # provideRouter, provideHttpClient + jwtInterceptor
    ├── app.routes.ts                  # Rotas lazy-loaded
    ├── core/
    │   ├── auth/
    │   │   └── auth.service.ts        # login, register, logout, refreshUser, token/user signals
    │   ├── guards/
    │   │   └── auth.guard.ts          # Protege rotas privadas
    │   ├── interceptors/
    │   │   └── jwt.interceptor.ts     # Injeta Bearer token em todas as requisições
    │   ├── models/
    │   │   ├── user.model.ts          # User, LoginPayload, RegisterPayload
    │   │   ├── resume.model.ts        # ResumeData e sub-tipos
    │   │   ├── template.model.ts      # TemplateCategory
    │   │   └── index.ts               # Re-exports
    │   └── services/
    │       ├── api.service.ts         # get/post/patch/delete wrapping HttpClient
    │       ├── auth.service.ts        # (ver core/auth)
    │       ├── payment.service.ts     # getPlans, createCheckout, loadUnlockedTemplates, consumeUnlock
    │       ├── resume.service.ts      # Estado reativo do CV em edição (signals), CRUD parcial
    │       ├── resume-api.service.ts  # Chamadas REST para /resumes
    │       ├── seo.service.ts         # Atualiza title/meta/og/twitter/canonical por rota
    │       └── toast.service.ts       # Fila de toasts globais (signal)
    ├── features/
    │   ├── landing/                   # Página inicial (/)
    │   ├── templates/                 # Galeria de templates (/templates)
    │   ├── editor/                    # Editor de CV (/editor, /editor/:resumeId) — protegido
    │   ├── dashboard/                 # Meus Currículos (/dashboard) — protegido
    │   ├── success/                   # Preview/download pós-edição (/success, /success/:resumeId) — protegido
    │   ├── payment-success/           # Confirmação de pagamento Stripe (/payment-success)
    │   └── auth/
    │       ├── login/                 # (/auth/login)
    │       └── register/              # (/auth/register)
    └── shared/
        └── components/
            ├── navbar/                # Navbar fixa com logo, links, logout
            ├── footer/                # Footer com links e copyright
            ├── toast/                 # Toast global — canto inferior direito, 4s auto-dismiss
            ├── pricing-modal/         # Modal de planos (Mensal/Anual/Template Único)
            │   └── PENDING_DOWNLOAD_RESUME_KEY  # localStorage key exportada
            └── cv-templates/
                ├── template-registry.ts   # TEMPLATE_LIST com id, name, category, isPremium
                ├── mock-resume-data.ts    # Dados fictícios para preview
                ├── cv-preview/            # Wrapper dinâmico — carrega template por ID
                ├── criativo-01/           # Gratuito
                ├── criativo-02/           # Premium — tem avatar
                ├── executivo-01/          # Premium
                ├── executivo-02/          # Premium — tem avatar
                ├── minimalista-01/        # Premium
                ├── minimalista-02/        # Premium
                ├── moderno-01/            # Premium
                └── moderno-02/            # Premium — tem avatar
```

---

## Rotas

| Path                     | Componente             | Guard   |
|--------------------------|------------------------|---------|
| `/`                      | LandingComponent       | —       |
| `/templates`             | TemplatesComponent     | —       |
| `/editor`                | EditorComponent        | auth    |
| `/editor/:resumeId`      | EditorComponent        | auth    |
| `/dashboard`             | DashboardComponent     | auth    |
| `/success`               | SuccessComponent       | auth    |
| `/success/:resumeId`     | SuccessComponent       | auth    |
| `/payment-success`       | PaymentSuccessComponent| —       |
| `/auth/login`            | LoginComponent         | —       |
| `/auth/register`         | RegisterComponent      | —       |
| `**`                     | redirect `/`           | —       |

---

## Templates de CV

| ID              | Nome                  | Categoria   | Premium | Avatar |
|-----------------|-----------------------|-------------|---------|--------|
| criativo-01     | Criativo Minimalista  | criativo    | não     | não    |
| criativo-02     | Criativo Dark         | criativo    | sim     | sim    |
| executivo-01    | Executivo Profissional| executivo   | sim     | não    |
| executivo-02    | Executivo Moderno     | executivo   | sim     | sim    |
| minimalista-01  | Minimalista Claro     | minimalista | sim     | não    |
| minimalista-02  | Minimalista Elegante  | minimalista | sim     | não    |
| moderno-01      | Moderno Magenta       | moderno     | sim     | não    |
| moderno-02      | Moderno Geométrico    | moderno     | sim     | sim    |

**Templates com avatar:** `criativo-02`, `executivo-02`, `moderno-02`  
Controlado por `AVATAR_TEMPLATES = new Set([...])` em `editor.component.ts`.

---

## Fluxo de Pagamento (Stripe)

1. Usuário clica template premium → `selectTemplate()` seta `selectedTemplateId` → abre `PricingModalComponent`
2. Modal recebe `[templateId]` do pai → `selectPlan()` chama `PaymentService.createCheckout(plan, templateId?)`
3. API retorna `{ url }` → `window.location.href = url` (redirect Stripe Checkout)
4. Stripe redireciona para `/payment-success?session_id=...`
5. `PaymentSuccessComponent` confirma sessão via `/payments/confirm-session`
6. Redireciona para `/success/:resumeId` (plano único) ou `/dashboard` (assinatura)

**localStorage keys:**
- `architect_cv_pending_download_resume` — resumeId salvo antes do redirect Stripe
- `architect_cv_token` — JWT de autenticação
- `architect_cv_user` — dados do usuário logado

---

## Serviços Principais

### `ResumeService`
- Estado reativo do CV em edição via `signal()`
- `templateId`, `resumeData`, `currentResumeId` são signals
- `setTemplate(id)` preserva `currentResumeId`
- `reset()` limpa todos os dados

### `ToastService`
- `success(title, message?)` | `error(...)` | `info(...)` | `warning(...)`
- Duração padrão: 4000ms
- Exibido pelo `ToastComponent` em `app.ts`

### `SeoService`
- `init()` chamado em `app.ts` no `ngOnInit`
- Atualiza title, description, og:*, twitter:*, canonical por rota
- Mapa de configurações em `ROUTE_SEO`

---

## SEO

- `public/robots.txt` — permite `/`, `/templates`, `/auth/register`; bloqueia rotas privadas
- `public/sitemap.xml` — 4 URLs públicas com prioridade
- `public/manifest.webmanifest` — PWA com ícones e theme_color dourado
- `index.html` — JSON-LD `SoftwareApplication` + `WebSite`, Open Graph completo, Twitter Cards

---

## Assets

```
public/
├── favicon.ico
├── favicon-16.png
├── favicon-32.png
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
└── assets/
    ├── icons/
    │   ├── png/   # 48, 64, 72, 96, 128, 144, 152, 192, 256, 512, apple-touch-icon
    │   └── svg/   # mesmos tamanhos em SVG
    └── logos/
        ├── logo-192.png
        ├── logo-256.png / .svg   ← usada na navbar
        ├── logo-512.png / .svg
```

---

## Print / PDF

- `@media print` em `styles.scss`
- `html { zoom: 1.3340 }` para preencher A4
- `body { width: 595px }` — largura fixa do template
- `print-color-adjust: exact` — força cores e backgrounds
- `@page { size: A4; margin: 12mm 0 }` — margens para página 2+
- `@page :first { margin: 0 }` — sem margem na primeira página
- Elemento `.print-only` visível apenas no print (em cada página que suporta)

---

## Regras de Desenvolvimento

- Componentes standalone com `signal()` para estado reativo
- Nunca usar `bg-white` fora dos containers de preview de CV (o papel do CV é branco)
- Sempre usar tokens do design system (`text-on-surface`, `bg-surface-container`, etc.)
- Fundo escuro → `text-on-surface` (#E8E0D0); fundo dourado → `text-on-primary` (#1A1A2E)
- Novos templates devem ser registrados em `template-registry.ts` e no `cv-preview.component`
- Ao adicionar rota pública nova → atualizar `robots.txt`, `sitemap.xml` e `seo.service.ts`
- Ao adicionar serviço novo → documentar neste CLAUDE.md
