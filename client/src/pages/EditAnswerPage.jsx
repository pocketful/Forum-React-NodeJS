import { useHistory } from 'react-router-dom';
import EditAnswerForm from '../components/Forms/Answers/EditAnswerForm';

function EditAnswerPage() {
  const history = useHistory();
  return (
    <>
      <h1>Edit answer</h1>
      <EditAnswerForm onSuccessPost={() => history.goBack()} />
    </>
  );
}

export default EditAnswerPage;
