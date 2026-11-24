import { useParams } from 'react-router-dom';
import InscriptionForm from '../components/InscriptionForm';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';
import { API_URLS } from '../config/constants';

/**
 * Page d'inscription (routes "/inscription" et "/inscription/:courseId").
 * Le paramètre dynamique courseId pré-sélectionne la formation choisie
 * depuis la modale de détail.
 */
function InscriptionPage() {
  const { courseId = '' } = useParams();
  const { data, isLoading, error, refetch } = useFetch(API_URLS.courses);

  return (
    <section className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="fw-bold mb-2">Inscription à une formation</h1>
      <p className="text-muted mb-4">Les champs marqués * sont obligatoires.</p>

      {isLoading && <Loader label="Chargement des formations…" />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {data && (
        // key : recrée le formulaire si l'utilisateur change de formation via l'URL
        <InscriptionForm key={courseId} courses={data.courses} defaultCourseId={courseId} />
      )}
    </section>
  );
}

export default InscriptionPage;
