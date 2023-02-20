import style from './Icon.module.css';

function Icon({ icon, size = 'normal', onClick }) {
  return (
    <i
      className={`fa ${icon} ${style[size]}`}
      onClick={onClick}
      aria-hidden="true"
    ></i>
  );
}

export default Icon;
