import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import arrowIcon from 'assets/icons/arrow-right-purple.svg';
import styles from 'components/Link/Link.scss';

export const Link = ({ className, text, path, external, arrowRight, arrowLeft, active, buttonStyle, download }) => {
  const linkClass = cn(styles.link, className, {
    [styles.external]: external,
    [styles.toLeft]: arrowLeft,
    [styles.toRight]: arrowRight,
    [styles.button]: buttonStyle,
    [styles.active]: active,
    [styles.download]: download,
  });

  if (download) {
    return (
      <a className={linkClass} href={path} download>
        <span className={styles.downloadIcon} />
        {text}
      </a>
    );
  }

  return external ? (
    <a className={linkClass} href={path} target='_blank' rel='noopener noreferrer'>
      {text}
      {(arrowRight || arrowLeft) && <img className={styles.arrow} src={arrowIcon} alt='arrow right' />}
    </a>
  ) : (
    <RouterLink className={linkClass} to={path}>
      {text}
      {(arrowRight || arrowLeft) && <img className={styles.arrow} src={arrowIcon} alt='arrow right' />}
    </RouterLink>
  );
};
