import { useCallback, useEffect, useState } from 'react';

/**
 * Hook personnalisé pour charger des données JSON depuis une API.
 *
 * Gère automatiquement les trois états d'une requête :
 *  - isLoading : la requête est en cours
 *  - error     : message d'erreur si la requête a échoué
 *  - data      : données JSON reçues
 *
 * Un AbortController annule la requête si le composant est démonté
 * avant la fin du chargement (évite les mises à jour d'état "fantômes").
 *
 * @param {string} url - URL de l'API à appeler
 * @returns {{ data: any, isLoading: boolean, error: string|null, refetch: Function }}
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        // Une annulation volontaire n'est pas une vraie erreur
        if (err.name !== 'AbortError') {
          setError(`Impossible de charger les données (${err.message}).`);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url, reloadKey]);

  /** Relance la requête (utilisé par le bouton "Réessayer") */
  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, isLoading, error, refetch };
}

export default useFetch;
