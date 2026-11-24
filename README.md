# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Portail WebCraft Solutions — React

Migration du portail E1 (projets + formations) vers une application React componentisée.

## Stack

- React 18 + Vite
- React Router 6 (routing multi-pages, route dynamique `/inscription/:courseId?`)
- Bootstrap 5 (CSS uniquement) + CSS3 personnalisé (`App.css`)
- PropTypes pour typer les props des composants

## Installation

```bash
npm install
npm run dev      # serveur de développement : http://localhost:5173
npm run build    # build de production dans dist/
npm run lint     # vérification ESLint
```

## Routes

| Route | Page | Contenu |
|---|---|---|
| `/` | `Home` | Hero + section Projets + section Formations |
| `/projets` | `ProjectsPage` | Section Projets seule |
| `/formations` | `CoursesPage` | Section Formations seule |
| `/inscription/:courseId?` | `InscriptionPage` | Formulaire (formation pré-sélectionnée si `courseId`) |
| `*` | `NotFoundPage` | Page 404 |

## Architecture
