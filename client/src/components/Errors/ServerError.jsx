import style from './Errors.module.css';

function ServerError() {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>500</p>
      <p className={style.subtitle}>Internal Server Error</p>
      <p className={style.text}>
        Sorry, servers are down, please try again later.
      </p>
    </div>
  );
}

export default ServerError;
