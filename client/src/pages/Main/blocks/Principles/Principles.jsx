import cn from 'classnames';
import { principlesData } from 'constants/principlesData';
import { Container } from 'components/Container';
import styles from 'pages/Main/blocks/Principles/Principles.scss';

export const Principles = () => {
  return (
    <Container>
      <section className={styles.block}>
        <h2 className={styles.title}>Our principles</h2>
        <ul className={styles.principlesList}>
          {principlesData.map(({ id, title, text, conclusion, iconsColor }) => (
            <li className={styles.principle} key={id}>
              <div className={cn(styles.circles, styles[iconsColor])}>
                <span className={styles.circle} />
                <span className={styles.circle} />
                <span className={styles.circle} />
              </div>
              <h3 className={styles.principleTitle}>{title}</h3>
              <p className={cn(styles.text, styles.textMain)}>{text}</p>
              <p className={styles.text}>{conclusion}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
};
