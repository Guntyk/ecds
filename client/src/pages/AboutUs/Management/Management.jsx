import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getManagement } from '@redux/features/managementSlice';
import { apiErrors } from 'constants/apiErrors';
import { Notification } from 'components/Notification';
import { Loader } from 'components/Loader';
import { Tabs } from 'components/Tabs';
import { Committees } from 'pages/AboutUs/Management/tabs/Committees';
import { Presidium } from 'pages/AboutUs/Management/tabs/Presidium';
import styles from 'pages/AboutUs/Management/Management.scss';

export const Management = () => {
  const { isLoading, error, management } = useSelector((state) => state.management);
  const tabs = { Presidium, Committees };
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && !management.length) {
      dispatch(getManagement());
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : management.length === 0 ? (
        <Notification text={apiErrors.error404Message} type='error' />
      ) : (
        management.length > 0 && <Tabs innerClassName={styles.management} tabs={tabs} data={management} headFontStyle />
      )}
    </>
  );
};
