import { useEffect, useState } from 'react';
import { getFetch, postFetch } from '../../../helpers/fetch';
import style from './AnswerCard.module.css';
import PropTypes from 'prop-types';
import formattedDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import Icon from '../../UI/Icon/Icon';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';

// answer_id, user_id, question_id, content, created_at, updated_at, archived, votes, username, email, image
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
    dataUpdated,
  } = props;
  const [votesArr, setVotesArr] = useState([]);
  const { token, userEmail } = useAuthCtx();

  const createdAtFormatted = formattedDate(created_at);
  const updatedAtFormatted = formattedDate(updated_at);

  async function getVotes() {
    try {
      const data = await getFetch(`/answerss/${answer_id}`, token);
      if (data) setVotesArr(data);
    } catch (err) {
      console.error('error in getVotes: ', err);
    }
  }

  useEffect(() => {
    getVotes();
  }, []);

  async function upVoteHandler(answerId) {
    if (!token) toast.error('You have to login first.');
    // await getVotes();
    
    // const isUserVote = votesArr.find((v) => v.email === userEmail);
    // setVotesArr(isUserVote);
    // console.log('userEmail', userEmail);
    // console.log('isUserVote', isUserVote);
    // console.log('votesArr', votesArr);
    // if (isUserVote) {
      // console.log('isUserVote true');
      // const result = await updateOneFetch(
      //   `answerss/${answerId}`,
      //   { vote: 0 },
      //   token,
      // );
      // if (!result.success) {
      //   toast.error('We cannot include your vote, please try again later');
      //   return;
      // }
      // dataUpdated();
    //   toast.error('You already voted');
    //   return;
    // }
    const result = await postFetch(`answers/${answerId}`, { vote: 1 }, token);
    if (!result.success) {
      toast.error('We cannot include your vote, please try again later');
      return;
    }
    dataUpdated();
  }

  async function downVoteHandler(answerId) {
    if (!token) toast.error('You have to login first.');
    // await getVotes();
    // const isUserVote = votesArr.find((v) => v.email === userEmail);
    // setVotesArr(isUserVote);
    // console.log('userEmail', userEmail);
    // console.log('isUserVote', isUserVote);
    // console.log('votesArr', votesArr);
    // if (isUserVote) {
      // console.log('isUserVote true');
      // const result = await updateOneFetch(
      //   `answerss/${answerId}`,
      //   { vote: 0 },
      //   token,
      // );
      // if (!result.success) {
      //   toast.error('We cannot include your vote, please try again later');
      //   return;
      // }
      // dataUpdated();
    //   toast.error('You already voted');
    //   return;
    // }
    const result = await postFetch(`answers/${answerId}`, { vote: -1 }, token);
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
        {userEmail === email && (
          <>
            <span>
              Update{' '}
              <Link to={`editAnswer/${answer_id}`}>
                <Icon icon="fa-pencil" size="small" />
              </Link>
            </span>
            <span>
              Delete{' '}
              <Icon
                icon="fa-trash"
                size="small"
                onClick={() => onDelete(answer_id)}
              />
            </span>
          </>
        )}
      </div>
    </article>
  );
}

AnswerCard.propTypes = {
  content: PropTypes.string,
};

export default AnswerCard;
