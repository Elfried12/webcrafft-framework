import PropTypes from 'prop-types';
import TagList from './TagList';

/** Carte d'un projet. Un clic sur "Voir le détail" ouvre la modale. */
function ProjectCard({ project, onSelect }) {
  const { title, client, category, year, image, technologies } = project;

  return (
    <article className="card h-100 item-card">
      <img src={image} className="card-img-top" alt={title} loading="lazy" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
          <span className="badge text-bg-primary">{category}</span>
          <small className="text-muted">{year}</small>
        </div>
        <h3 className="h5 card-title">{title}</h3>
        <p className="card-text text-muted small">Client : {client}</p>
        <TagList tags={technologies} />
        <div className="mt-auto pt-3">
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={() => onSelect(project)}
          >
            Voir le détail
          </button>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    client: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ProjectCard;
