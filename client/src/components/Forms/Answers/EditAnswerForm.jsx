import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getFetch, updateOneFetch } from '../../../helpers/fetch';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import style from '../User/UserForm.module.css';
import toast from 'react-hot-toast';

function EditAnswerForm({ onSuccessPost }) {
  const { id } = useParams();
  const { answerId } = useParams();
  const { token } = useAuthCtx();
  const [initialValues, setInitialValues] = useState([{ content: '' }]);
  const [feedbackCommon, setFeedbackCommon] = useState({
    message: '',
    class: '',
  });

  async function getAnswerById() {
    try {
      const data = await getFetch(`questions/${id}/answers`, token);
      const objById = data.find(({ answer_id }) => answer_id === +answerId);
      if (objById) {
        setInitialValues({ content: objById.content });
        return;
      }
    } catch (err) {
      console.error('error in getAnswerById: ', err);
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      content: Yup.string().min(3).required(),
    }),
    onSubmit: async (values) => {
      if (!token) {
        toast.error('You have to login first.');
        return;
      }
      const result = await updateOneFetch(`answers/${answerId}`, values, token);
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

  useEffect(() => {
    getAnswerById();
  }, []);

  return (
    <div className={style.wrapperBig}>
      <h2>You can update your answer here</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="textarea"
          name="content"
          placeholder="you can edit your answer here"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Update your answer</Button>
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

export default EditAnswerForm;
