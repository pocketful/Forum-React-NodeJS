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
  const { filter, sort } = activeFilters;

  return (
    <div className={style.wrapper}>
      {/* Filter */}
      <div className={style.filterWrapper}>
        <TextIconButton
          text="All"
          icon="fa-circle-o"
          onClick={onFilterAll}
          active={filter === 'All'}
        />
        <TextIconButton
          text="Answered"
          icon="fa-check"
          onClick={onFilterAnswered}
          active={filter === 'Answered'}
        />
        <TextIconButton
          text="Unanswered"
          icon="fa-times"
          onClick={onFilterUnanswered}
          active={filter === 'Unanswered'}
        />
      </div>
      <div className={style.sortWrapper}>
        {/* Sort */}
        <TextIconButton
          text="By Date"
          icon={
            sort === 'ByDateAsc'
              ? 'fa-sort-numeric-asc'
              : sort === 'ByDateDesc'
              ? 'fa-sort-numeric-desc'
              : 'fa-sort'
          }
          onClick={onSortDate}
          active={sort === 'ByDateAsc' || sort === 'ByDateDesc'}
        />
        <TextIconButton
          text="By Answers"
          icon={
            sort === 'ByAnswersAsc'
              ? 'fa-sort-amount-asc'
              : sort === 'ByAnswersDesc'
              ? 'fa-sort-amount-desc'
              : 'fa-sort'
          }
          onClick={onSortAnswers}
          active={sort === 'ByAnswersAsc' || sort === 'ByAnswersDesc'}
        />
      </div>
    </div>
  );
}

export default QuestionsFilter;
