import style from './QuestionsCardList.module.css';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import Icon from '../../UI/Icon/Icon';

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
        <div className={style.filterItem} onClick={onFilterUnanswered}>
          <span className={style.filterItemSpan}>Unanswered</span>
          <Icon icon="fa-times" size="small" />
        </div>

        <div className={style.filterItem} onClick={onFilterAnswered}>
          <span className={style.filterItemSpan}>Answered</span>
          <Icon icon="fa-check" size="small" />
        </div>

        <div className={style.filterItem} onClick={onFilterAll}>
          <span className={style.filterItemSpan}>All</span>
          <Icon icon="fa-circle-o" size="small" />
        </div>

        {/* Sort */}
        <div className={style.filterItem} onClick={onSortDate}>
          <span className={style.filterItemSpan}>By Date </span>
          <Icon icon="fa-sort" size="small" />
        </div>

        <div className={style.filterItem} onClick={onSortAnswers}>
          <span className={style.filterItemSpan}>By Answers</span>
          <Icon icon="fa-sort" size="small" />
        </div>
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
