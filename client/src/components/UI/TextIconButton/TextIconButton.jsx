import style from './TextIconButton.module.css';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

function TextIconButton({ text, icon, onClick }) {
  return (
    <button className={style.buttonTI} type="button" onClick={onClick}>
      <span className={style.text}>{text}</span>
      <Icon icon={icon} size="small" />
    </button>
  );
}

TextIconButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default TextIconButton;
