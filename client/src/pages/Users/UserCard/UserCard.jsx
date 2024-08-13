import { Button } from 'components/Button';
import { ImageComponent } from 'components/Image';
import styles from 'pages/Users/UserCard/UserCard.scss';

export const UserCard = ({ user: { name, level, photo } }) => {
  return (
    <li className={styles.card}>
      <ImageComponent className={styles.photo} src={photo} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.class}>{level} class</p>
      <Button className={styles.moreBtn} text='More information' noStyle>
        More information
        <span className={styles.arrow} />
        <span className={styles.arrow} />
      </Button>
    </li>
  );
};
