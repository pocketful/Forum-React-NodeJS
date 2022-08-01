import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../UI/Button/Button';
import style from './UserForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().min(5).max(100).lowercase().required(),
      password: Yup.string().min(5).max(255).required(),
    }),

    onSubmit: async (values) => {
      console.log('submitted values: ', values);
    },
  });

  console.log('formik.errors:', formik.errors);

  return (
    <>
      <h2>Have an account?</h2>
      <form className={style.wrapper} onSubmit={formik.handleSubmit}>
        <div className={style.group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${style.input} ${
              formik.touched.email && formik.errors.email ? style.inputErr : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={style.inputErrMsg}>{formik.errors.email}</p>
          )}
        </div>
        <div className={style.group}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${style.input} ${
              formik.errors.password ? style.inputErr : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={style.inputErrMsg}>{formik.errors.password}</p>
          )}
        </div>
        <div className={style.group}>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
