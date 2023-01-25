import style from './QuestionsCardList.module.css';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import FilterButton from '../../UI/FilterButton/FilterButton';

function QuestionsCardList(props) {
  const {
    data,
    onSortAnswers,
    onSortDate,
    onFilterUnanswered,
    onFilterAnswered,
    onFilterAll,
  } = props;
  return (
    <div className={style.wrapper}>
      <div className={style.filterWrapper}>
        {/* Filter */}
        <FilterButton
          text="Unanswered"
          icon="fa-times"
          onClick={onFilterUnanswered}
        />
        <FilterButton
          text="Answered"
          icon="fa-check"
          onClick={onFilterAnswered}
        />
        <FilterButton text="All" icon="fa-circle-o" onClick={onFilterAll} />
        {/* Sort */}
        <FilterButton text="By Date" icon="fa-sort" onClick={onSortDate} />
        <FilterButton
          text="By Answers"
          icon="fa-sort"
          onClick={onSortAnswers}
        />
      </div>
      {data.map((dataObj) => (
        <QuestionCard key={dataObj.question_id} {...dataObj} />
      ))}
    </div>
  );
}

QuestionsCardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QuestionsCardList;
