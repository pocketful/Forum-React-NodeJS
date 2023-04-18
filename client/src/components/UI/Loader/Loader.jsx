import style from './Loader.module.css';
import PropTypes from 'prop-types';

function Loader({ size = 'large' }) {
  return (
    <div className={style.loaderContainer}>
      <div className={`${style.loader} ${style[size]}`}></div>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
};

export default Loader;
