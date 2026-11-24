import PropTypes from 'prop-types';

/** Liste de badges (technologies), réutilisée dans les cartes et les modales. */
function TagList({ tags = [] }) {
  return (
    <div className="d-flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span key={tag} className="badge text-bg-light border">
          {tag}
        </span>
      ))}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default TagList;
