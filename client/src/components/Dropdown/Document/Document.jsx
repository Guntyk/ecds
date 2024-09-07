import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState } from 'react';
import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import dropdownStyles from 'components/Dropdown/General.scss';
import styles from 'components/Dropdown/Document/Document.scss';

export const DocumentDropdown = ({ document: { title, description, file } }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link
              className={styles.openBtn}
              content={`Open in ${file?.ext.slice(1).toUpperCase()}`}
              path={file?.url}
              external
            />
            <Arrow isOpen={true} onClick={() => setIsOpen(false)} expandStyle />
          </div>
        </div>
      </div>
    </div>
  );
};
