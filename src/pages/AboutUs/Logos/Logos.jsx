import { useState } from 'react';
import logo from 'assets/icons/logos/ecds-extended.svg';
import logo2 from 'assets/icons/logos/ecds.svg';
import { LogoDropdown } from 'components/Dropdown/Logo';
import styles from 'pages/AboutUs/Logos/Logos.scss';

export const Logos = () => {
  const [logos, setLogos] = useState([
    {
      id: 1,
      name: 'European Confederation of Dance Sports',
      images: [
        { id: 1, paths: { svg: logo, png: logo }, alt: 'logo extended' },
        { id: 2, paths: { svg: logo2 }, alt: 'logo small' },
      ],
    },
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