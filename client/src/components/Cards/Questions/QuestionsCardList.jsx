import style from './QuestionsCardList.module.css';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';

function QuestionsCardList({ data }) {
  return (
    <div className={style.wrapper}>
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
