import { useHistory } from 'react-router-dom';
import AddQuestionForm from '../components/Forms/Questions/AddQuestionForm';

function AddQuestionPage() {
  const history = useHistory();
  return (
    <>
      <h1>Question</h1>
      <AddQuestionForm onSuccessPost={() => history.push('/')} />
    </>
  );
}

export default AddQuestionPage;
