import cn from 'classnames';
import { dancesTypes } from 'constants/dancesTypes';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import styles from 'pages/Main/blocks/DancesTypes/DancesTypes.scss';

export const DancesTypes = () => (
  <section className={styles.block}>
    <Container>
      <div className={styles.dances}>
        {dancesTypes.map(({ id, name, path, key, styleNames }) => (
          <Link className={styles.card} key={id} path={path} noStyle>
            <p className={cn(styles.name, styles[key])}>{name}</p>
            {styleNames && (
              <ul className={styles.styles}>
                {styleNames.map((style) => (
                  <li key={style}>{style}</li>
                ))}
              </ul>
            )}
            <div className={styles.cover} data-image={key} />
          </Link>
        ))}
      </div>
    </Container>
  </section>
);
