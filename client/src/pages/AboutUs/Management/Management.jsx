import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as aboutUsActions from '../../../redux/features/aboutUsSlice';
import { ErrorMessage } from 'components/ErrorMessage';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/Management.scss';

export const Management = () => {
  const isManagementRequestLoading = useSelector((state) => state.aboutUs.isLoading);
  const managementRequestError = useSelector((state) => state.aboutUs.error);
  const management = useSelector((state) => state.aboutUs.management);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!management.length) {
      dispatch(aboutUsActions.getManagement());
    }
  }, []);

  return (
    <div className={styles.management}>
      {isManagementRequestLoading ? (
        <p>Loading...</p>
      ) : (
        management?.length > 0 && management.map((person) => <PersonCard person={person} key={person.id} />)
      )}
      {managementRequestError && <ErrorMessage error={managementRequestError} />}
    </div>
  );
};
