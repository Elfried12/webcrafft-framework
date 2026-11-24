import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Fenêtre modale.
 * - Se ferme avec la touche Échap, le bouton ✕ ou un clic sur le fond.
 * - Le contenu est libre (children) : détails d'un projet ou d'une formation.
 */
function Modal({ isOpen, title, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // bloque le scroll de la page

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h2 id="modal-title" className="h4 mb-0">{title}</h2>
          <button type="button" className="btn-close" aria-label="Fermer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
