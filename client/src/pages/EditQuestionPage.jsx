import { useHistory } from 'react-router-dom';
import EditQuestionForm from '../components/Forms/Questions/EditQuestionForm';

function EditQuestionPage() {
  const history = useHistory();
  return (
    <>
      <h1>Question</h1>
      <EditQuestionForm onSuccessPost={() => history.goBack()} />
    </>
  );
}

export default EditQuestionPage;
