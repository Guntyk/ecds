import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import SessionStorageUtils from 'utils/SessionStorageUtils';
import AboutUsService from 'services/AboutUsService';
import { ErrorMessage } from 'components/ErrorMessage';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/Management.scss';

export const Management = () => {
  const [management, setManagement] = useState(SessionStorageUtils.getManagement() || []);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['management'],
    queryFn: async () => {
      const { result, error } = await AboutUsService.getManagement();
      return { result: result?.data || null, error };
    },
    enabled: false,
  });

  useEffect(() => {
    if (!management.length) {
      refetch().then((res) => {
        if (res.data?.result) {
          SessionStorageUtils.setManagement(res.data.result);
          setManagement(res.data.result);
        }
      });
    }
  }, [management, refetch]);

  return (
    <div className={styles.management}>
      {management.length > 0 && management.map((person) => <PersonCard person={person} key={person.id} />)}
      {isLoading && <p>Loading...</p>}
      {response?.error && <ErrorMessage error={response.error} />}
    </div>
  );
};
