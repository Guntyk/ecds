import { useHistory } from 'react-router-dom';
import { dancesTypes } from 'constants/dancesTypes';
import { Container } from 'components/Container';
import styles from 'pages/Main/blocks/DancesTypes/DancesTypes.scss';

export const DancesTypes = () => {
  const { push } = useHistory();

  return (
    <section className={styles.block}>
      <Container>
        <ul className={styles.dances}>
          {dancesTypes.map(({ id, name, path, key }) => (
            <li className={styles.card} key={id} onClick={() => push(path)}>
              <p className={styles.name}>{name}</p>
              <div className={styles.cover} data-image={key} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
