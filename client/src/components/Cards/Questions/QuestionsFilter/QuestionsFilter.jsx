import style from './QuestionsFilter.module.css';
import TextIconButton from '../../../UI/TextIconButton/TextIconButton';

function QuestionsFilter(props) {
  const {
    onSortAnswers,
    onSortDate,
    onFilterUnanswered,
    onFilterAnswered,
    onFilterAll,
    activeFilters,
  } = props;

  return (
    <div className={style.wrapper}>
      {/* Filter */}
      <div className={style.filter}>
        <TextIconButton
          text="All"
          icon="fa-circle-o"
          onClick={onFilterAll}
          active={activeFilters.filter === 'All'}
        />
        <TextIconButton
          text="Answered"
          icon="fa-check"
          onClick={onFilterAnswered}
          active={activeFilters.filter === 'Answered'}
        />
        <TextIconButton
          text="Unanswered"
          icon="fa-times"
          onClick={onFilterUnanswered}
          active={activeFilters.filter === 'Unanswered'}
        />
      </div>
      <div className={style.sort}>
        {/* Sort */}
        <TextIconButton
          text="By Date"
          icon="fa-sort"
          onClick={onSortDate}
          active={
            activeFilters.sort === 'ByDateAsc' ||
            activeFilters.sort === 'ByDateDesc'
          }
        />
        <TextIconButton
          text="By Answers"
          icon="fa-sort"
          onClick={onSortAnswers}
          active={
            activeFilters.sort === 'ByAnswersAsc' ||
            activeFilters.sort === 'ByAnswersDesc'
          }
        />
      </div>
    </div>
  );
}

export default QuestionsFilter;
