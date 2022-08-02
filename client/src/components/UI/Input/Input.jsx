import style from './Input.module.css';
import PropTypes from 'prop-types';
import {
  inputFeedback,
  inputFeedbackText,
} from '../../../helpers/inputFeedback/inputFeedback';
function Input({ type = 'text', name, placeholder, children, formik }) {
  if (type === 'textarea') {
    return (
      <div className={style.group}>
        <textarea
          name={name}
          placeholder={placeholder}
          className={`${style.textarea} ${inputFeedback(name, formik)}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ''}
        >
          {children}
        </textarea>
        {inputFeedbackText(name, formik)}
      </div>
    );
  }
  return (
    <div className={style.group}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${style.input} ${inputFeedback(name, formik)}`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name] || ''}
      />
      {inputFeedbackText(name, formik)}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'textarea']),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.string,
};

export default Input;
