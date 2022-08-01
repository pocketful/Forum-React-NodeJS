import style from './Image.module.css';

function Image({ srcText, altText }) {
  return <img className={style.image} src={srcText} alt={altText} />;
}

export default Image;
