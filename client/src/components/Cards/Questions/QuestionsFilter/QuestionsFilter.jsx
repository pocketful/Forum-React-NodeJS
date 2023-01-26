import style from './QuestionsFilter.module.css';
import TextIconButton from '../../../UI/TextIconButton/TextIconButton';

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
        <TextIconButton
          text="Unanswered"
          icon="fa-times"
          onClick={onFilterUnanswered}
        />
        <TextIconButton
          text="Answered"
          icon="fa-check"
          onClick={onFilterAnswered}
        />
        <TextIconButton text="All" icon="fa-circle-o" onClick={onFilterAll} />
      </div>
      <div className={style.sort}>
        {/* Sort */}
        <TextIconButton text="By Date" icon="fa-sort" onClick={onSortDate} />
        <TextIconButton
          text="By Answers"
          icon="fa-sort"
          onClick={onSortAnswers}
        />
      </div>
    </div>
  );
}

export default QuestionsFilter;
