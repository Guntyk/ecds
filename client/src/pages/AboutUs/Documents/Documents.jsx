import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as documentsActions from '../../../redux/features/documentsSlice';
import { DocumentDropdown } from 'components/Dropdown/Document';
import { ErrorMessage } from 'components/ErrorMessage';
import styles from 'pages/AboutUs/Documents/Documents.scss';

export const Documents = () => {
  const isDocumentsRequestLoading = useSelector((state) => state.documents.isLoading);
  const documentsRequestError = useSelector((state) => state.documents.error);
  const documents = useSelector((state) => state.documents.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!documents.length) {
      dispatch(documentsActions.getDocuments());
    }
  }, []);

  return (
    <div className={styles.dropdownsWrapper}>
      {!documentsRequestError ? (
        !isDocumentsRequestLoading && documents.length === 0 ? (
          <p className={styles.text}>There is no documents yet</p>
        ) : (
          documents.map((document) => <DocumentDropdown document={document} key={document.id} />)
        )
      ) : (
        <ErrorMessage error={documentsRequestError} />
      )}
      {isDocumentsRequestLoading && <p className={styles.text}>Loading...</p>}
    </div>
  );
};
