import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useElementOnScreen from 'hooks/useElementOnScreen';
import { getOrganizations } from '@redux/features/organizationsSlice';
import { apiErrors } from 'constants/apiErrors';
import { OrganizationDropdown } from 'components/Dropdown/Organization';
import { Notification } from 'components/Notification';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import styles from 'pages/Main/blocks/Organizations/Organizations.scss';

export const Organizations = () => {
  const { organizations, error, isLoading } = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (!error && isVisible && !organizations.length) {
      dispatch(getOrganizations());
    }
  }, [isVisible, organizations.length]);

  const handleDropdownToggle = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Container>
      <section className={styles.block} ref={containerRef}>
        <h2 className={styles.title}>National organizations</h2>
        <p className={styles.subtitle}>that are part of the European Confederation of Dance Sports</p>
        {!error ? (
          isLoading ? (
            <Loader />
          ) : organizations.length === 0 ? (
            <Notification text={apiErrors.error404Message} type='error' />
          ) : (
            <ul className={styles.organizationsList}>
              {organizations.map((organization) => (
                <li className={styles.organization} key={organization.id}>
                  <OrganizationDropdown
                    organization={organization}
                    isOpen={openDropdownId === organization.id}
                    onToggle={() => handleDropdownToggle(organization.id)}
                  />
                </li>
              ))}
            </ul>
          )
        ) : (
          <Notification text={error} type='error' />
        )}
      </section>
    </Container>
  );
};
