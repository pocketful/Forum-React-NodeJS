import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import style from './ErrorPage.module.css';

function NotFoundPage() {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>404</p>
      <p className={style.subtitle}>Page not found</p>
      <p className={style.text}>
        The website you were trying to reach couldn't be found on the server.
      </p>
      <div className={style.btnWrapper}>
        <Link to="/login">
          <Button>Go to login page</Button>
        </Link>
        <Link to="/">
          <Button>Go to homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
