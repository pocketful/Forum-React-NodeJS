import PropTypes from 'prop-types';
import AnswerCard from './AnswerCard';

function AnswersCardList({ data, onDelete, dataUpdated }) {
  // function AnswersCardList({ data, onUpdate, onDelete }) {
  return (
    <>
      {data.map((dataObj) => (
        <AnswerCard
          key={dataObj.answer_id}
          {...dataObj}
          // onUpdate={onUpdate}
          onDelete={onDelete}
          dataUpdated={dataUpdated}
        />
      ))}
    </>
  );
}

AnswersCardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AnswersCardList;
