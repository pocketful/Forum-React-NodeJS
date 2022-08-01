import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QuestionsCardList from '../components/Cards/Questions/QuestionsCardList';
import EmptyArrError from '../components/Errors/EmptyArr/EmptyArrError';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { getFetch } from '../helpers/fetch';
import { useAuthCtx } from '../store/authContext';

function QuestionsPage() {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);

  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.replace('/login');

  async function getQuestions() {
    try {
      const data = await getFetch('/questions', token);
      console.log('data:', data);
      setQuestionsArr(data);
    } catch (err) {
      console.log('error in getQuestions: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) getQuestions();
  }, []);

  return (
    <>
      <h1>Questions</h1>
      {isLoading ? (
        <Loader />
      ) : !isServerOn ? (
        <ServerError />
      ) : questionsArr.length === 0 ? (
        <EmptyArrError name="questions" />
      ) : (
        <QuestionsCardList data={questionsArr} />
      )}
    </>
  );
}

export default QuestionsPage;
