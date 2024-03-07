import { Link, NavLink } from 'react-router-dom';
import style from './Header.module.css';
import Flex from '../UI/Flex/Flex';
import logo from '../../assets/img/logo.webp';

import Container from '../UI/Container/Container';
import { useAuthCtx } from '../../store/authContext';

function Header() {
  const { isLoggedIn, logout } = useAuthCtx();
  return (
    <header className={style.header}>
      <Container>
        <Flex jc="spaceBetween" dir="column">
          <Link to="/">
            <img className={style.img} src={logo} alt="logo" />
          </Link>
          <nav className={style.nav}>
            <>
              <NavLink exact to="/" activeClassName={style.active}>
                Questions
              </NavLink>
              <NavLink to="/add" activeClassName={style.active}>
                Ask Question
              </NavLink>
            </>
            {isLoggedIn && (
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
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
      </Container>
    </header>
  );
}

export default Header;
