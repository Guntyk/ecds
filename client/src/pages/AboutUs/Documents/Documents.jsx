import { useState } from 'react';
import { DocumentDropdown } from 'components/Dropdown/Document';
import styles from 'pages/AboutUs/Documents/Documents.scss';

export const Documents = () => {
  const [documents, setDocuments] = useState([]);

  return (
    <div className={styles.dropdownsWrapper}>
      {documents.length > 0 ? (
        documents.map((document) => <DocumentDropdown document={document} key={document.id} />)
      ) : (
        <p className={styles.text}>There is no documents yet</p>
      )}
    </div>
  );
};
