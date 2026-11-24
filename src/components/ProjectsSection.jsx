import { useMemo } from 'react';
import CatalogSection from './CatalogSection';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';
import useFetch from '../hooks/useFetch';
import { API_URLS, PROJECT_SEARCH_FIELDS } from '../config/constants';
import { toOptions } from '../utils/format';

const EMPTY_LIST = [];

/** Section Projets : charge l'API 1 et configure le catalogue générique. */
function ProjectsSection() {
  const { data, isLoading, error, refetch } = useFetch(API_URLS.projects);
  const projects = data?.projects ?? EMPTY_LIST;

  // Les options des filtres viennent directement de l'API
  const filters = useMemo(
    () => [
      { name: 'category', label: 'Catégorie', options: toOptions(data?.categories) },
      { name: 'technologies', label: 'Technologie', options: toOptions(data?.technologies) },
    ],
    [data]
  );

  return (
    <CatalogSection
      id="projets"
      title="Nos projets"
      subtitle="Une sélection de nos réalisations pour nos clients."
      items={projects}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      filters={filters}
      searchFields={PROJECT_SEARCH_FIELDS}
      searchPlaceholder="Rechercher un projet, un client…"
      renderCard={(project, onSelect) => <ProjectCard project={project} onSelect={onSelect} />}
      renderDetails={(project) => <ProjectDetails project={project} />}
    />
  );
}

export default ProjectsSection;
