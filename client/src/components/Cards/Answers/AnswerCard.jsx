import style from './AnswerCard.module.css';
import PropTypes from 'prop-types';
import formattedDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import Icon from '../../UI/Icon/Icon';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import { postFetch } from '../../../helpers/fetch';

// answer_id, user_id, question_id, content, created_at, updated_at, archived, votes, username, image
function AnswerCard(props) {
  const {
    answer_id,
    // user_id,
    // question_id,
    content,
    created_at,
    updated_at,
    votes,
    username,
    image,
    onDelete,
    dataUpdated,
  } = props;
  const { token } = useAuthCtx();

  const createdAtFormatted = formattedDate(created_at);
  const updatedAtFormatted = formattedDate(updated_at);

  async function upVoteHandler(answerId) {
    const upVote = { vote: 1 };
    if (!token) toast.error('You have to login first.');
    const result = await postFetch(`answers/${answerId}`, upVote, token);
    if (!result.success) {
      toast.error('We cannot include your vote, please try again later');
      return;
    }
    dataUpdated();
  }

  async function downVoteHandler(answerId) {
    const downVote = { vote: -1 };
    if (!token) toast.error('You have to login first.');
    const result = await postFetch(`answers/${answerId}`, downVote, token);
    if (!result.success) {
      toast.error('We cannot include your vote, please try again later');
      return;
    }
    dataUpdated();
  }

  return (
    <article className={style.card}>
      <p className={style.content}>{content}</p>

      <div className={style.flexBig}>
        <div className={style.votesWrapper}>
          <Icon
            icon="fa-thumbs-o-up"
            onClick={() => upVoteHandler(answer_id)}
          />
          <p className={style.votes}>{!votes ? 0 : votes}</p>
          <Icon
            icon="fa-thumbs-o-down"
            onClick={() => downVoteHandler(answer_id)}
          />
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
          Update{' '}
          <Link to={`editAnswer/${answer_id}`}>
            <Icon
              icon="fa-pencil"
              size="small"
            />
          </Link>
        </span>
        {/* <ButtonIcon onClick={() => deleteHandler(question_id)}>
          <Icon icon="fa-trash" size="small" /> Delete
        </ButtonIcon> */}
        <span>
          Delete{' '}
          <Icon
            icon="fa-trash"
            size="small"
            onClick={() => onDelete(answer_id)}
          />
        </span>
      </div>
    </article>
  );
}

AnswerCard.propTypes = {
  content: PropTypes.string,
};

export default AnswerCard;
