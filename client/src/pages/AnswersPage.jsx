import style from './AnswersPage.module.css';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EmptyArrError from '../components/Errors/EmptyArr/EmptyArrError';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { getFetch } from '../helpers/fetch';
import { useAuthCtx } from '../store/authContext';
import AddAnswerForm from '../components/Forms/Answers/AddAnswerForm';
import AnswersCardList from '../components/Cards/Answers/AnswersCardList';
import SingleQuestionCard from '../components/Cards/Questions/SingleQuestionCard';

function AnswersPage() {
  const [answersArr, setAnswersArr] = useState([]);
  const [oneQuestion, setOneQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);
  console.log('oneQuestion', oneQuestion);
  // console.log('answersArr', answersArr);
  const { id } = useParams();
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.replace('/login');

  async function getAnswers() {
    try {
      const data = await getFetch(`questions/${id}/answers`, token);
      setAnswersArr(data);
    } catch (err) {
      console.log('error in getAnswers: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

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
      getAnswers();
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
      ) : answersArr.length === 0 ? (
        <EmptyArrError name="answers" />
      ) : (
        <>
          <div className={style.wrapper}>
            <SingleQuestionCard data={oneQuestion} />
            <h4 className={style.title}>Read all answers</h4>
            <AnswersCardList data={answersArr} />
          </div>
          <AddAnswerForm />
        </>
      )}
    </>
  );
}

export default AnswersPage;
