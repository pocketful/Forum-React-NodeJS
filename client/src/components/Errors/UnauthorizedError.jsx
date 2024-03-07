import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import style from './UnauthorizedError.module.css';

function UnauthorizedError() {
  return (
    <div className={style.wrapper}>
      <div className={style.textWrapper}>
        <p className={style.text}>
          The page you're trying to reach is for members only. Please register
          or login.
        </p>
      </div>
      <div className={style.btnWrapper}>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedError;
