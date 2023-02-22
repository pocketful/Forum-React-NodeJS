import style from './VoteButtons.module.css';
import { useAuthCtx } from '../../../store/authContext';
import toast from 'react-hot-toast';
import { getFetch, postFetch, updateOneFetch } from '../../../helpers/fetch';
import Icon from '../../UI/Icon/Icon';

function VoteButtons(props) {
  const { endpoint, id, votes, onDataUpdated } = props;

  const { token } = useAuthCtx();

  async function voteHandler(id, voteValue) {
    if (!token) {
      toast.error('Only registered users can vote.');
      return;
    }
    // Check if the user has already voted
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
  }

  return (
    <div className={style.votesWrapper}>
      <Icon icon="fa-thumbs-o-up" onClick={() => voteHandler(id, 1)} />
      <p className={style.votes}>{!votes ? 0 : votes}</p>
      <Icon icon="fa-thumbs-o-down" onClick={() => voteHandler(id, -1)} />
    </div>
  );
}

export default VoteButtons;
