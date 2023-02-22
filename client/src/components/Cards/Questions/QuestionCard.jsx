import style from './QuestionCard.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../../helpers/date';

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

  return (
    <article className={style.card}>
      <Link to={`${question_id}/answers`}>
        <h3 className={style.title}>{title}</h3>
      </Link>
      <p className={style.content}>{content}</p>

      <div className={style.grid}>
        <p className={style.count}>
          {answers_count} {answers_count === 1 ? 'answer' : 'answers'}
        </p>

        <p className={style.created}>
          {`asked on `}
          {formatDate(created_at)} by{' '}
          <em className={style.username}>{username}</em>
        </p>
        {updated_at !== null && (
          <p className={style.updated}>
            {`updated at `}
            {formatDate(updated_at)}
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
