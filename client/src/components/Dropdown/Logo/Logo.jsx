import { useState } from 'react';
import cn from 'classnames';
import { ImageComponent } from 'components/Image';
import { Button } from 'components/Button';
import { Arrow } from 'components/Arrow';
import dropdownStyles from 'components/Dropdown/Dropdown.scss';
import styles from 'components/Dropdown/Logo/Logo.scss';

export const LogoDropdown = ({ logo: { name, logos } }) => {
  const [downloadedLogosIds, setDownloadedLogosIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = (id, url, desiredFileName) => {
    const externalUrl = process.env.REACT_APP_BASE_API_URL + url;
    const filename = desiredFileName || externalUrl.substring(externalUrl.lastIndexOf('/') + 1).split('?')[0];

    fetch(externalUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setDownloadedLogosIds((prevIds) => [...prevIds, id]);
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
            const coverImg =
              images.find(({ ext }) => ext === '.svg') ||
              images.find(({ ext }) => ext === '.png') ||
              images.find(({ ext }) => ext === '.jpg');

            return (
              <li className={styles.logo} key={id}>
                <ImageComponent
                  className={styles.logoWrapper}
                  placeholder={coverImg?.placeholder}
                  src={`${process.env.REACT_APP_BASE_API_URL}${coverImg?.url}`}
                  alt={coverImg?.alternativeText}
                  fit='contain'
                />
                <div className={styles.buttonsWrapper}>
                  {images.map(({ id, name, ext, url }) => (
                    <Button
                      className={styles.downloadBtn}
                      onClick={() => handleDownload(id, url, name)}
                      key={id}
                      ghostStyle
                      small
                      disabled={downloadedLogosIds.includes(id)}
                    >
                      <span className={styles.downloadIcon} />
                      Download in {ext.slice(1)}
                    </Button>
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
