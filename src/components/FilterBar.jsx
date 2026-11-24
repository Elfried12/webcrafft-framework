import PropTypes from 'prop-types';
import { ALL } from '../config/constants';

/**
 * Barre de filtres dynamiques réutilisable.
 * Elle génère un <select> par filtre décrit dans `filters`,
 * ce qui permet de l'utiliser pour les projets (catégorie, technologie)
 * comme pour les formations (catégorie, niveau, technologie).
 */
function FilterBar({ filters, values, onFilterChange, onReset }) {
  return (
    <div className="filter-bar d-flex flex-wrap gap-2">
      {filters.map(({ name, label, options }) => (
        <select
          key={name}
          className="form-select w-auto"
          aria-label={label}
          value={values[name] ?? ALL}
          onChange={(event) => onFilterChange(name, event.target.value)}
        >
          <option value={ALL}>{label} : tous</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
      <button type="button" className="btn btn-outline-secondary" onClick={onReset}>
        Réinitialiser
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
      ).isRequired,
    })
  ).isRequired,
  values: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default FilterBar;
