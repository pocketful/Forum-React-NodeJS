import style from './SingleQuestionCard.module.css';
import PropTypes from 'prop-types';
import formattedDate from '../../../helpers/date';
import Image from '../../UI/Image/Image';
import { Link, useHistory } from 'react-router-dom';
import { deleteFetch } from '../../../helpers/fetch';
import toast from 'react-hot-toast';
import { useAuthCtx } from '../../../store/authContext';
import TextIconButton from '../../UI/TextIconButton/TextIconButton';

function SingleQuestionCard(props) {
  const {
    question_id,
    title,
    content,
    created_at,
    updated_at,
    username,
    email,
    image,
  } = props.data;

  const { token, userEmail } = useAuthCtx();
  const history = useHistory();

  const createdAt = formattedDate(created_at);
  const updatedAt = formattedDate(updated_at);

  async function deleteQueHandler(questionId) {
    if (!token) {
      toast.error('You have to login first.');
      return;
    }
    window.alert('Are you sure you want to delete this question?');
    try {
      const deleteResult = await deleteFetch(`questions/${questionId}`, token);
      if (!deleteResult.success) {
        toast.error(deleteResult.message);
        return;
      }
      toast.success(deleteResult.message);
      setTimeout(() => {
        history.push('/');
      }, 3000);
    } catch (err) {
      console.error('err in deleteQueHandler:', err);
    }
  }

  const isLoggedInUserPost = userEmail === email;

  return (
    <article className={style.card}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.content}>{content}</p>
      <div className={style.flex}>
        <div className={style.dates}>
          <p className={style.created}>
            {`asked on `}
            {createdAt} by <em className={style.username}>{username}</em>
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
      {isLoggedInUserPost && (
        <div className={style.updateDeleteWrapper}>
          <Link to={`/${question_id}/editQuestion`}>
            <TextIconButton text="Update" icon="fa-pencil" />
          </Link>
          <TextIconButton
            text="Delete"
            icon="fa-trash"
            onClick={() => deleteQueHandler(question_id)}
          />
        </div>
      )}
    </article>
  );
}

SingleQuestionCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default SingleQuestionCard;
