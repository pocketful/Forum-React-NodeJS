import PropTypes from 'prop-types';
import AnswerCard from './AnswerCard';

function AnswersCardList({ data, onDelete, onDataUpdated }) {
  return (
    <>
      {data.map((dataObj) => (
        <AnswerCard
          key={dataObj.answer_id}
          {...dataObj}
          onDelete={onDelete}
          onDataUpdated={onDataUpdated}
        />
      ))}
    </>
  );
}

AnswersCardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AnswersCardList;
