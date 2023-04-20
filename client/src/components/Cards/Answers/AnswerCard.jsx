import style from './AnswerCard.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../../store/authContext';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';
import VoteButtons from '../Elements/VoteButtons';

function AnswerCard(props) {
  const {
    answer_id,
    content,
    created_at,
    updated_at,
    username,
    email,
    image,
    votes,
    my_vote,
    onDelete,
    onDataUpdated,
  } = props;

  const { userEmail } = useAuthCtx();

  const isLoggedInUserPost = userEmail === email;

  return (
    <article className={style.card}>
      <p className={style.content}>{content}</p>
      <div className={style.votesUserWrapper}>
        <div className={style.votesWrapper}>
          <VoteButtons
            endpoint={'answers'}
            answerId={answer_id}
            votes={votes}
            myVote={my_vote}
            onDataUpdated={onDataUpdated}
          />
        </div>
        <div className={style.userWrapper}>
          <div className={style.dates}>
            <p className={style.created}>
              {`answered `}
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
          <Image srcText={image} altText={`${username} profile image`} />
        </div>
      </div>

      {isLoggedInUserPost && (
        <div className={style.updateDeleteWrapper}>
          <Link to={`editAnswer/${answer_id}`}>
            <TextIconButton text="Update" icon="fa-pencil" />
          </Link>
          <TextIconButton
            text="Delete"
            icon="fa-trash"
            onClick={() => onDelete(answer_id)}
          />
        </div>
      )}
    </article>
  );
}

AnswerCard.propTypes = {
  content: PropTypes.string,
};

export default AnswerCard;
