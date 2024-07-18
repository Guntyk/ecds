import { dancesTypes } from 'constants/dancesTypes';
import { Container } from 'components/Container';
import coverPlaceholder from 'assets/images/cover-placeholder.jpg';
import styles from 'components/DancesTypes/DancesTypes.scss';

export const DancesTypes = () => {
  return (
    <section className={styles.block}>
      <Container>
        <ul className={styles.dances}>
          {dancesTypes.map(({ id, name, image }) => (
            <li className={styles.card} key={id}>
              <p className={styles.name}>{name}</p>
              <img className={styles.cover} src={image?.src || coverPlaceholder} alt={image?.alt || 'placeholder'} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
