import style from './inputFeedback.module.css';

export function inputFeedback(field, formik) {
  if (formik.touched[field] && formik.errors[field]) return style.inputErr;
  if (formik.touched[field] && !formik.errors[field]) return style.inputSucc;
  return '';
}

export function inputFeedbackText(field, formik) {
  if (formik.touched[field] && formik.errors[field]) {
    return <p className={style.inputErrMsg}>{formik.errors[field]}</p>;
  }
  if (formik.touched[field] && !formik.errors[field]) {
    return <p className={style.inputSuccMsg}>looks good!</p>;
  }
}
