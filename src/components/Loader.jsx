import PropTypes from 'prop-types';

/** Spinner affiché pendant le chargement des données. */
function Loader({ label = 'Chargement…' }) {
  return (
    <div className="d-flex flex-column align-items-center py-5" role="status">
      <div className="spinner-border text-primary" />
      <span className="mt-2 text-muted">{label}</span>
    </div>
  );
}

Loader.propTypes = {
  label: PropTypes.string,
};

export default Loader;
