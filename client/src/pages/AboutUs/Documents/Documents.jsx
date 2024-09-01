import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDocuments } from "@redux/features/documentsSlice";
import { DocumentDropdown } from "components/Dropdown/Document";
import { Notification } from "components/Notification";
import { Loader } from "components/Loader";
import styles from "pages/AboutUs/Documents/Documents.scss";

import doc from "../doc.json";

const docParse = JSON.parse(doc);

export const Documents = () => {
  const { isLoading, error, documents } = useSelector(
    (state) => state.documents
  );
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
      ) : docParse.length === 0 ? (
        <p className={styles.text}>There is no documents yet</p>
      ) : (
        docParse.map((document) => (
          <DocumentDropdown document={document} key={document.id} />
        ))
      )}
    </div>
  );
};
