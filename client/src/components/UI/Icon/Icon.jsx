import style from './Icon.module.css';

function Icon({ icon, onClick, size = 'normal' }) {
  return (
    <i
      onClick={onClick}
      className={`fa ${icon} ${style[size]}`}
      aria-hidden="true"
    ></i>
  );
}

export default Icon;
