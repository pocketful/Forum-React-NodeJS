import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { postFetch } from '../../../helpers/fetch';
import Button from '../../UI/Button/Button';
import style from './UserForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const [feedbackCommon, setFeedbackCommon] = useState({ msg: '', class: '' });

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
        setFeedbackCommon({ msg: result.message, class: 'danger' });
        return;
      }
      setFeedbackCommon({ msg: result.message, class: 'success' });
    },
  });

  // console.log('formik.errors:', formik.errors);

  return (
    <>
      <h2>Have an account?</h2>
      <form className={style.wrapper} onSubmit={formik.handleSubmit}>
        <div className={style.group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${style.input} 
            ${formik.touched.email && formik.errors.email ? style.inputErr : ''}
            ${
              formik.touched.email && !formik.errors.email
                ? style.inputSucc
                : ''
            }
            `}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={style.inputErrMsg}>{formik.errors.email}</p>
          )}
          {formik.touched.email && !formik.errors.email && (
            <p className={style.inputSuccMsg}>Looks good</p>
          )}
        </div>
        <div className={style.group}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${style.input} 
            ${
              formik.touched.password && formik.errors.password
                ? style.inputErr
                : ''
            }
            ${
              formik.touched.password && !formik.errors.password
                ? style.inputSucc
                : ''
            }
            `}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={style.inputErrMsg}>{formik.errors.password}</p>
          )}
          {formik.touched.password && !formik.errors.password && (
            <p className={style.inputSuccMsg}>Looks good</p>
          )}
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
