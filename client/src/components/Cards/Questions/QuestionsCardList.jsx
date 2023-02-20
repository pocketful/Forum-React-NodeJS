import style from './QuestionsCardList.module.css';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard';
import QuestionsFilter from './QuestionsFilter/QuestionsFilter';

function QuestionsCardList(props) {
  return (
    <div className={style.wrapper}>
      <QuestionsFilter {...props} />
      {props.data.map((dataObj) => (
        <QuestionCard key={dataObj.question_id} {...dataObj} />
      ))}
    </div>
  );
}

QuestionsCardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QuestionsCardList;
