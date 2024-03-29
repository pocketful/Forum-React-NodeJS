import { useFormik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { postFetch } from '../../../helpers/fetch';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import style from '../User/UserForm.module.css';

const initialValues = {
  content: '',
};

function AddAnswerForm({ onDataUpdated }) {
  const { id } = useParams();
  const { token } = useAuthCtx();
  const [feedbackCommon, setFeedbackCommon] = useState({
    message: '',
    class: '',
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      content: Yup.string().min(3).required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const result = await postFetch(`questions/${id}/answers`, values, token);
      if (!result.success) {
        setFeedbackCommon({ message: result.message, class: 'danger' });
        return;
      }
      onDataUpdated();
      resetForm({ values: '' });
      setFeedbackCommon({ message: result.message, class: 'success' });
      setTimeout(() => {
        setFeedbackCommon({
          message: '',
          class: '',
        });
      }, 1000);
      // window.scrollTo(0, 0)
    },
  });

  return (
    <div className={style.wrapperBig}>
      <h2>Your answer</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="textarea"
          name="content"
          placeholder="Write your answer"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Post your answer</Button>
        </div>
        {feedbackCommon.message.length !== 0 && (
          <p className={style[feedbackCommon.class]}>
            {feedbackCommon.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddAnswerForm;
