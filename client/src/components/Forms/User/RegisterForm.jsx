import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import style from './UserForm.module.css';
import { postFetch } from '../../../helpers/fetch';

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  image: '',
};

function RegisterForm({ onSuccessRegister }) {
  const [feedbackCommon, setFeedbackCommon] = useState({
    message: '',
    class: '',
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string().min(2).max(100).required(),
      email: Yup.string().email().min(5).max(100).lowercase().required(),
      password: Yup.string().min(5).max(255).required(),
      passwordConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'passwords must match'),
      image: Yup.string().url().required(),
    }),
    onSubmit: async (values) => {
      try {
        const result = await postFetch('register', values);
        if (!result.success) {
          setFeedbackCommon({ message: result.message, class: 'danger' });
          return;
        }
        setFeedbackCommon({ message: result.message, class: 'success' });
        setTimeout(() => {
          onSuccessRegister();
        }, 1000);
      } catch (err) {
        console.error('Error during register:', err);
      }
    },
  });

  return (
    <>
      <h2>Don't have an account?</h2>
      <form onSubmit={formik.handleSubmit} className={style.wrapper}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          formik={formik}
        />
        <Input type="text" name="email" placeholder="Email" formik={formik} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          formik={formik}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          formik={formik}
        />
        <Input
          type="text"
          name="image"
          placeholder="Image URL for your avatar"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Sign Up</Button>
        </div>
        {feedbackCommon.message.length !== 0 && (
          <p className={style[feedbackCommon.class]}>
            {feedbackCommon.message}
          </p>
        )}
      </form>
    </>
  );
}

export default RegisterForm;
