import style from './VoteButtons.module.css';
import { useState } from 'react';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import { deleteFetch, postFetch, updateOneFetch } from '../../../helpers/fetch';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';
import PropTypes from 'prop-types';

/*
  DELETE a vote. If user has already voted, and clicked on the same icon again
  POST a vote. If user hasn't voted, and clicked on any icon
  PATCH a vote. If user has already voted and clicked on the different icon
*/

function VoteButtons(props) {
  const { endpoint, answerId, votes, myVote, onDataUpdated } = props;

  const [loading, setLoading] = useState(false);
  const [userVote, setUserVote] = useState(myVote); // null: Not voted, 1: Upvoted, -1: Downvoted

  const { token } = useAuthCtx();

  async function handleVote(answerId, voteValue) {
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    setLoading(true);

    try {
      const voteAction = determineVoteAction(voteValue);
      const voteUrl = `${endpoint}/${answerId}/vote`;
      const voteResult = await executeVoteAction(
        voteAction,
        voteUrl,
        voteValue,
      );

      if (!voteResult.success) {
        handleError(voteAction);
        return;
      }

      updateVoteState(voteAction, voteValue);
      onDataUpdated();
    } catch (err) {
      console.log('Error in handleVote:', err);
    } finally {
      setLoading(false);
    }
  }

  function determineVoteAction(voteValue) {
    if (userVote === voteValue) {
      return 'delete';
    } else if (userVote === null) {
      return 'post';
    } else {
      return 'patch';
    }
  }

  async function executeVoteAction(action, voteUrl, voteValue) {
    switch (action) {
      case 'delete':
        return await deleteFetch(voteUrl, token);
      case 'post':
        return await postFetch(voteUrl, { vote: voteValue }, token);
      case 'patch':
        return await updateOneFetch(voteUrl, { vote: voteValue }, token);
      default:
        throw new Error('Invalid vote action');
    }
  }

  function handleError(action) {
    const operation = action === 'delete' ? 'remove' : 'record';
    toast.error(
      `We were unable to ${operation} your vote. Please try again later.`,
    );
  }

  function updateVoteState(action, voteValue) {
    setUserVote(action === 'delete' ? null : voteValue);
  }

  return (
    <div className={style.votesWrapper}>
      <TextIconButton
        icon={`fa-thumbs${userVote === 1 ? '' : '-o'}-up`}
        size="medium"
        onClick={() => handleVote(answerId, 1)}
        isDisabled={loading}
        label="Like"
        width="small"
      />
      <p className={style.votes}>{!votes ? 0 : votes}</p>
      <TextIconButton
        icon={`fa-thumbs${userVote === -1 ? '' : '-o'}-down`}
        size="medium"
        onClick={() => handleVote(answerId, -1)}
        isDisabled={loading}
        label="Dislike"
        width="small"
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
