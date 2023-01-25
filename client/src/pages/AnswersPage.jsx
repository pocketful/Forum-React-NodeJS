import style from './AnswersPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { deleteFetch, getFetch } from '../helpers/fetch';
import { useAuthCtx } from '../store/authContext';
import AddAnswerForm from '../components/Forms/Answers/AddAnswerForm';
import AnswersCardList from '../components/Cards/Answers/AnswersCardList';
import SingleQuestionCard from '../components/Cards/Questions/SingleQuestionCard';
import toast from 'react-hot-toast';

function AnswersPage() {
  const [answersArr, setAnswersArr] = useState([]);
  const [oneQuestion, setOneQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);
  const { id } = useParams();
  const { token } = useAuthCtx();

  async function getAnswers() {
    try {
      const data = await getFetch(`questions/${id}/answers`, token);
      setAnswersArr(data);
    } catch (err) {
      console.error('error in getAnswers: ', err);
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
      console.error('error in getQuestions: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAnsHandler(answerId) {
    if (!token) {
      toast.error('You have to login first.');
      return;
    }
    window.alert('Are you sure you want to delete this answer?');
    try {
      const deleteResult = await deleteFetch(`answers/${answerId}`, token);
      if (!deleteResult.success) {
        toast.error(deleteResult.message);
        return;
      }
      getAnswers();
      toast.success(deleteResult.message);
    } catch (err) {
      console.error('err in deleteAnsHandler:', err);
    }
  }

  useEffect(() => {
    getAnswers();
    getQuestion();
  }, []);

  const answersLength = answersArr.length;

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
            {answersLength !== 0 ? (
              <p className={style.answersCount}>
                {answersLength} {answersLength === 1 ? 'Answer' : 'Answers'}
              </p>
            ) : (
              <p className={style.answersCountZero}>
                There are no answers yet.
              </p>
            )}
            <AnswersCardList
              data={answersArr}
              onDelete={deleteAnsHandler}
              dataUpdated={getAnswers}
            />
          </div>
          <AddAnswerForm dataUpdated={getAnswers} />
        </>
      )}
    </>
  );
}

export default AnswersPage;
