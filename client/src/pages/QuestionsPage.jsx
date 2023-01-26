import { useEffect, useState } from 'react';
import QuestionsCardList from '../components/Cards/Questions/QuestionsCardList';
import EmptyArrError from '../components/Errors/EmptyArr/EmptyArrError';
import ServerError from '../components/Errors/ServerError';
import Loader from '../components/UI/Loader/Loader';
import { getFetch } from '../helpers/fetch';

function QuestionsPage() {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [allQuestionsArr, setAllQuestionsArr] = useState([]);
  const [sortByAnsDown, setSortByAnsDown] = useState(true);
  const [sortByDateDown, setSortByDateDown] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isServerOn, setIsServerOn] = useState(true);
  const [activeFilters, setActiveFilters] = useState({ filter: 'All', sort: '' });

  async function getQuestions() {
    try {
      const data = await getFetch('/questions');
      setQuestionsArr(data);
      setAllQuestionsArr(data);
      setActiveFilters(prevFilters => ({ ...prevFilters, filter: 'All' }));
    } catch (err) {
      console.error('error in getQuestions: ', err);
      setIsServerOn(false);
    } finally {
      setIsLoading(false);
    }
  }

  function filterUnansweredHandler() {
    const questionsArrCopy = [...allQuestionsArr];
    const unansweredQuestions = questionsArrCopy.filter(
      (qObj) => qObj.answers_count === 0,
    );
    setQuestionsArr(unansweredQuestions);
    setActiveFilters(prevFilters => ({ ...prevFilters, filter: 'Unanswered' }));
  }

  function filterAnsweredHandler() {
    const questionsArrCopy = [...allQuestionsArr];
    const answeredQuestions = questionsArrCopy.filter(
      (qObj) => qObj.answers_count !== 0,
    );
    setQuestionsArr(answeredQuestions);
    setActiveFilters(prevFilters => ({ ...prevFilters, filter: 'Answered' }));
  }

  function sortByAnswersHandler() {
    const questionsArrCopy = [...questionsArr];
    // Descending	 9-1  (Highest to lowest)
    if (sortByAnsDown) {
      questionsArrCopy.sort((a, b) => b.answers_count - a.answers_count);
      setActiveFilters(prevFilters => ({ ...prevFilters, sort: 'ByAnswersDesc' }));
      // Ascending  1-9  (Lowest to highest)
    } else {
      questionsArrCopy.sort((a, b) => a.answers_count - b.answers_count);
      setActiveFilters(prevFilters => ({ ...prevFilters, sort: 'ByAnswersAsc' }));
    }
    setSortByAnsDown(!sortByAnsDown);
    setQuestionsArr(questionsArrCopy);
  }

  function sortByDateHandler() {
    const questionsArrCopy = [...questionsArr];
    // Ascending  01.01.1970-Today  (Oldest to newest)
    if (sortByDateDown) {
      questionsArrCopy.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
      setActiveFilters(prevFilters => ({ ...prevFilters, sort: 'ByDateAsc' }));
      // Descending  Today-01.01.1970  (Newest to oldest)
    } else {
      questionsArrCopy.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setActiveFilters(prevFilters => ({ ...prevFilters, sort: 'ByDateDesc' }));
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
          onFilterUnanswered={filterUnansweredHandler}
          onFilterAnswered={filterAnsweredHandler}
          onFilterAll={getQuestions}
          activeFilters={activeFilters}
        />
      )}
    </>
  );
}

export default QuestionsPage;
