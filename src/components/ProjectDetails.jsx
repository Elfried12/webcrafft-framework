import PropTypes from 'prop-types';
import TagList from './TagList';

/** Contenu de la modale "détail projet". */
function ProjectDetails({ project }) {
  const { title, client, category, year, duration, image, description, features, technologies, url } =
    project;

  return (
    <>
      <img src={image} alt={title} className="img-fluid rounded mb-3" />
      <p className="text-muted">
        {client} · {category} · {year} · {duration}
      </p>
      <p>{description}</p>
      <h3 className="h6">Fonctionnalités</h3>
      <ul>
        {features?.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <TagList tags={technologies} />
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">
          Voir le projet
        </a>
      )}
    </>
  );
}

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    client: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    duration: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string,
  }).isRequired,
};

export default ProjectDetails;
