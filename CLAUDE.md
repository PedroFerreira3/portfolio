# Portfolio — Pedro Ferreira

Manual de contexto para qualquer agente (Claude Code ou humano) trabalhando neste repositório. **Leia este arquivo inteiro antes de tocar em código.**

---

## 1. Visão Geral

Site de portfólio pessoal de **Pedro Ferreira**, Desenvolvedor Full Stack, estudante de Análise e Desenvolvimento de Sistemas na FATEC Ourinhos (formatura prevista Dez/2026).

- **Tipo:** SPA estática, single page com scroll-driven (sem rotas reais).
- **Hospedagem:** GitHub Pages como _project page_ — `https://pedroferreira3.github.io/portfolio/`.
- **Repo:** [github.com/PedroFerreira3/portfolio](https://github.com/PedroFerreira3/portfolio) (existente — será sobrescrito; conteúdo atual é descartável).
- **Conteúdo:** trilíngue (pt-BR padrão, en, es).
- **Tema:** dark + light com toggle (default `system`, fallback dark).
- **Por que Vite e não Next.js?** O site é puramente client-side; não há SSR, ISR nem rotas server. Vite gera bundle estático, deploy é trivial, build é rápido. Next.js seria overkill aqui.

---

## 2. Stack & Versões

| Camada | Tecnologia | Notas |
|--------|------------|-------|
| Build | **Vite 5+** | Dev server + bundler |
| UI | **React 19** + **TypeScript 5** (strict) | |
| Estilo | **Tailwind CSS 4** | `darkMode: 'class'` |
| Componentes | **HeroUI (@heroui/react)** | Sucessor do NextUI; usa Tailwind + Framer Motion internamente |
| Tema | **next-themes** | Provider de dark/light |
| Animação | **Framer Motion** | Já vem como peer-dep do HeroUI |
| Ícones | **lucide-react** | Stroke-based, 1.5px, 24px default |
| i18n | **i18next** + **react-i18next** + **i18next-browser-languagedetector** + **i18next-http-backend** | Lazy load por namespace |
| Deploy | **GitHub Actions** + **gh-pages branch** | Workflow em `.github/workflows/deploy.yml` |

**Não adicione bibliotecas pesadas (ex: lodash, moment) sem motivo claro.** Prefira utilitários nativos.

---

## 3. Estrutura de Pastas

```
portfolio/
├── .github/workflows/deploy.yml    # CI/CD para GitHub Pages
├── public/
│   ├── 404.html                    # = index.html (SPA fallback do GH Pages)
│   ├── avatar.svg                  # avatar do hero
│   └── cv/pedro-ferreira-cv.pdf    # currículo (botão "Baixar Currículo")
├── src/
│   ├── main.tsx                    # bootstrap: providers + render
│   ├── App.tsx                     # composição de Navbar + sections + Footer
│   ├── index.css                   # tailwind + tokens CSS + fontes
│   ├── components/
│   │   ├── ui/                     # primitivos custom / wrappers do HeroUI
│   │   │   ├── SectionLabel.tsx    # "// 01 — Sobre"
│   │   │   ├── ThemeToggle.tsx     # Sun/Moon via next-themes
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # HeroUI <Navbar>
│   │   │   └── Footer.tsx
│   │   └── sections/               # uma seção por arquivo
│   │       ├── Hero.tsx            # 01
│   │       ├── About.tsx           # 02
│   │       ├── Skills.tsx          # 03
│   │       ├── Projects.tsx        # 04
│   │       ├── Experience.tsx      # 05
│   │       └── Contact.tsx         # 06
│   ├── data/                       # source-of-truth de conteúdo estático
│   │   ├── projects.ts             # array de Project com keys de tradução
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── hooks/
│   │   ├── useFadeInOnScroll.ts    # IntersectionObserver
│   │   └── useActiveSection.ts     # nav link ativo
│   ├── i18n/
│   │   ├── config.ts               # init do i18next
│   │   └── index.ts                # export tipado
│   ├── locales/                    # JSONs por idioma × namespace
│   │   ├── pt-BR/{common,hero,about,skills,projects,experience,contact}.json
│   │   ├── en/...
│   │   └── es/...
│   ├── lib/
│   │   └── utils.ts                # cn() helper
│   └── types/
│       └── index.ts                # Project, ExperienceItem, Skill, Locale
├── tailwind.config.ts              # tokens + plugin HeroUI
├── vite.config.ts                  # base: '/portfolio/', alias '@'
├── tsconfig.json                   # strict + path mapping
├── postcss.config.cjs
├── package.json
├── index.html
├── CLAUDE.md                       # este arquivo
└── README.md                       # README público
```

---

## 4. Design System

**Fonte da verdade:** `C:\Users\pedro\Documents\Projetos\Portfolio-Design-System` (repositório irmão, fora deste projeto).

Arquivos a consultar:
- `Portfolio-Design-System/README.md` — princípios visuais e copy.
- `Portfolio-Design-System/colors_and_type.css` — tokens completos (cores, tipografia, espaçamento, raio, sombra, transição).
- `Portfolio-Design-System/ui_kits/portfolio/index.html` — protótipo HTML interativo da página inteira. **Espelho visual a ser replicado.**
- `Portfolio-Design-System/preview/*.html` — previews de cada componente isolado.

### Princípios visuais

- **Dark é canônico.** Light é uma derivação — toda decisão de design deve ser tomada primeiro em dark.
- **Accent único:** `#22D3EE` (cyan-400). Usar com parcimônia — só para CTAs, links e destaques.
- **Sem gradientes em backgrounds.** Superfícies planas; bordas finas (1px) definem profundidade, não sombras.
- **Sem emoji** em UI. Ícones são Lucide stroke-based.
- **Section labels** estilo monospace: `// 01 — Sobre Mim`.
- **Cards:** bg `--bg-surface`, border `1px solid --border`, radius `12px`. Hover: `box-shadow: 0 0 0 1px var(--accent)` + lift sutil.

### Cores (tokens semânticos)

| Token | Dark | Light |
|-------|------|-------|
| `--bg-base` | `#09090B` (zinc-950) | `#FAFAFA` (zinc-50) |
| `--bg-surface` | `#18181B` (zinc-900) | `#FFFFFF` |
| `--bg-elevated` | `#27272A` (zinc-800) | `#F4F4F5` (zinc-100) |
| `--border` | `#3F3F46` (zinc-700) | `#E4E4E7` (zinc-200) |
| `--fg-primary` | `#FAFAFA` | `#18181B` |
| `--fg-secondary` | `#A1A1AA` (zinc-400) | `#52525B` (zinc-600) |
| `--fg-muted` | `#71717A` (zinc-500) | `#71717A` |
| `--accent` | `#22D3EE` | `#0891B2` (cyan-600 — contraste em fundo claro) |

### Tipografia

- **Display (h1–h4):** Space Grotesk
- **Body:** DM Sans
- **Mono (code, section labels):** JetBrains Mono
- Escala fluida com `clamp()` — ver `colors_and_type.css`.

### Iconografia

- **lucide-react** apenas. Stroke 1.5px, 24px default.
- Cor padrão: `--fg-secondary`. Hover/active: `--accent`.

---

## 5. Tema (Dark + Light)

### Stack

```tsx
<NextThemesProvider attribute="class" defaultTheme="system" themes={['light','dark']}>
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
</NextThemesProvider>
```

### Onde os tokens vivem

1. **`src/index.css`** — variáveis CSS em `:root` (light) e `.dark` (dark).
2. **`tailwind.config.ts`** — plugin do HeroUI declara `themes.light` e `themes.dark` com as mesmas cores.
3. **Componentes** — só usam classes Tailwind semânticas (`bg-background`, `text-foreground`, `border-divider`, `text-primary`). **Nunca hardcode `#22D3EE`, `bg-zinc-900`, etc. em componentes.**

### Toggle

`src/components/ui/ThemeToggle.tsx` — usa `useTheme()` do `next-themes`, alterna entre `'light'` e `'dark'`. Ícone `Sun` / `Moon` do lucide.

---

## 6. i18n

### Bibliotecas

```
i18next
react-i18next
i18next-browser-languagedetector
i18next-http-backend          # lazy load dos JSONs em /locales
```

### Estrutura de bundles

```
src/locales/
├── pt-BR/
│   ├── common.json            # nav, footer, theme/language switcher
│   ├── hero.json
│   ├── about.json
│   ├── skills.json
│   ├── projects.json
│   ├── experience.json
│   └── contact.json
├── en/...                     # mesma estrutura
└── es/...
```

### Uso em componentes

```tsx
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation('hero');
  return <h1>{t('name')}</h1>;
}
```

### Conteúdo dinâmico (projetos, experiência)

`src/data/projects.ts` armazena **chaves de tradução**, não texto:

```ts
export const projects: Project[] = [
  {
    id: 'bar-do-piau',
    titleKey: 'projects:bar-do-piau.title',
    descKey: 'projects:bar-do-piau.desc',
    categoryKey: 'projects:bar-do-piau.category',
    tags: ['Python', 'Django', 'React'],   // tags são técnicas, não traduzidas
    demoUrl: 'https://...',
    repoUrl: 'https://github.com/...',
  },
];
```

### Trocador de idioma

`src/components/ui/LanguageSwitcher.tsx` no Navbar — Dropdown do HeroUI. Ao trocar:

1. `i18n.changeLanguage(lng)`.
2. Persiste em `localStorage`.
3. `useEffect` em `App.tsx` atualiza `document.documentElement.lang`.

### Idiomas suportados

| Código | Idioma |
|--------|--------|
| `pt-BR` | Português (Brasil) — **default** |
| `en` | English |
| `es` | Español |

---

## 7. Componentes — Reuso e Hierarquia

**Ordem de prioridade ao precisar de um componente:**

1. **HeroUI** (`@heroui/react`) — sempre primeiro.
2. **`src/components/ui/`** — wrappers tematizados ou primitivos custom (só quando HeroUI não cobre).
3. **`src/components/sections/`** — composições específicas de seção.

### Mapa: protótipo → HeroUI

| Elemento do design | Componente HeroUI |
|--------------------|-------------------|
| Navbar fixa | `<Navbar>` + `<NavbarBrand>` + `<NavbarContent>` + `<NavbarItem>` |
| CTA primário (cyan) | `<Button color="primary">` |
| CTA outline | `<Button variant="bordered">` |
| Card de skill / projeto | `<Card>` + `<CardBody>` |
| Tag de skill (frontend) | `<Chip variant="solid" color="primary">` |
| Tag de skill (backend) | `<Chip variant="bordered">` |
| Avatar do Sobre | `<Avatar>` ou `<Image>` em card custom |
| Inputs do Contato | `<Input>`, `<Textarea>` |
| Tooltip em ícones | `<Tooltip>` |
| Dropdown idioma | `<Dropdown>` + `<DropdownMenu>` |

### Componentes custom necessários (não há equivalente direto)

- **`SectionLabel`** — exibe `// 01 — Sobre` em mono + accent.
- **`Timeline`** + **`TimelineItem`** — linha vertical com dots, dot "current" pulsante.
- **`StatCard`** — card pequeno com valor grande accent + label.
- **`SkillCard`** — wrapper de `<Card>` com título + ícone + grid de chips.
- **`ProjectCard`** — wrapper de `<Card>` com imagem + categoria + tags + botões.

**Regra de ouro:** se um componente é usado mais de duas vezes, extraia para `components/ui/` ou `components/layout/`.

---

## 8. Convenções

### TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`.
- Tipos viva em `src/types/index.ts` quando compartilhados; locais quando usados em um só arquivo.
- Sem `any`. Use `unknown` + narrowing.
- Props de componente: declare como `interface ComponentNameProps`.

### Nomes

- Componentes: `PascalCase` em arquivos `PascalCase.tsx`.
- Hooks: `useCamelCase.ts`.
- Outros: `kebab-case.ts`.
- Constantes: `SCREAMING_SNAKE`.

### Imports

- Paths absolutos via alias `@/` (configurado em `vite.config.ts` + `tsconfig.json`).
  - Bom: `import { cn } from '@/lib/utils'`
  - Ruim: `import { cn } from '../../../lib/utils'`
- Ordem: react/lib externas → `@heroui/react` → `lucide-react` → `@/...` → relativos `./`.

### Estilo

- Sem comentários explicando _o que_ o código faz. Só comente _por que_ quando não-óbvio.
- Sem código morto. Sem `// TODO` órfãos.
- Tailwind classes ordenadas via `prettier-plugin-tailwindcss` (configurar no scaffolding).

---

## 9. Acessibilidade

- `<html lang>` reflete idioma atual (atualizado pelo `LanguageSwitcher`).
- Contraste mínimo **AA** (4.5:1 para body, 3:1 para large text). Testar combinações cyan-400/zinc-950 e cyan-600/zinc-50.
- Foco visível: ring `--accent` em todos elementos interativos. HeroUI já fornece — não desabilitar.
- Skip-link "Pular para o conteúdo" no topo do `<body>`, escondido visualmente até foco.
- `aria-label` em ícones-só-button (theme toggle, links de redes sociais).
- `prefers-reduced-motion: reduce` desabilita fade-up e pulso do badge.
- Form de contato: `<label>` associado a cada `<input>`, mensagens de erro acessíveis.

---

## 10. Performance

- **Lazy load** de seções abaixo da dobra com `React.lazy` + `<Suspense>`. Hero é eager.
- **Fontes:** preconnect + preload no `index.html`. `font-display: swap`.
- **Imagens:** WebP/AVIF, `loading="lazy"`, dimensões explícitas para evitar CLS.
- **Bundle:** evitar imports de ícones em barril — `import { Github } from 'lucide-react'`, nunca `import * as Icons from 'lucide-react'`.
- **i18n:** namespaces lazy-loaded por seção visitada.
- **Animação:** respeitar `prefers-reduced-motion`. Sem spring/bounce. `transition-base: 200ms ease-out`.

Meta Lighthouse: **Performance ≥ 95, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95** em mobile.

---

## 11. Deploy — GitHub Pages

### Repo & base path

- Repositório: `https://github.com/PedroFerreira3/portfolio`.
- URL final: `https://pedroferreira3.github.io/portfolio/`.
- `vite.config.ts`:
  ```ts
  base: '/portfolio/'
  ```
- Em qualquer link interno ou caminho de asset estático: `import.meta.env.BASE_URL`.
  - Bom: `<a href={\`\${import.meta.env.BASE_URL}#sobre\`}>`
  - Bom: `<img src={\`\${import.meta.env.BASE_URL}avatar.svg\`}>`

### SPA fallback

GitHub Pages serve `404.html` quando uma URL não casa com arquivo estático. Para SPA com hash routing isso não é necessário, mas se um dia adicionarmos React Router com `BrowserRouter`, **`public/404.html` deve ser cópia exata do `index.html`**.

### Workflow

Usa o método oficial da GitHub via `actions/deploy-pages` (sem branch `gh-pages` — artifact é servido direto). Ver `.github/workflows/deploy.yml`.

Pipeline em 2 jobs:
1. **build:** checkout → setup Node 20 → `npm ci` → `npm run typecheck` → `npm run build` → upload artifact com `actions/upload-pages-artifact@v3`.
2. **deploy:** consome artifact via `actions/deploy-pages@v4`.

**Após primeiro push em `main`:** vá em **Settings → Pages → Build and deployment → Source** e selecione **"GitHub Actions"** (não "Deploy from a branch"). O workflow já tem `permissions: pages: write, id-token: write`.

---

## 12. Git Flow & Convenção de Commits

Modelo simplificado baseado em **GitHub Flow** (não git-flow clássico) — adequado para projeto solo com deploy contínuo.

### Branches

| Branch | Propósito | Vida útil |
|--------|-----------|-----------|
| `main` | Sempre deployável. Cada push aciona o workflow de deploy. **Protegida** — sem commits diretos. | Permanente |
| `develop` | _(opcional)_ Integração de features quando houver várias em paralelo. Para uso solo, normalmente dispensável. | Permanente / opcional |
| `feat/<slug>` | Nova feature ou seção. | Curta — merge e deletar |
| `fix/<slug>` | Correção de bug. | Curta — merge e deletar |
| `chore/<slug>` | Tarefas de manutenção (deps, config, scripts). | Curta — merge e deletar |
| `docs/<slug>` | Mudanças só em documentação. | Curta — merge e deletar |
| `refactor/<slug>` | Refactor sem mudança de comportamento. | Curta — merge e deletar |
| `style/<slug>` | Formatação, espaços, ponto-vírgula — sem mudança lógica. | Curta — merge e deletar |
| `test/<slug>` | Adicionar/ajustar testes. | Curta — merge e deletar |
| `perf/<slug>` | Melhoria de performance. | Curta — merge e deletar |
| `ci/<slug>` | Mudanças em workflows / pipelines. | Curta — merge e deletar |
| `release/<versão>` | Preparação de release (changelog, bump de versão). | Curta — merge e deletar |
| `hotfix/<slug>` | Bug crítico em produção, parte de `main` direto. | Curtíssima |

**Slug:** kebab-case curto, descritivo. Exemplos:
- `feat/hero-section`
- `feat/i18n-spanish`
- `fix/navbar-mobile-overflow`
- `chore/upgrade-heroui`
- `docs/readme-screenshots`

### Fluxo padrão

```bash
# 1. Atualizar main local
git checkout main
git pull origin main

# 2. Criar branch a partir de main
git checkout -b feat/contact-form

# 3. Trabalhar em commits pequenos seguindo Conventional Commits
git add src/components/sections/Contact.tsx
git commit -m "feat(contact): adicionar campos de formulário com validação"

# 4. Push e abrir PR
git push -u origin feat/contact-form
gh pr create --base main --title "feat(contact): formulário com validação"

# 5. Após review/aprovação, merge via squash (mantém main linear e limpo)
gh pr merge --squash --delete-branch
```

**Regra:** sempre **squash merge** para `main`. Mantém histórico linear e cada feature aparece como 1 commit em `main`.

### Conventional Commits

Formato:

```
<tipo>(<escopo opcional>): <descrição imperativa em minúsculas>

[corpo opcional explicando o "por quê"]

[footer opcional: BREAKING CHANGE, refs, co-authored-by]
```

**Tipos permitidos** (alinhados com prefixos de branch):

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade visível ao usuário | `feat(hero): adicionar badge "disponível"` |
| `fix` | Correção de bug | `fix(navbar): corrigir overflow no mobile abaixo de 375px` |
| `docs` | Apenas documentação | `docs(claude): adicionar seção de git flow` |
| `style` | Formatação, espaços, ponto-vírgula — sem alterar código | `style: aplicar prettier em src/` |
| `refactor` | Refactor sem mudar comportamento externo | `refactor(skills): extrair SkillCard para components/ui` |
| `perf` | Melhoria de performance | `perf(images): converter project thumbs para webp` |
| `test` | Adicionar/ajustar testes | `test(hero): adicionar teste de troca de idioma` |
| `chore` | Manutenção (deps, scripts, configs) | `chore(deps): atualizar heroui para 2.4.0` |
| `ci` | Mudanças em CI/CD | `ci: adicionar typecheck no workflow de deploy` |
| `build` | Build system, configs de bundler | `build(vite): habilitar source maps em produção` |
| `revert` | Reverter um commit | `revert: feat(hero): adicionar badge "disponível"` |

**Escopo (opcional):** seção/módulo afetado — `hero`, `navbar`, `contact`, `i18n`, `theme`, `deploy`, `deps`, etc.

**Descrição:**
- Imperativo: "adicionar", não "adicionado" / "adiciona".
- Minúsculas. Sem ponto final.
- Máximo 72 caracteres na primeira linha.
- Português ou inglês — escolha um e mantenha consistente. **Padrão deste projeto: português.**

**Breaking changes:**

```
feat(api)!: trocar formato de retorno do hook useTranslation

BREAKING CHANGE: o retorno agora é { t, lang } em vez de só t.
Migração: substituir `const t = useTranslation(...)` por `const { t } = useTranslation(...)`.
```

### Pull Requests

Título do PR = primeiro commit Conventional Commit da branch. Corpo segue:

```markdown
## Resumo
- O que muda e por quê (1–3 bullets)

## Como testar
- [ ] Passos para validar visualmente / funcionalmente

## Screenshots (se UI)
<antes / depois>

## Checklist
- [ ] `npm run typecheck` passa
- [ ] `npm run lint` passa
- [ ] Build local passa (`npm run build`)
- [ ] Testado em mobile (375px) e desktop (1280px)
- [ ] Tema dark e light verificados
- [ ] i18n: textos novos adicionados em pt-BR, en, es
```

### Tags & releases

Versionamento semântico (`v0.1.0`, `v1.0.0`) anexado a `main` via GitHub Releases quando houver marco visível ao usuário (ex: lançamento inicial, redesign de seção).

```bash
git tag -a v0.1.0 -m "Initial portfolio launch"
git push origin v0.1.0
```

### Regras de ouro

- **Nunca commitar direto em `main`.** Sempre via PR.
- **Branches curtas.** Se passou de 3 dias sem merge, provavelmente está grande demais — divida.
- **1 PR = 1 propósito.** Não misturar feat + refactor não relacionado no mesmo PR.
- **Sem `--no-verify`** para pular hooks. Se um hook falha, conserte a causa raiz.
- **Sem force push em `main`.** Em branches de feature pessoais, ok com `--force-with-lease`.
- **Delete a branch após merge.** O PR squash já cria um commit canônico em `main`.

---

## 13. Comandos

```bash
npm run dev          # Vite dev server em http://localhost:5173/portfolio/
npm run build        # Build de produção em dist/
npm run preview      # Servidor estático de preview do build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run format       # Prettier
```

> Deploy é automático via GitHub Actions ao fazer push para `main`. Para deploy manual, instale `gh-pages` (`npm i -D gh-pages`) e adicione `"deploy": "gh-pages -d dist"` ao `package.json`.

---

## 14. Roadmap das Seções

Ordem de implementação (segue o protótipo `Portfolio-Design-System/ui_kits/portfolio/index.html`):

| # | Seção | Componente | Notas |
|---|-------|------------|-------|
| 01 | Hero | `Hero.tsx` | Badge "disponível", nome em 2 linhas com sobrenome em accent, role, descrição, 2 CTAs, stack chips |
| 02 | Sobre Mim | `About.tsx` | Grid 2 col: avatar+stats / texto+edu-card |
| 03 | Skills | `Skills.tsx` | Grid 2 col: card Frontend (chips solid) / card Backend (chips bordered) |
| 04 | Projetos | `Projects.tsx` | Grid 3 col (2 col tablet, 1 col mobile) de `ProjectCard` |
| 05 | Experiência | `Experience.tsx` | Grid: timeline (à esquerda) + edu-card (à direita) |
| 06 | Contato | `Contact.tsx` | Grid 2 col: form / lista de contact-links |

Antes/depois das seções: `<Divider>` 1px + scroll-snap suave.

---

## 15. Decisões pendentes

- [x] **Username GitHub** — `PedroFerreira3`.
- [x] **Nome do repo** — `portfolio` (já existe, será sobrescrito).
- [ ] **Backend do form de contato:** Formspree, EmailJS ou só `mailto:`?
- [ ] **CV em PDF** — placeholder até receber arquivo final.
- [ ] **Domínio customizado** futuro? Se sim, criar `public/CNAME`.

---

## 16. Referências

- Design system: `C:\Users\pedro\Documents\Projetos\Portfolio-Design-System\`
  - Princípios: `README.md`
  - Tokens: `colors_and_type.css`
  - Protótipo HTML: `ui_kits/portfolio/index.html`
- HeroUI: https://heroui.com/docs/guide/installation (guia Vite)
- next-themes: https://github.com/pacocoursey/next-themes
- i18next: https://www.i18next.com/
- react-i18next: https://react.i18next.com/
- Vite: https://vitejs.dev/guide/
- Lucide Icons: https://lucide.dev/icons/
- GitHub Pages com Vite: https://vitejs.dev/guide/static-deploy.html#github-pages
