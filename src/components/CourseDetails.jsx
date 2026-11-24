import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagList from './TagList';
import { formatPrice } from '../utils/format';

/** Contenu de la modale "détail formation", avec lien vers l'inscription. */
function CourseDetails({ course }) {
  const { id, title, instructor, level, duration, price, rating, students, image } = course;
  const { description, modules, technologies, available } = course;

  return (
    <>
      <img src={image} alt={title} className="img-fluid rounded mb-3" />
      <p className="text-muted">
        Formateur : {instructor} · {level} · {duration}
      </p>
      <p>{description}</p>
      <h3 className="h6">Programme</h3>
      <ol>
        {modules?.map((module) => <li key={module}>{module}</li>)}
      </ol>
      <TagList tags={technologies} />
      <p className="mt-3 mb-2">
        <strong>{formatPrice(price)}</strong> · ★ {rating} · {students} apprenants
      </p>
      {available ? (
        // Route dynamique : l'id de la formation est passé dans l'URL
        <Link to={`/inscription/${id}`} className="btn btn-success">
          S&apos;inscrire à cette formation
        </Link>
      ) : (
        <p className="text-danger mb-0">Cette formation est complète.</p>
      )}
    </>
  );
}

CourseDetails.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string,
    level: PropTypes.string,
    duration: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    students: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.string),
    technologies: PropTypes.arrayOf(PropTypes.string),
    available: PropTypes.bool,
  }).isRequired,
};

export default CourseDetails;
