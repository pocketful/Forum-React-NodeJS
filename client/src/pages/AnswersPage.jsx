import style from './AnswersPage.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { getFetch } from '../helpers/fetch';
import { useAuthCtx } from '../store/authContext';
import AddAnswerForm from '../components/Forms/Answers/AddAnswerForm';
import SingleQuestionCard from '../components/Cards/Questions/SingleQuestionCard';

function AnswersPage() {
  const [oneQuestion, setOneQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.replace('/login');

  async function getQuestion() {
    try {
      const data = await getFetch(`questions/${id}`, token);
      setOneQuestion(data[0]);
    } catch (err) {
      console.log('error in getQuestions: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getQuestion();
    }
  }, []);

  return (
    <>
      <h1>Answers</h1>
      {isLoading ? (
        <Loader />
      ) : !isServerOn ? (
        <ServerError />
      ) : (
        <>
          <div className={style.wrapper}>
            <SingleQuestionCard data={oneQuestion} />
            <h4 className={style.title}>Read all answers</h4>
          </div>
          <AddAnswerForm />
        </>
      )}
    </>
  );
}

export default AnswersPage;
