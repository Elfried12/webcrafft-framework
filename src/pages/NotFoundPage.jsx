import { Link } from 'react-router-dom';

/** Page 404 affichée pour toute route inconnue. */
function NotFoundPage() {
  return (
    <section className="container-fluid page-container py-5 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead">Cette page n&apos;existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l&apos;accueil</Link>
    </section>
  );
}

export default NotFoundPage;
