import { Link, NavLink } from 'react-router-dom';
import style from './Header.module.css';
import Flex from '../UI/Flex/Flex';
import logo from '../../assets/img/logo.png';

function Header() {
  return (
    <header className={style.header}>
      <Flex jc="spaceBetween">
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
    </header>
  );
}

export default Header;
