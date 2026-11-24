import { Link } from 'react-router-dom';

/** Section d'accueil animée  */
function Hero() {
  return (
    <section className="hero text-white text-center d-flex align-items-center">
      <div className="container-fluid page-container">
        <h1 className="hero-title display-4 fw-bold">
          Nous créons le web <span className="hero-highlight">de demain</span>
        </h1>
        <p className="hero-subtitle lead mt-3">
          Découvrez nos réalisations et formez-vous aux technologies modernes.
        </p>
        <div className="hero-actions d-flex justify-content-center gap-3 mt-4">
          <a href="#projets" className="btn btn-light btn-lg">Nos projets</a>
          <Link to="/inscription" className="btn btn-outline-light btn-lg">
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
