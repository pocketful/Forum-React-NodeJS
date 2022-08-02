import { useEffect, useState } from 'react';
import QuestionsCardList from '../components/Cards/Questions/QuestionsCardList';
import EmptyArrError from '../components/Errors/EmptyArr/EmptyArrError';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { getFetch } from '../helpers/fetch';

function QuestionsPage() {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [sortByAnsDown, setSortByAnsDown] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);

  async function getQuestions() {
    try {
      const data = await getFetch('/questions');
      // console.log('data:', data);
      setQuestionsArr(data);
    } catch (err) {
      console.log('error in getQuestions: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

  function sortAnswersHandler() {
    const questionsArrCopy = [...questionsArr];
    if (sortByAnsDown) {
      questionsArrCopy.sort((a, b) => b.answers_count - a.answers_count);
    } else {
      questionsArrCopy.sort((a, b) => a.answers_count - b.answers_count);
    }
    console.log('sortNewestHandler');
    setSortByAnsDown(!sortByAnsDown);
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
          onSortAnswers={sortAnswersHandler}
        />
      )}
    </>
  );
}

export default QuestionsPage;
