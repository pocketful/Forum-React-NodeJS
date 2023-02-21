import { getFetch, postFetch, updateOneFetch, } from '../../../helpers/fetch';
import style from './AnswerCard.module.css';
import PropTypes from 'prop-types';
import formatDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import Icon from '../../UI/Icon/Icon';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';


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
    email,
    image,
    onDelete,
    onDataUpdated,
  } = props;

  const { token, userEmail } = useAuthCtx();

  const createdAt = formatDate(created_at);
  const updatedAt = formatDate(updated_at);


  async function voteHandler(answerId, voteValue) {
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    // Check if the user has already voted for this answer
    const userVote = await getFetch(`answers/${answerId}/vote`, token);

    // If user has already voted, update their vote
    if (userVote.length > 0) {
      const result = await updateOneFetch(`answers/${answerId}/vote`, { vote: voteValue }, token);
      if (!result.success) {
        toast.error('We cannot include your vote, please try again later');
        return;
      }

      // If user hasn't voted, insert their vote
    } else {
      const result = await postFetch(`answers/${answerId}/vote`, { vote: voteValue }, token);
      if (!result.success) {
        toast.error('We cannot update your vote, please try again later');
        return;
      }
    }
    onDataUpdated();
  }

  const isLoggedInUserPost = userEmail === email;

  return (
    <article className={style.card}>
      <p className={style.content}>{content}</p>

      <div className={style.flexBig}>
        <div className={style.votesWrapper}>
          <Icon
            icon="fa-thumbs-o-up"
            onClick={() => voteHandler(answer_id, 1)}
          />
          <p className={style.votes}>{!votes ? 0 : votes}</p>
          <Icon
            icon="fa-thumbs-o-down"
            onClick={() => voteHandler(answer_id, -1)}
          />
        </div>

        <div className={style.flex}>
          <div className={style.dates}>
            <p className={style.created}>
              {`asked on `}
              {createdAt} by{' '}
              <em className={style.username}>{username}</em>
            </p>
            {updated_at !== null && (
              <p className={style.updated}>
                {`updated at `}
                {updatedAt}
              </p>
            )}
          </div>
          <Image srcText={image} altText={`${username} profile image`} />
        </div>
      </div>

      {isLoggedInUserPost && (
        <div className={style.updateDeleteWrapper}>
          <Link to={`editAnswer/${answer_id}`}>
            <TextIconButton
              text="Update"
              icon="fa-pencil"
            />
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
