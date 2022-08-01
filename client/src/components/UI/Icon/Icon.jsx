function Icon({ icon, onClick }) {
  return <i onClick={onClick} className={`fa ${icon}`} aria-hidden="true"></i>;
}

export default Icon;
