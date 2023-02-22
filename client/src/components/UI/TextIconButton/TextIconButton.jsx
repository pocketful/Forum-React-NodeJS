import style from './TextIconButton.module.css';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

function TextIconButton({
  text,
  icon,
  size = 'small',
  onClick,
  active,
  isDisabled,
  label,
}) {
  return (
    <button
      type="button"
      className={`${style.btn} ${active ? style['active'] : ''}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
    >
      {text && <span className={style.text}>{text}</span>}
      <Icon icon={icon} size={size} />
    </button>
  );
}

TextIconButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  onClick: PropTypes.func,
  active: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextIconButton;
