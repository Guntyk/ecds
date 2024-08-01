import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as managementActions from '../../../redux/features/managementSlice';
import { ErrorMessage } from 'components/ErrorMessage';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/Management.scss';
import { apiErrors } from 'constants/apiErrors';

export const Management = () => {
  const isManagementRequestLoading = useSelector((state) => state.management.isLoading);
  const managementRequestError = useSelector((state) => state.management.error);
  const management = useSelector((state) => state.management.management);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!management.length) {
      dispatch(managementActions.getManagement());
    }
  }, []);

  return (
    <div className={styles.management}>
      {!managementRequestError ? (
        !isManagementRequestLoading && management.length === 0 ? (
          <ErrorMessage error={apiErrors.error404Message} />
        ) : (
          management.length > 0 && management.map((person) => <PersonCard person={person} key={person.id} />)
        )
      ) : (
        <ErrorMessage error={managementRequestError} />
      )}
      {isManagementRequestLoading && <p className={styles.text}>Loading...</p>}
    </div>
  );
};
