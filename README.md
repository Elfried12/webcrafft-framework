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

```
src/
├── App.jsx / App.css        # Router + structure commune, styles globaux
├── main.jsx                 # Point d'entrée, import du CSS Bootstrap
├── config/constants.js      # URL des API, liens de navigation, champs de recherche
├── pages/                   # Une page = une route
├── components/              # Composants UI réutilisables (< 150 lignes chacun)
├── hooks/
│   ├── useFetch.jsx         # Chargement d'API (loading / error / data / refetch)
│   └── useSearch.jsx        # Recherche texte + filtres combinés
└── utils/
    ├── validation.js        # Règles de validation du formulaire (JSDoc)
    └── format.js            # Formatage prix, options de filtres
```

### Principe anti-duplication

`CatalogSection` contient toute la logique commune aux deux sections
(SearchBar + FilterBar + grille + Modal + états loading/erreur).
`ProjectsSection` et `CoursesSection` ne font que :

1. charger leur API avec `useFetch` ;
2. décrire leurs filtres (issus de l'API : `categories`, `levels`, `technologies`) ;
3. indiquer quelle carte (`ProjectCard` / `CourseCard`) et quel détail
   (`ProjectDetails` / `CourseDetails`) afficher.

### Séparation des responsabilités

- **Données** : `useFetch` (réseau) et `useSearch` (filtrage) — aucun `fetch` dans les composants UI.
- **Logique métier** : `utils/validation.js` — fonctions pures, testables sans React.
- **Configuration** : `config/constants.js` — aucune URL en dur dans les composants.
- **Affichage** : `components/` — composants à responsabilité unique, props typées avec PropTypes.

### Gestion d'erreur API

Si une API ne répond pas, `useFetch` renvoie un message d'erreur et
`ErrorMessage` l'affiche avec un bouton **Réessayer** (`refetch`).

### Responsive pleine largeur

- `.page-container` : le contenu occupe toute la largeur de l'écran, avec des marges latérales
  proportionnelles (`clamp(1rem, 4vw, 4rem)`) et une limite à 1920 px pour les très grands écrans.
- `.card-grid` : grille CSS `auto-fill` ; le nombre de colonnes s'adapte seul
  (1 sur mobile, jusqu'à 5-6 sur grand écran) sans media queries.
- `index.css` : reset de base (remplace le CSS par défaut de Vite qui centrait la page).

## Utilisation de l'intelligence artificielle

Conformément aux règles de transparence, voici les parties réalisées avec l'aide d'une IA :

- **`src/utils/validation.js`** : les constantes de validation (expressions régulières
  `EMAIL_REGEX`, `PHONE_REGEX` et `NAME_REGEX`) ont été écrites avec l'aide de l'IA.
- **Logo** (`public/logo.svg`, composant `src/components/Logo.jsx`) : le dessin du logo
  et son animation au survol (règles `.logo` dans `src/App.css`) ont été réalisés avec l'aide de l'IA.
