import style from './QuestionCard.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formattedDate from '../../../helpers/date';

// question_id, user_id, title, content, created_at, updated_at, archived, answers_count, username
function QuestionCard(props) {
  const {
    question_id,
    title,
    content,
    created_at,
    updated_at,
    answers_count,
    username,
  } = props;
  const createdAtFormatted = formattedDate(created_at);
  const updatedAtFormatted = formattedDate(updated_at);
  
  return (
    <article className={style.card}>
      <Link to={`questions/${question_id}/answers`}>
        <h3 className={style.title}>{title}</h3>
      </Link>
      <p className={style.content}>{content}</p>

      <div className={style.grid}>
        <p className={style.count}>
          {answers_count} {answers_count === 1 ? 'answer' : 'answers'}
        </p>

        <p className={style.created}>
          {`asked on `}
          {createdAtFormatted} by <em>{username}</em>
        </p>
        {updated_at !== null && (
          <p className={style.updated}>
            {`updated at `}
            {updatedAtFormatted}
          </p>
        )}
      </div>
    </article>
  );
}

QuestionCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default QuestionCard;
