import style from './AnswerCard.module.css';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import formattedDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import Icon from '../../UI/Icon/Icon';

// answer_id, user_id, question_id, content, created_at, updated_at, archived, votes, username, image
function AnswerCard(props) {
  const {
    // user_id,
    // question_id,
    content,
    created_at,
    updated_at,
    votes,
    username,
    image,
  } = props;
  const createdAtFormatted = formattedDate(created_at);
  const updatedAtFormatted = formattedDate(updated_at);

  return (
    <article className={style.card}>
      <p className={style.content}>{content}</p>

      <div className={style.flexBig}>
        <div className={style.votesWrapper}>
          <Icon icon="fa-thumbs-o-up" />
          <p className={style.votes}>{votes}</p>
          <Icon icon="fa-thumbs-o-down" />
        </div>

        <div className={style.flex}>
          <div className={style.dates}>
            <p className={style.created}>
              {`asked on `}
              {createdAtFormatted} by{' '}
              <em className={style.username}>{username}</em>
            </p>
            {updated_at !== null && (
              <p className={style.updated}>
                {`updated at `}
                {updatedAtFormatted}
              </p>
            )}
          </div>
          <Image srcText={image} altText={`${username} profile image`} />
        </div>
      </div>

      <div className={style.updateDeleteWrapper}>
        <span>
          Update <Icon icon="fa-pencil" size="small" />
        </span>
        <span>
          Delete <Icon icon="fa-trash" size="small" />
        </span>
      </div>
    </article>
  );
}

AnswerCard.propTypes = {
  content: PropTypes.string,
};

export default AnswerCard;