import Button from '../../UI/Button/Button';
import style from './UserForm.module.css';

function RegisterForm() {
  return (
    <>
      <h2>Don't have an account?</h2>
      <form className={style.wrapper}>
        <div className={style.group}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={style.input}
          />
        </div>
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
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            className={style.input}
          />
        </div>
        <div className={style.group}>
          <input
            type="text"
            name="image"
            placeholder="Avatar image url"
            className={style.input}
          />
        </div>
        <div className={style.group}>
          <Button>Sign Up</Button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
