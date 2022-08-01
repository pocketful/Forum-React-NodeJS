import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { postFetch } from '../../../helpers/fetch';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import style from './UserForm.module.css';

const initialValues = {
  email: 'hermionegranger@email.com',
  password: 'secret123',
};

function LoginForm({ onSuccessLogin }) {
  const [feedbackCommon, setFeedbackCommon] = useState({ message: '', class: '' });
  const { login } = useAuthCtx();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().min(5).max(100).lowercase().required(),
      password: Yup.string().min(5).max(255).required(),
    }),
    
    onSubmit: async (values) => {
      const result = await postFetch('login', values);
      // console.log('submitted values: ', values);
      console.log('result: ', result);
      if (!result.success) {
        setFeedbackCommon({ message: result.message, class: 'danger' });
        return;
      }
      setFeedbackCommon({ message: result.message, class: 'success' });
      login(result.token, values.email);
      setTimeout(() => {
        onSuccessLogin();
      }, 2000);
    },
  });

  return (
    <>
      <h2>Have an account?</h2>
      <form onSubmit={formik.handleSubmit} className={style.wrapper}>
        <Input type="text" name="email" placeholder="Email" formik={formik} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Sign In</Button>
          {/* <Button type="submit" isDisabled={!(formik.dirty && formik.isValid)}>Sign In</Button> */}
        </div>
        {feedbackCommon.message.length !== 0 && (
          <p className={style[feedbackCommon.class]}>{feedbackCommon.message}</p>
        )}
      </form>
    </>
  );
}

export default LoginForm;
