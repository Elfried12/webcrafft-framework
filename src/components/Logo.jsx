import PropTypes from 'prop-types';
import { APP_NAME } from '../config/constants';

/**
 * Logo WebCraft Solutions (icône + nom optionnel).
 * L'icône est un SVG placé dans public/ : nette à toutes les tailles
 * et réutilisée comme favicon dans index.html.
 */
function Logo({ size = 36, showName = true }) {
  return (
    <span className="logo d-inline-flex align-items-center gap-2">
      <img src="/logo.svg" width={size} height={size} alt={showName ? '' : APP_NAME} />
      {showName && <span className="logo-name">{APP_NAME}</span>}
    </span>
  );
}

Logo.propTypes = {
  size: PropTypes.number,
  showName: PropTypes.bool,
};

export default Logo;
