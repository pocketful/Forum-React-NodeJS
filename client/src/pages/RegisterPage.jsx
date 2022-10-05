import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/Forms/User/RegisterForm';

function RegisterPage() {
  const history = useHistory();
  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSuccessRegister={() => history.replace('/login')}/>
    </>
  );
}

export default RegisterPage;
