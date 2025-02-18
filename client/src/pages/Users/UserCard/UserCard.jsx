import cn from 'classnames';
import { ImageComponent } from 'components/Image';
import styles from 'pages/Users/UserCard/UserCard.scss';

export const UserCard = ({ role, user, dancerClasses }) => {
  return (
    <li className={styles.card}>
      {user?.photo?.url ? (
        <ImageComponent className={styles.photo} src={user?.photo?.url} />
      ) : (
        <div className={cn(styles.photo, styles.placeholder)} />
      )}
      <div className={styles.cardInfo}>
        <h2 className={styles.name}>
          {user.name} {user.surname}
        </h2>
        {role === 'dancers' && user?.level && <p className={styles.level}>{dancerClasses?.[user.level]}</p>}
      </div>
    </li>
  );
};
