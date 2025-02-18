import cn from 'classnames';
import { formatDateToMMYYYY } from 'helpers/formatDateToMMYYYY';
import { ImageComponent } from 'components/Image';
import certificate from 'assets/icons/certificate.svg';
import styles from 'pages/Certification/CertificationCard/CertificationCard.scss';

export const CertificationCard = ({ user: { name, surname, photo, certificationDate, country }, countries }) => (
  <li className={styles.card}>
    {photo?.url ? (
      <ImageComponent className={styles.photo} src={photo?.url} />
    ) : (
      <div className={cn(styles.photo, styles.placeholder)} />
    )}
    <div className={styles.cardInfo}>
      <h2 className={styles.name}>
        {name} {surname}
      </h2>
      {country && <p className={styles.country}>{countries?.[country]}</p>}
      <time className={styles.date} dateTime={certificationDate}>
        <img src={certificate} alt='certificate' />
        {certificationDate ? formatDateToMMYYYY(certificationDate) : '—'}
      </time>
    </div>
  </li>
);
