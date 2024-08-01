import { useState } from 'react';
import { LogoDropdown } from 'components/Dropdown/Logo';
import styles from 'pages/AboutUs/Logos/Logos.scss';
import * as qs from 'qs';

export const Logos = () => {
  const [logos, setLogos] = useState([]);
  const query = {
    populate: { logos: { populate: { images: { fields: ['alternativeText', 'name', 'ext', 'url', 'placeholder'] } } } },
  };

  console.log(qs.stringify(query));

  return (
    <div className={styles.dropdownsWrapper}>
      {logos.length > 0 ? (
        logos.map((logo) => <LogoDropdown logo={logo} key={logo.id} />)
      ) : (
        <p className={styles.text}>There is no logos available to download yet</p>
      )}
    </div>
  );
};
