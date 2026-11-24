import { Link } from 'react-router-dom';
import { APP_NAME, NAV_LINKS } from '../config/constants';


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container-fluid page-container d-flex flex-column flex-md-row justify-content-between gap-3">
        <p className="mb-0">
          © {currentYear} {APP_NAME} — Tous droits réservés
        </p>
        <ul className="list-inline mb-0">
          {NAV_LINKS.map(({ to, label }) => (
            <li className="list-inline-item" key={to}>
              <Link className="link-light text-decoration-none" to={to}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
