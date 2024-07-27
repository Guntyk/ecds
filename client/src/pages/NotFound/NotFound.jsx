import { useHistory } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { Button } from 'components/Button';
import styles from 'pages/NotFound/NotFound.scss';

export const NotFound = () => {
  const { goBack, replace } = useHistory();
  const { mainPage } = pathnames;

  return (
    <article className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>This page does not exist</p>
      <div className={styles.buttonsWrapper}>
        <Button buttonContent='Go back' onClick={goBack} lightStyle />
        <Button buttonContent='Main page' onClick={() => replace(mainPage)} lightStyle />
      </div>
    </article>
  );
};
