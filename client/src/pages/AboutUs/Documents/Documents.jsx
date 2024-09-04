import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDocuments } from '@redux/features/documentsSlice';
import { DocumentDropdown } from 'components/Dropdown/Document';
import { Notification } from 'components/Notification';
import { Loader } from 'components/Loader';
import styles from 'pages/AboutUs/Documents/Documents.scss';

export const Documents = () => {
  const { isLoading, error, documents } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error & !documents.length) {
      dispatch(getDocuments());
    }
  }, []);

  return (
    <div className={styles.dropdownsWrapper}>
      {isLoading ? (
        <Loader />
      ) : documents.length === 0 ? (
        <p className={styles.text}>There is no documents yet</p>
      ) : (
        documents.map((document) => <DocumentDropdown document={document} key={document.id} />)
      )}
    </div>
  );
};
