// import { Link } from 'react-router-dom';
// import Button from '../../UI/Button/Button';
import style from './EmptyArrError.module.css';
import PropTypes from 'prop-types';

function EmptyArrError({ name }) {
  return (
    <div className={style.wrapper}>
      <p className={style.text}>There are no {name} yet.</p>
    </div>
  );
}

EmptyArrError.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EmptyArrError;
