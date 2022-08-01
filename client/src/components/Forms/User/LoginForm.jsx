import { useFormik } from 'formik';
import Button from '../../UI/Button/Button';
import style from './UserForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log('submitted values: ', values);
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
            className={style.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className={style.group}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={style.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        <div className={style.group}>
          <Button>Sign In</Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
