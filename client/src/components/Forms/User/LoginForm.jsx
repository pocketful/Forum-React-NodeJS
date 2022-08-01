import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { postFetch } from '../../../helpers/fetch';
import {
  inputFeedback,
  inputFeedbackText,
} from '../../../helpers/inputFeedback/inputFeedback';
import AuthContext from '../../../store/authContext';
import Button from '../../UI/Button/Button';
import style from './UserForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const [feedbackCommon, setFeedbackCommon] = useState({ msg: '', class: '' });
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().min(5).max(100).lowercase().required(),
      password: Yup.string().min(5).max(255).required(),
    }),

    onSubmit: async (values) => {
      const result = await postFetch('login', values);
      console.log('submitted values: ', values);
      if (result.success) {
        setFeedbackCommon({ msg: result.message, class: 'success' });
        login(result.token, values.email);
        return;
      }
      setFeedbackCommon({ msg: result.message, class: 'danger' });
    },
  });

  return (
    <>
      <h2>Have an account?</h2>
      <form className={style.wrapper} onSubmit={formik.handleSubmit}>
        <div className={style.group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${style.input} ${inputFeedback('email', formik)}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {inputFeedbackText('email', formik)}
        </div>
        <div className={style.group}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${style.input} ${inputFeedback('password', formik)}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {inputFeedbackText('password', formik)}
        </div>
        {feedbackCommon && (
          <p className={style[feedbackCommon.class]}>{feedbackCommon.msg}</p>
        )}
        <div className={style.group}>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
