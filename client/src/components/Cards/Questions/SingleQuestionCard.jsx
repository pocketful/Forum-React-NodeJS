import style from './SingleQuestionCard.module.css';
import PropTypes from 'prop-types';
import formattedDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import Icon from '../../UI/Icon/Icon';
import { Link } from 'react-router-dom';

// question_id, user_id, title, content, created_at, updated_at, archived, username, image
function SingleQuestionCard(props) {
  const {
    question_id,
    title,
    content,
    created_at,
    updated_at,
    username,
    image,
    // onUpdate,
    // onDelete,
  } = props.data;
  // console.log('SingleQuestionCard', props);
  const createdAtFormatted = formattedDate(created_at);
  const updatedAtFormatted = formattedDate(updated_at);

  return (
    <article className={style.card}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.content}>{content}</p>

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
      <div className={style.updateDeleteWrapper}>
        <span>
          Update{' '}
          <Link to={`/${question_id}/editQuestion`}>
            <Icon
              icon="fa-pencil"
              size="small"
              // onClick={() => onUpdate(question_id)}
            />
          </Link>
        </span>
        <span>
          Delete{' '}
          <Icon
            icon="fa-trash"
            size="small"
            // onClick={() => onDelete(question_id)}
          />
        </span>
      </div>
    </article>
  );
}

SingleQuestionCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default SingleQuestionCard;
