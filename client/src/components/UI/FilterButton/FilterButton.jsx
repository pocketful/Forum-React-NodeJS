import style from './FilterButton.module.css';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

function FilterButton({ text, icon, onClick }) {
  return (
    <button className={style.filterButton} type="button" onClick={onClick}>
      <span className={style.filterButtonSpan}>{text}</span>
      <Icon icon={icon} size="small" />
    </button>
  );
}

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default FilterButton;
