import style from './VoteButtons.module.css';
import { useState } from 'react';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import { getFetch, postFetch, updateOneFetch } from '../../../helpers/fetch';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';
import PropTypes from 'prop-types';

function VoteButtons(props) {
  const { endpoint, id, votes, onDataUpdated } = props;

  const [loading, setLoading] = useState(false);

  const { token } = useAuthCtx();

  async function voteHandler(id, voteValue) {
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    setLoading(true);
    // Check if the user has already voted
    try {
      const userVote = await getFetch(`${endpoint}/${id}/vote`, token);

      // If user has already voted, update their vote
      if (userVote.length > 0) {
        const result = await updateOneFetch(
          `${endpoint}/${id}/vote`,
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
          `${endpoint}/${id}/vote`,
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
        onClick={() => voteHandler(id, 1)}
        isDisabled={loading}
        label="Like"
      />
      <p className={style.votes}>{!votes ? 0 : votes}</p>
      <TextIconButton
        icon="fa-thumbs-o-down"
        size="medium"
        onClick={() => voteHandler(id, -1)}
        isDisabled={loading}
        label="Dislike"
      />
    </div>
  );
}

VoteButtons.propTypes = {
  endpoint: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  votes: PropTypes.string,
  onDataUpdated: PropTypes.func.isRequired,
};

export default VoteButtons;
