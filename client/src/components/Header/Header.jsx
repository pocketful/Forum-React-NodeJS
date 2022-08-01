import { Link, NavLink } from 'react-router-dom';
import style from './Header.module.css';
import Flex from '../UI/Flex/Flex';
import logo from '../../assets/img/logo.png';
import Container from '../UI/Container/Container';

function Header() {
  return (
    <header className={style.header}>
      <Container>
      <Flex jc="spaceBetween" dir="column">
        {/* <div className={style.flex}> */}
          <Link to="/">
            <img className={style.img} src={logo} alt="logo" />
          </Link>
          <nav className={style.nav}>
            <NavLink exact to="/" activeClassName={style.active}>
              Questions
            </NavLink>
            <NavLink to="/add" activeClassName={style.active}>
              Ask Question
            </NavLink>
            <NavLink to="/login" activeClassName={style.active}>
              Login
            </NavLink>
            <NavLink to="/register" activeClassName={style.active}>
              Register
            </NavLink>
          </nav>
        </Flex>
        {/* </div> */}
      </Container>
    </header>
  );
}

export default Header;
