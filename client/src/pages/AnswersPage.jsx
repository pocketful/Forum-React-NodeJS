import style from './AnswersPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyArrError from '../components/Errors/EmptyArr/EmptyArrError';
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

  async function deleteAnsHandler(answerId) {
    window.alert('Are you sure you want to delete this answer?');
    try {
      const deleteResult = await deleteFetch(`answers/${answerId}`, token);
      // console.log('deleteResult:', deleteResult);
      if (!token) toast.error('You have to login first.');
      if (!deleteResult.success) {
        console.log('failed to delete');
        toast.error(deleteResult.message);
        return;
      }
      getAnswers();
      toast.success(deleteResult.message);
    } catch (err) {
      console.log('err in deleteAnsHandler:', err);
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
        <>
          <EmptyArrError name="answers" />
          <AddAnswerForm />
        </>
      ) : (
        <>
          <div className={style.wrapper}>
            <SingleQuestionCard
              data={oneQuestion}
            />
            <h4 className={style.title}>Read all answers</h4>
            <AnswersCardList
              data={answersArr}
              onDelete={deleteAnsHandler}
            />
          </div>
          <AddAnswerForm dataUpdated={getAnswers} />
        </>
      )}
    </>
  );
}

export default AnswersPage;
