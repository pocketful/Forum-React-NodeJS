import PropTypes from 'prop-types';
import AnswerCard from './AnswerCard';

function AnswersCardList({ data }) {
  return (
    <>
      {data.map((dataObj) => (
        <AnswerCard key={dataObj.answer_id} {...dataObj} />
      ))}
    </>
  );
}

AnswersCardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AnswersCardList;
