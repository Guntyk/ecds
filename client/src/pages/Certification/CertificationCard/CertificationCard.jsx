import { formatDateToMMYYYY } from 'helpers/formatDateToMMYYYY';
import { Button } from 'components/Button';
import certificate from 'assets/icons/certificate.svg';
import styles from 'pages/Certification/CertificationCard/CertificationCard.scss';

export const CertificationCard = ({ user: { name, photo, certificationDate } }) => {
  console.log(photo);
  return (
    <li className={styles.card}>
      <img className={styles.photo} src={photo ?? 'https://placehold.co/160'} alt='photo' />
      <h2 className={styles.name}>{name}</h2>
      <time className={styles.date} dateTime={certificationDate}>
        <img src={certificate} alt='certificate' />
        {formatDateToMMYYYY(certificationDate)}
      </time>
      <Button className={styles.moreBtn} noStyle>
        More information
        <span className={styles.arrow} />
        <span className={styles.arrow} />
      </Button>
    </li>
  );
};
