/**
 * Constantes globales de l'application.
 */

const API_BASE_URL = 'https://webcraft-api.vercel.app/data';

export const API_URLS = {
  projects: `${API_BASE_URL}/projects.json`,
  courses: `${API_BASE_URL}/courses.json`,
};

export const APP_NAME = 'WebCraft Solutions';

/** Liens de navigation affichés dans le Header */
export const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/formations', label: 'Formations' },
  { to: '/inscription', label: 'Inscription' },
];

/** Champs dans lesquels la recherche texte est effectuée */
export const PROJECT_SEARCH_FIELDS = ['title', 'client', 'description', 'technologies'];
export const COURSE_SEARCH_FIELDS = ['title', 'instructor', 'description', 'technologies'];

/** Valeur "aucun filtre" utilisée par les <select> de FilterBar */
export const ALL = '';
