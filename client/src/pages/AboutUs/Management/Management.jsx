import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as managementActions from '../../../redux/features/managementSlice';
import { apiErrors } from 'constants/apiErrors';
import { Notification } from 'components/Notification';
import { Loader } from 'components/Loader';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/Management.scss';

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
          <Notification text={apiErrors.error404Message} type='error' />
        ) : (
          management.length > 0 && management.map((person) => <PersonCard person={person} key={person.id} />)
        )
      ) : (
        <Notification text={managementRequestError} type='error' />
      )}
      {isManagementRequestLoading && <Loader />}
    </div>
  );
};
