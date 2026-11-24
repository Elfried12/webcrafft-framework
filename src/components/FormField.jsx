import PropTypes from 'prop-types';

/**
 * Champ de formulaire réutilisable : label + champ + message d'erreur.
 * Le champ réel (input, select, textarea) est passé en children.
 */
function FormField({ id, label, error, children }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {children}
      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormField;
