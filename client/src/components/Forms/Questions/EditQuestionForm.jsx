import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getFetch, updateFetch } from '../../../helpers/fetch';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import style from '../User/UserForm.module.css';
import toast from 'react-hot-toast';

function EditQuestionForm({ onSuccessPost }) {
  const { id } = useParams();
  const { token } = useAuthCtx();
  const [initialValues, setInitialValues] = useState([
    { title: '', content: '' },
  ]);
  const [feedbackCommon, setFeedbackCommon] = useState({
    message: '',
    class: '',
  });
  async function getQuestion() {
    try {
      const question = await getFetch(`questions/${id}`, token);
      console.log('question', question);
      if (question) {
        setInitialValues({
          title: question[0].title,
          content: question[0].content,
        });
        return;
      }
    } catch (err) {
      console.log('error in getQuestion:', err);
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(255).required(),
      content: Yup.string().min(3).required(),
    }),
    onSubmit: async (values) => {
      if (!token) toast.error('You have to login first.');
      const result = await updateFetch(`questions/${id}`, values, token);
      // console.log('result: ', result);
      if (!result.success) {
        setFeedbackCommon({ message: result.message, class: 'danger' });
        return;
      }
      setFeedbackCommon({ message: result.message, class: 'success' });
      setTimeout(() => {
        onSuccessPost();
      }, 2000);
    },
  });

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className={style.wrapperBig}>
      <h2>You can update your question</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input type="text" name="title" placeholder="Title" formik={formik} />
        <Input
          type="textarea"
          name="content"
          placeholder="More information about your question"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Update your question</Button>
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

export default EditQuestionForm;
