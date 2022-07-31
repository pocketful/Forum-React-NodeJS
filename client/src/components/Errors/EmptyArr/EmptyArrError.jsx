import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import style from './EmptyArrError.module.css';
import PropTypes from 'prop-types';

function EmptyArrError({ name, link }) {
  return (
    <div className={style.wrapper}>
      <p className={style.text}>There are no {name} yet. Please add.</p>
      <Link to={link}>
        <Button>Go to add page</Button>
      </Link>
    </div>
  );
}

EmptyArrError.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default EmptyArrError;
