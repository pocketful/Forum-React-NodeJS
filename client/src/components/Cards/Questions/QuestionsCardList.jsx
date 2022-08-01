import style from './QuestionsCardList.module.css';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import Icon from '../../UI/Icon/Icon';

function QuestionsCardList({ data }) {
  return (
    <div className={style.wrapper}>
      <div className={style.filterWrapper}>
        <div className={style.filterItem}>
          <span className={style.filterItemSpan}>Unanswered</span>
          <Icon icon="fa-eye" size="small" />
        </div>
        <div className={style.filterItem}>
          <span className={style.filterItemSpan}>Newest </span>
          <Icon icon="fa-sort" size="small" />
        </div>
        <div className={style.filterItem}>
          <span className={style.filterItemSpan}>Most Answers</span>
          <Icon icon="fa-sort" size="small" />
        </div>
        {/* 
        <Icon icon="fa-eye-slash" /> 
        <Icon icon="fa-sort-desc" />
        <Icon icon="fa-sort-asc" />
        */}
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
