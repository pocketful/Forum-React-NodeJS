import { useHistory } from "react-router-dom";
import LoginForm from "../components/Forms/User/LoginForm";

function LoginPage() {
  const history = useHistory();
  return (
    <>
      <h1>Login</h1>
      <LoginForm onSuccessLogin={() => history.replace('/')}/>
    </>
  );
}

export default LoginPage;
