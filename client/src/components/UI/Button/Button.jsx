import style from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ children, type = 'button', isDisabled = false }) {
  return (
    <button type={type} className={style.btn} disabled={isDisabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isDisabled: PropTypes.bool,
};

export default Button;
