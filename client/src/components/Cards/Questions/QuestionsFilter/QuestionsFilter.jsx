import style from './QuestionsFilter.module.css';
import FilterButton from '../../../UI/FilterButton/FilterButton';

function QuestionsFilter(props) {
  const {
    onSortAnswers,
    onSortDate,
    onFilterUnanswered,
    onFilterAnswered,
    onFilterAll,
  } = props;

  return (
    <div className={style.wrapper}>
      {/* Filter */}
      <div className={style.filter}>
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
      </div>
      <div className={style.sort}>
        {/* Sort */}
        <FilterButton text="By Date" icon="fa-sort" onClick={onSortDate} />
        <FilterButton
          text="By Answers"
          icon="fa-sort"
          onClick={onSortAnswers}
        />
      </div>
    </div>
  );
}

export default QuestionsFilter;
