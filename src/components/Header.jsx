import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../config/constants';
import Logo from './Logo';

/**
 * En-tête du site avec navigation React Router.
 * NavLink ajoute automatiquement la classe "active" sur la page courante.
 * Le menu mobile est géré avec un simple état (pas de JS Bootstrap).
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
        <div className="container-fluid page-container">
          <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
            <Logo />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              {NAV_LINKS.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink className="nav-link" to={to} end={to === '/'} onClick={closeMenu}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
