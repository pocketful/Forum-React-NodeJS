import style from './VoteButtons.module.css';
import { useState } from 'react';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import { getFetch, postFetch, updateOneFetch } from '../../../helpers/fetch';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';
import PropTypes from 'prop-types';

function VoteButtons(props) {
  const { endpoint, answerId, votes, myVote, onDataUpdated } = props;

  const [loading, setLoading] = useState(false);

  const { token } = useAuthCtx();

  //console.log('VoteButtons votes:', votes);
  console.log('VoteButtons myVote:', myVote);

  async function voteHandler(answerId, voteValue) {
    console.log('clicked answerId', answerId);
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    setLoading(true);
    // Check if the user has already voted
    try {
      const userVote = await getFetch(`${endpoint}/${answerId}/vote`, token);

      // If user has already voted, update their vote
      if (userVote.length > 0) {
        const result = await updateOneFetch(
          `${endpoint}/${answerId}/vote`,
          { vote: voteValue },
          token,
        );
        if (!result.success) {
          toast.error('We cannot include your vote, please try again later');
          return;
        }

        // If user hasn't voted, insert their vote
      } else {
        const result = await postFetch(
          `${endpoint}/${answerId}/vote`,
          { vote: voteValue },
          token,
        );
        if (!result.success) {
          toast.error('We cannot update your vote, please try again later');
          return;
        }
      }
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
        icon="fa-thumbs-o-up"
        size="medium"
        onClick={() => voteHandler(answerId, 1)}
        isDisabled={loading}
        label="Like"
      />
      <p className={style.votes}>{!votes ? 0 : votes}</p>
      <TextIconButton
        icon="fa-thumbs-o-down"
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
  onDataUpdated: PropTypes.func.isRequired,
};

export default VoteButtons;
