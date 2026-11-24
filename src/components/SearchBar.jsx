import PropTypes from 'prop-types';

/**
 * Barre de recherche réutilisable 
 * La valeur est stockée dans le parent : chaque frappe déclenche onChange,
 * ce qui permet une recherche en temps réel.
 */
function SearchBar({ value, onChange, placeholder = 'Rechercher…', id }) {
  return (
    <div className="search-bar">
      <label htmlFor={id} className="visually-hidden">
        {placeholder}
      </label>
      <input
        id={id}
        type="search"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default SearchBar;
