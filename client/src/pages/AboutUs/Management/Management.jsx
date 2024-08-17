import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getManagement } from '@redux/features/managementSlice';
import { apiErrors } from 'constants/apiErrors';
import { Notification } from 'components/Notification';
import { Loader } from 'components/Loader';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/Management.scss';

export const Management = () => {
  const { isLoading, error, management } = useSelector((state) => state.management);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && !management.length) {
      dispatch(getManagement());
    }
  }, []);

  return (
    <div className={styles.management}>
      {!error ? (
        isLoading ? (
          <Loader />
        ) : management.length === 0 ? (
          <Notification text={apiErrors.error404Message} type='error' />
        ) : (
          management.length > 0 && management.map((person) => <PersonCard person={person} key={person.id} />)
        )
      ) : (
        <Notification text={error} type='error' />
      )}
    </div>
  );
};
