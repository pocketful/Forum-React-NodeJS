import { useEffect, useState } from 'react';
import QuestionsCardList from '../components/Cards/Questions/QuestionsCardList';
import EmptyArrError from '../components/Errors/EmptyArr/EmptyArrError';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { getFetch } from '../helpers/fetch';

function QuestionsPage() {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [sortByAnsDown, setSortByAnsDown] = useState(true);
  const [sortByDateDown, setSortByDateDown] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);

  async function getQuestions() {
    try {
      const data = await getFetch('/questions');
      setQuestionsArr(data);
    } catch (err) {
      console.log('error in getQuestions: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

  function sortByAnswersHandler() {
    const questionsArrCopy = [...questionsArr];
    if (sortByAnsDown) {
      questionsArrCopy.sort((a, b) => b.answers_count - a.answers_count);
    } else {
      questionsArrCopy.sort((a, b) => a.answers_count - b.answers_count);
    }
    setSortByAnsDown(!sortByAnsDown);
    setQuestionsArr(questionsArrCopy);
  }

  function sortByDateHandler() {
    const questionsArrCopy = [...questionsArr];
    console.log('questionsArrCopy', questionsArrCopy);
    if (sortByDateDown) {
      questionsArrCopy.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else {
      questionsArrCopy.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    }
    setSortByDateDown(!sortByDateDown);
    setQuestionsArr(questionsArrCopy);
  }

  useEffect(() => {
    getQuestions();
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
        <QuestionsCardList
          data={questionsArr}
          onSortAnswers={sortByAnswersHandler}
          onSortDate={sortByDateHandler}
        />
      )}
    </>
  );
}

export default QuestionsPage;
