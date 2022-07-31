import style from './Flex.module.css';
import PropTypes from 'prop-types';

function Flex({ children, jc }) {
  return <div className={style[jc]}>{children}</div>;
}

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  jc: PropTypes.oneOf([
    'spaceBetween',
    'spaceAround',
    'spaceEvenly',
    'flexStart',
    'flexEnd',
    'center',
  ]),
};

export default Flex;
