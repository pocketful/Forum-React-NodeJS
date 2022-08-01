import { Link, NavLink } from 'react-router-dom';
import style from './Header.module.css';
import Flex from '../UI/Flex/Flex';
import logo from '../../assets/img/logo.png';
import Container from '../UI/Container/Container';
import { useAuthCtx } from '../../store/authContext';

function Header() {
  const { isLoggedIn, logout } = useAuthCtx();
  return (
    <header className={style.header}>
      <Container>
        <Flex jc="spaceBetween" dir="column">
          {/* <div className={style.flex}> */}
          <Link to="/">
            <img className={style.img} src={logo} alt="logo" />
          </Link>
          <nav className={style.nav}>
            {isLoggedIn && (
              <>
                <NavLink exact to="/" activeClassName={style.active}>
                  Questions
                </NavLink>
                <NavLink to="/add" activeClassName={style.active}>
                  Ask Question
                </NavLink>
                <Link to="/login" onClick={logout}>
                  Logout
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavLink to="/login" activeClassName={style.active}>
                  Login
                </NavLink>
                <NavLink to="/register" activeClassName={style.active}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </Flex>
        {/* </div> */}
      </Container>
    </header>
  );
}

export default Header;
