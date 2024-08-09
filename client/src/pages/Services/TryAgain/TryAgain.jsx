import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { pathnames } from 'constants/pathnames';
import { Button } from 'components/Button';
import styles from 'pages/Services/TryAgain/TryAgain.scss';

export const TryAgain = () => {
  const { mainPage } = pathnames;
  const { push } = useHistory();

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Try that again</h1>
        <p className={styles.text}>Page could not be loaded. Please try again later.</p>
        <div className={styles.buttonsWrapper}>
          <Button className={styles.btn} buttonContent='Reload page' onClick={() => window.location.reload()} />
          <Button
            className={cn(styles.btn, styles.mainPageBtn)}
            buttonContent='Try later'
            onClick={() => push(mainPage)}
          />
        </div>
      </div>
    </section>
  );
};
