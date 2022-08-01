import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { postFetch } from '../../../helpers/fetch';
import { useAuthCtx } from '../../../store/authContext';
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import style from '../User/UserForm.module.css';

const initialValues = {
  content: '',
};

function AddAnswerForm() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.replace('/login');

  const [feedbackCommon, setFeedbackCommon] = useState({
    message: '',
    class: '',
  });
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      content: Yup.string().min(3).required(),
    }),
    onSubmit: async (values) => {
      const result = await postFetch('questions/4/answers', values, token); // TODO id
      // console.log('submitted values: ', values);
      console.log('result: ', result);
      if (!result.success) {
        setFeedbackCommon({ message: result.message, class: 'danger' });
        return;
      }
      setFeedbackCommon({ message: result.message, class: 'success' });
    },
  });

  return (
    <>
      <h2>Your answer</h2>
      <form onSubmit={formik.handleSubmit} className={style.wrapper}>
        <Input
          type="textarea"
          name="content"
          placeholder="Write your answer"
          formik={formik}
        />
        <div className={style.group}>
          <Button type="submit">Post your answer</Button>
          {/* <Button type="submit" isDisabled={!(formik.dirty && formik.isValid)}>Post your answer</Button> */}
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

export default AddAnswerForm