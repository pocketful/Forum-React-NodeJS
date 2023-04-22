import style from './VoteButtons.module.css';
import { useState } from 'react';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import { deleteFetch, postFetch, updateOneFetch } from '../../../helpers/fetch';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';
import PropTypes from 'prop-types';

function VoteButtons(props) {
  const { endpoint, answerId, votes, myVote, onDataUpdated } = props;

  const [loading, setLoading] = useState(false);
  const [userVote, setUserVote] = useState(myVote); // null: Not voted, 1: Upvoted, -1: Downvoted

  const { token } = useAuthCtx();

  console.log('votes:', votes);
  console.log('myVote:', myVote);
  console.log('userVote:', userVote);

  // DELETE. If user has already voted, and clicked on the same icon again, delete their vote
  async function deleteVoteHandler(answerId) {
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    setLoading(true);
    try {
      const voteResult = await deleteFetch(
        `${endpoint}/${answerId}/vote`,
        token,
      );
      if (!voteResult.success) {
        toast.error('We cannot delete your vote, please try again later');
        return;
      }
      setUserVote(null);
      onDataUpdated();
    } catch (err) {
      console.log('err in deleteVoteHandler:', err);
    } finally {
      setLoading(false);
    }
  }

  // POST or PATCH a vote
  async function voteHandler(answerId, voteValue) {
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    setLoading(true);
    try {
      if (userVote === voteValue) {
        return deleteVoteHandler(answerId);
      } else {
        const voteResult = userVote
          ? // If user has already voted, (and clicked on the different icon), update their vote
            await updateOneFetch(
              `${endpoint}/${answerId}/vote`,
              { vote: voteValue },
              token,
            )
          : // If user hasn't voted, (and clicked on any icon), instert their vote
            await postFetch(
              `${endpoint}/${answerId}/vote`,
              { vote: voteValue },
              token,
            );
        if (!voteResult.success) {
          toast.error('We cannot include your vote, please try again later');
          return;
        }
      }
      setUserVote(voteValue);
      onDataUpdated();
    } catch (err) {
      console.log('err in voteHandler:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.votesWrapper}>
      <TextIconButton
        icon={`fa-thumbs${userVote === 1 ? '' : '-o'}-up`}
        size="medium"
        onClick={() => voteHandler(answerId, 1)}
        isDisabled={loading}
        label="Like"
      />
      <p className={style.votes}>{!votes ? 0 : votes}</p>
      <TextIconButton
        icon={`fa-thumbs${userVote === -1 ? '' : '-o'}-down`}
        size="medium"
        onClick={() => voteHandler(answerId, -1)}
        isDisabled={loading}
        label="Dislike"
      />
    </div>
  );
}

VoteButtons.propTypes = {
  endpoint: PropTypes.string.isRequired,
  answerId: PropTypes.number.isRequired,
  votes: PropTypes.string,
  myVote: PropTypes.oneOf([1, -1, null]),
  onDataUpdated: PropTypes.func.isRequired,
};

export default VoteButtons;
