import { useState } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';
import { Arrow } from 'components/Arrow';
import dropdownStyles from 'components/Dropdown/Dropdown.scss';
import styles from 'components/Dropdown/Logo/Logo.scss';

export const LogoDropdown = ({ logo: { name, logos } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const query = {
    populate: { logos: { populate: { images: { fields: ['alternativeText', 'name', 'ext', 'url'] } } } },
  };

  const handleDownload = (url, desiredFileName) => {
    const filename = desiredFileName || url.substring(url.lastIndexOf('/') + 1).split('?')[0];

    console.log(filename);

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((err) => console.error('Error fetching file:', err));
  };

  return (
    <div className={dropdownStyles.dropdown}>
      <div className={cn(dropdownStyles.dropdownBtn, { [dropdownStyles.open]: isOpen })}>
        <span>{name}</span>
        <Arrow isOpen={isOpen} logoStyle onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className={cn(dropdownStyles.content, { [dropdownStyles.open]: isOpen })}>
        <ul className={dropdownStyles.contentInner}>
          {logos.map(({ id, images }) => {
            const img =
              images.find(({ ext }) => ext === '.svg') ||
              images.find(({ ext }) => ext === '.png') ||
              images.find(({ ext }) => ext === '.jpg');

            return (
              <li className={styles.logo} key={id}>
                <div className={styles.logoWrapper}>
                  <img src={`${process.env.REACT_APP_BASE_API_URL}${img?.url}`} alt={img?.alternativeText} />
                </div>
                <div className={styles.buttonsWrapper}>
                  {images.map(({ id, name, ext, url }) => (
                    <Button
                      className={styles.downloadBtn}
                      buttonContent={
                        <>
                          <span className={styles.downloadIcon} />
                          Download in {ext.replace('.', '')}
                        </>
                      }
                      onClick={() => handleDownload(process.env.REACT_APP_BASE_API_URL + url, name)}
                      key={id}
                      lightStyle
                    />
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
