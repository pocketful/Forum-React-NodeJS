import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import style from './Errors.module.css';

function NotFoundError() {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>404</p>
      <p className={style.subtitle}>Page not found</p>
      <p className={style.text}>
        The website you were trying to reach couldn't be found on the server.
      </p>
      <div className={style.btnWrapper}>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundError;
