import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { postFetch } from '../../../helpers/fetch';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import style from '../User/UserForm.module.css';
import toast from 'react-hot-toast';

const initialValues = {
  title: '',
  content: '',
};

function AddQuestionForm({ onSuccessPost }) {
  const { token } = useAuthCtx();
  const [feedbackCommon, setFeedbackCommon] = useState({
    message: '',
    class: '',
  });
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(255).required(),
      content: Yup.string().min(3).required(),
    }),
    onSubmit: async (values) => {
      if (!token) toast.error('You have to login first.');
      const result = await postFetch('questions', values, token);
      if (!result.success) {
        setFeedbackCommon({ message: result.message, class: 'danger' });
        return;
      }
      setFeedbackCommon({ message: result.message, class: 'success' });
      setTimeout(() => {
        onSuccessPost();
      }, 1000);
    },
  });

  return (
    <>
      <h2>Ask a public question</h2>
      <form onSubmit={formik.handleSubmit} className={style.wrapper}>
        <Input type="text" name="title" placeholder="Title" formik={formik} />
        <Input
          type="textarea"
          name="content"
          placeholder="More information about your question"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Post your question</Button>
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

export default AddQuestionForm;
