import { Route } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import UnauthorizedError from '../Errors/UnauthorizedError';

function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuthCtx();
  return <Route {...rest}>{isLoggedIn ? children : <UnauthorizedError />}</Route>;
}

export default PrivateRoute;
