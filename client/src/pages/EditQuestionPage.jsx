import { useHistory } from 'react-router-dom';
import EditQuestionForm from '../components/Forms/Questions/EditQuestionForm';

function EditQuestionPage() {
  const history = useHistory();
  return (
    <>
      <h1>Edit question</h1>
      <EditQuestionForm onSuccessPost={() => history.goBack()} />
    </>
  );
}

export default EditQuestionPage;
