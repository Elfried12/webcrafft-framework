import { useMemo, useState } from 'react';
import { ALL } from '../config/constants';

/**
 * Vérifie si une valeur (texte ou tableau de textes) contient la recherche.
 * @param {string|string[]|number} value
 * @param {string} query - recherche déjà en minuscules
 * @returns {boolean}
 */
const matchesQuery = (value, query) => {
  if (Array.isArray(value)) return value.some((v) => matchesQuery(v, query));
  return String(value ?? '').toLowerCase().includes(query);
};

/**
 * Vérifie si une valeur correspond au filtre sélectionné.
 * Si la valeur est un tableau (ex : technologies), il suffit qu'il contienne le filtre.
 */
const matchesFilter = (value, selected) =>
  Array.isArray(value) ? value.includes(selected) : value === selected;

/**
 * Hook personnalisé de recherche + filtrage, réutilisé par Projets ET Formations.
 *
 * @param {Object[]} items - liste complète (projets ou formations)
 * @param {string[]} searchFields - champs utilisés pour la recherche texte
 * @returns {{ query, setQuery, filters, setFilter, resetFilters, results }}
 */
function useSearch(items = [], searchFields = []) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});

  /** Met à jour un seul filtre sans toucher aux autres */
  const setFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /** Réinitialise la recherche et tous les filtres */
  const resetFilters = () => {
    setQuery('');
    setFilters({});
  };

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        normalizedQuery === '' ||
        searchFields.some((field) => matchesQuery(item[field], normalizedQuery));

      const matchesAllFilters = Object.entries(filters).every(
        ([field, selected]) => selected === ALL || matchesFilter(item[field], selected)
      );

      return matchesSearch && matchesAllFilters;
    });
  }, [items, searchFields, query, filters]);

  return { query, setQuery, filters, setFilter, resetFilters, results };
}

export default useSearch;
