import judgePlaceholder from 'assets/icons/judge-photo-placeholder.png';
import { ImageComponent } from 'components/Image';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Judges = ({ event: { judges } }) => {
  return (
    <>
      <div className={styles.totalsHeader}>
        <span className={styles.totals}>Totals:</span>
        <div className={styles.stat}>
          <span>Judges</span>
          <span>5</span>
        </div>
      </div>
      <div className={styles.judge}>
        <ImageComponent
          src={judges?.[0]?.photo?.url || judgePlaceholder}
          alt={judges?.[0]?.photo?.alternativeText || 'Judge photo placeholder'}
          placeholder={judges?.[0]?.photo?.placeholder}
          className={styles.judgePhoto}
        />
        <div className={styles.judgeInfo}>
          <h4 className={styles.name}>Club Name some name</h4>
          <span>Country, City</span>
          <span className={styles.judgeCategory}>Category</span>
        </div>
      </div>
      <hr className={styles.line} />
    </>
  );
};
