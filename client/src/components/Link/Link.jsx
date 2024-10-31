import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import arrowIcon from 'assets/icons/arrow-right-purple.svg';
import styles from 'components/Link/Link.scss';

export const Link = ({
  children,
  className,
  content,
  path,
  external,
  arrowRight,
  arrowLeft,
  active,
  arrowSrc,
  pinkButtonStyle,
  buttonStyle,
  hoverStyle,
  noStyle,
}) => {
  const linkClass = cn(className, {
    [styles.link]: !noStyle,
    [styles.external]: external,
    [styles.toLeft]: arrowLeft,
    [styles.toRight]: arrowRight,
    [styles.button]: buttonStyle,
    [styles.pinkButton]: pinkButtonStyle,
    [styles.active]: active,
    [styles.default]: hoverStyle,
  });

  return external ? (
    <a className={linkClass} href={path} tabIndex={active ? -1 : 0} target='_blank' rel='noopener noreferrer'>
      {children ?? content}
      {(arrowRight || arrowLeft) && <img className={styles.arrow} src={arrowSrc ?? arrowIcon} alt='arrow right' />}
    </a>
  ) : (
    <RouterLink className={linkClass} to={path} tabIndex={active ? -1 : 0}>
      {children ?? content}
      {(arrowRight || arrowLeft) && <img className={styles.arrow} src={arrowSrc ?? arrowIcon} alt='arrow right' />}
    </RouterLink>
  );
};
