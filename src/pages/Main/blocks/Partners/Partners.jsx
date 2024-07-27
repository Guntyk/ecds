import { Container } from 'components/Container';
import { Button } from 'components/Button';
import ddb from 'assets/icons/logos/ddb.png';
import styles from 'pages/Main/blocks/Partners/Partners.scss';
import { Link } from 'components/Link';

export const Partners = () => {
  return (
    <Container>
      <section className={styles.block}>
        <h2 className={styles.title}>Our sponsors & partners</h2>
        <ul className={styles.partners}>
          {Array.from({ length: 8 }).map((_, index) => (
            <li className={styles.partner} key={index}>
              <img src={ddb} alt='ddb platform' />
              <Link className={styles.moreBtn} text='More about' path='https://google.com' external />
            </li>
          ))}
        </ul>
        <aside className={styles.donate}>
          <h4 className={styles.text}>
            If you like our idea, support it with money.
            <br />
            Any amount will go to support the dance movement in Europe
          </h4>
          <Button buttonContent='Donate' className={styles.donateBtn} />
        </aside>
      </section>
    </Container>
  );
};