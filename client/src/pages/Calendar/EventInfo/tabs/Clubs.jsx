import { ImageComponent } from 'components/Image';
import logoPlaceholder from 'assets/icons/club-logo-placeholder.png';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Clubs = ({ data: { clubs } }) => {
  return (
    <>
      <div className={styles.totalsHeader}>
        <span className={styles.totals}>Totals:</span>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Clubs</span>
            <span>4</span>
          </div>
          <div className={styles.stat}>
            <span>Couples</span>
            <span>26</span>
          </div>
          <div className={styles.stat}>
            <span>Solo</span>
            <span>38</span>
          </div>
          <div className={styles.stat}>
            <span>Entries</span>
            <span>60 / 83</span>
          </div>
        </div>
      </div>
      <div className={styles.club}>
        <ImageComponent
          src={clubs?.[0]?.logo?.url || logoPlaceholder}
          alt={clubs?.[0]?.logo?.alternativeText || 'Club logo placeholder'}
          placeholder={clubs?.[0]?.logo?.placeholder}
          className={styles.clubLogo}
        />
        <div className={styles.clubInfo}>
          <h4 className={styles.name}>Club Name some name very long name </h4>
          <span>Country, City</span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Couples</span>
            <span>26</span>
          </div>
          <div className={styles.stat}>
            <span>Solo</span>
            <span>38</span>
          </div>
          <div className={styles.stat}>
            <span>Entries</span>
            <span>60 / 83</span>
          </div>
        </div>
      </div>
      <hr className={styles.line} />
    </>
  );
};
