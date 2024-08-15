import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as organizationsActions from '../../redux/features/organizationsSlice';
import { OrganizationDropdown } from 'components/Dropdown/Organization';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { TryAgain } from 'pages/Services/TryAgain';
import styles from 'pages/Members/Members.scss';

export const Members = () => {
  const { organizations, error, isLoading } = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!organizations.length) {
      dispatch(organizationsActions.getOrganizations());
    }
  }, [dispatch, organizations.length]);

  return (
    <Container>
      <section className={styles.page}>
        <h2 className={styles.title}>Members</h2>
        <p className={styles.subtitle}>
          National organizations that are part of the European Confederation of Dance Sports
        </p>
        {!error ? (
          !isLoading && organizations.length === 0 ? (
            <TryAgain />
          ) : (
            <ul className={styles.members}>
              {organizations.map((organization) => (
                <li className={styles.member} key={organization.id}>
                  <OrganizationDropdown className={styles.card} organization={organization} opened />
                </li>
              ))}
            </ul>
          )
        ) : (
          <TryAgain />
        )}
        {isLoading && <Loader />}
      </section>
    </Container>
  );
};
