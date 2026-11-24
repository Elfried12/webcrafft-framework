import { useMemo } from 'react';
import CatalogSection from './CatalogSection';
import CourseCard from './CourseCard';
import CourseDetails from './CourseDetails';
import useFetch from '../hooks/useFetch';
import { API_URLS, COURSE_SEARCH_FIELDS } from '../config/constants';
import { toOptions } from '../utils/format';

const EMPTY_LIST = [];

/** Section Formations : charge l'API 2 et configure le catalogue générique. */
function CoursesSection() {
  const { data, isLoading, error, refetch } = useFetch(API_URLS.courses);
  const courses = data?.courses ?? EMPTY_LIST;

  // Les options des filtres viennent directement de l'API
  const filters = useMemo(
    () => [
      { name: 'category', label: 'Catégorie', options: toOptions(data?.categories) },
      { name: 'level', label: 'Niveau', options: toOptions(data?.levels) },
      { name: 'technologies', label: 'Technologie', options: toOptions(data?.technologies) },
    ],
    [data]
  );

  return (
    <CatalogSection
      id="formations"
      title="Nos formations"
      subtitle="Montez en compétences avec nos formateurs experts."
      items={courses}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      filters={filters}
      searchFields={COURSE_SEARCH_FIELDS}
      searchPlaceholder="Rechercher une formation, un formateur…"
      renderCard={(course, onSelect) => <CourseCard course={course} onSelect={onSelect} />}
      renderDetails={(course) => <CourseDetails course={course} />}
    />
  );
}

export default CoursesSection;
