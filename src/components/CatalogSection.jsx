import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import Modal from './Modal';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import useSearch from '../hooks/useSearch';

/**
 * Section de catalogue générique : recherche + filtres + grille + modale.
 * Utilisée à l'identique pour les Projets et les Formations (aucun code dupliqué).
 * Ce qui change d'une section à l'autre est passé en props :
 *  - filters / searchFields : configuration de la recherche
 *  - renderCard / renderDetails : affichage spécifique d'un élément
 */
function CatalogSection(props) {
  const { id, title, subtitle, items, isLoading, error, onRetry } = props;
  const { filters, searchFields, searchPlaceholder, renderCard, renderDetails } = props;

  const [selectedItem, setSelectedItem] = useState(null);
  const { query, setQuery, filters: filterValues, setFilter, resetFilters, results } =
    useSearch(items, searchFields);

  const handleSelect = useCallback((item) => setSelectedItem(item), []);
  const handleCloseModal = useCallback(() => setSelectedItem(null), []);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
    if (results.length === 0) {
      return <p className="text-center text-muted py-4">Aucun résultat pour ces critères.</p>;
    }
    return (
      <div className="row g-4">
        {results.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
            {renderCard(item, handleSelect)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id={id} className="container py-5">
      <h2 className="fw-bold">{title}</h2>
      {subtitle && <p className="text-muted">{subtitle}</p>}

      <div className="d-flex flex-column flex-lg-row gap-3 mb-4">
        <SearchBar
          id={`${id}-search`}
          value={query}
          onChange={setQuery}
          placeholder={searchPlaceholder}
        />
        <FilterBar
          filters={filters}
          values={filterValues}
          onFilterChange={setFilter}
          onReset={resetFilters}
        />
      </div>

      {!isLoading && !error && (
        <p className="small text-muted">{results.length} résultat(s)</p>
      )}
      {renderContent()}

      <Modal isOpen={selectedItem !== null} title={selectedItem?.title} onClose={handleCloseModal}>
        {selectedItem && renderDetails(selectedItem)}
      </Modal>
    </section>
  );
}

CatalogSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func,
  filters: PropTypes.array.isRequired,
  searchFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchPlaceholder: PropTypes.string,
  renderCard: PropTypes.func.isRequired,
  renderDetails: PropTypes.func.isRequired,
};

export default CatalogSection;
