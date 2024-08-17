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
  });

  return external ? (
    <a className={linkClass} href={path} target='_blank' rel='noopener noreferrer'>
      {children ?? content}
      {(arrowRight || arrowLeft) && <img className={styles.arrow} src={arrowSrc ?? arrowIcon} alt='arrow right' />}
    </a>
  ) : (
    <RouterLink className={linkClass} to={path}>
      {children ?? content}
      {(arrowRight || arrowLeft) && <img className={styles.arrow} src={arrowSrc ?? arrowIcon} alt='arrow right' />}
    </RouterLink>
  );
};
