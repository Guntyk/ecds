import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState } from 'react';
import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import dropdownStyles from 'components/Dropdown/General.scss';
import styles from 'components/Dropdown/Document/Document.scss';
import { Button } from 'components/Button';

export const DocumentDropdown = ({ document: { title, description, file } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = (url, desiredFileName) => {
    const filename = desiredFileName || url.substring(url.lastIndexOf('/') + 1).split('?')[0];

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

  const { name, ext, url } = file || {};

  return (
    <div className={dropdownStyles.dropdown}>
      <div
        className={cn(dropdownStyles.dropdownBtn, styles.dropdownBtn, {
          [dropdownStyles.open]: isOpen,
          [styles.open]: isOpen,
        })}
      >
        <span>{title}</span>
        <Arrow className={styles.arrow} onClick={() => setIsOpen(true)} expandStyle />
      </div>
      <div
        className={cn(dropdownStyles.content, {
          [dropdownStyles.open]: isOpen,
        })}
      >
        <div className={cn(dropdownStyles.contentInner, styles.contentInner)}>
          <div className={styles.text}>
            <BlocksRenderer content={description} />
          </div>
          <div className={styles.buttonsWrapper}>
            <Button className={styles.openBtn} onClick={() => handleDownload(url, name)}>
              Download in {ext.slice(1).toUpperCase()}
            </Button>
            <Arrow isOpen={true} onClick={() => setIsOpen(false)} expandStyle />
          </div>
        </div>
      </div>
    </div>
  );
};
