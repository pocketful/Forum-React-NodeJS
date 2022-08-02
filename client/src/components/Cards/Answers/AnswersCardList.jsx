import PropTypes from 'prop-types';
import AnswerCard from './AnswerCard';

function AnswersCardList({ data, onUpdate, onDelete }) {
  return (
    <>
      {data.map((dataObj) => (
        <AnswerCard key={dataObj.answer_id} {...dataObj} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </>
  );
}

AnswersCardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AnswersCardList;
