# Portfolio — Pedro Ferreira

[![Deploy to GitHub Pages](https://github.com/PedroFerreira3/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/PedroFerreira3/portfolio/actions/workflows/deploy.yml)

Portfólio pessoal de Pedro Ferreira — Desenvolvedor Full Stack.

🌐 **Live:** [pedroferreira3.github.io/portfolio](https://pedroferreira3.github.io/portfolio/)

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS** + **HeroUI** + **Framer Motion**
- **i18next** — pt-BR · en · es
- **next-themes** — dark/light toggle
- **Lucide Icons**
- **GitHub Pages** via GitHub Actions

## Desenvolvimento

```bash
npm install
npm run dev          # http://localhost:5173/portfolio/
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o dev server |
| `npm run build` | Gera build de produção em `dist/` |
| `npm run preview` | Preview do build |
| `npm run typecheck` | Type check (sem emitir arquivos) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

Deploy é automático via GitHub Actions ao push em `main`.

## Documentação

Convenções, arquitetura, design system e fluxo de git estão em [CLAUDE.md](./CLAUDE.md).
