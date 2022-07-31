import Button from '../../UI/Button/Button';
import style from './UserForm.module.css';

function LoginForm() {
  return (
    <>
      <h2>Have an account?</h2>
      <form className={style.wrapper}>
        <div className={style.group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={style.input}
          />
        </div>
        <div className={style.group}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={style.input}
          />
        </div>
        <div className={style.group}>
          <Button>Sign In</Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
