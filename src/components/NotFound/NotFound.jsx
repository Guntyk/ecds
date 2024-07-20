import { useHistory } from 'react-router-dom';
import { Button } from 'components/Button';
import styles from 'components/NotFound/NotFound.scss';
import { pathnames } from 'constants/pathnames';

export const NotFound = () => {
  const { goBack, replace } = useHistory();
  const { mainPage } = pathnames;

  return (
    <article className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>This page doesn't exist</p>
      <div className={styles.buttonsWrapper}>
        <Button buttonContent='Go back' onClick={goBack} lightStyle />
        <Button buttonContent='Main page' onClick={() => replace(mainPage)} lightStyle />
      </div>
    </article>
  );
};
