import PropTypes from 'prop-types';

/** Message d'erreur avec bouton pour relancer la requête API. */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
