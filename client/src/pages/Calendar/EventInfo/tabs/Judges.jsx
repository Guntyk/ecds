import { generateMediaURL } from 'helpers/generateMediaURL';
import { ImageComponent } from 'components/Image';
import judgePlaceholder from 'assets/icons/judge-photo-placeholder.png';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';
import React from 'react';

export const Judges = ({ event: { judges } }) => {
  return (
    <>
      <div className={styles.totalsHeader}>
        <span className={styles.totals}>Totals:</span>
        <div className={styles.stat}>
          <span>Judges</span>
          <span>{judges.length}</span>
        </div>
      </div>
      {judges.map(({ id, photo, name, surname, country, city }, index) => (
        <React.Fragment key={id}>
          <div className={styles.judge}>
            <ImageComponent
              src={generateMediaURL(photo?.formats?.thumbnail.url) || judgePlaceholder}
              alt={photo?.alternativeText || 'Judge photo placeholder'}
              placeholder={photo?.placeholder}
              className={styles.judgePhoto}
            />
            <div className={styles.judgeInfo}>
              <h4 className={styles.name}>
                {name} {surname}
              </h4>
              <span>
                {country}, {city}
              </span>
            </div>
          </div>
          {judges.length > index + 1 && <hr className={styles.line} />}
        </React.Fragment>
      ))}
    </>
  );
};
