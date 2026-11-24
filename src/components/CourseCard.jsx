import PropTypes from 'prop-types';
import TagList from './TagList';
import { formatPrice } from '../utils/format';

/** Carte d'une formation. Un clic sur "Voir le détail" ouvre la modale. */
function CourseCard({ course, onSelect }) {
  const { title, category, level, duration, price, rating, image, technologies, available } =
    course;

  return (
    <article className="card h-100 item-card">
      <img src={image} className="card-img-top" alt={title} loading="lazy" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
          <span className="badge text-bg-success">{category}</span>
          <span className="badge text-bg-secondary">{level}</span>
        </div>
        <h3 className="h5 card-title">{title}</h3>
        <p className="card-text small text-muted mb-2">
          ⏱ {duration} · ★ {rating} · <strong>{formatPrice(price)}</strong>
        </p>
        <TagList tags={technologies} />
        {!available && <p className="text-danger small mt-2 mb-0">Complet</p>}
        <div className="mt-auto pt-3">
          <button
            type="button"
            className="btn btn-outline-success w-100"
            onClick={() => onSelect(course)}
          >
            Voir le détail
          </button>
        </div>
      </div>
    </article>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    level: PropTypes.string,
    duration: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    image: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    available: PropTypes.bool,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CourseCard;
