import { useState } from 'react';
import logo from 'assets/icons/logos/ecds-extended.svg';
import { LogoDropdown } from 'components/Dropdown/Logo';
import styles from 'pages/AboutUs/Logos/Logos.scss';

export const Logos = () => {
  const [logos, setLogos] = useState([
    { id: 1, name: 'European Confederation of Dance Sports', paths: { svg: logo }, alt: 'logo' },
  ]);

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
