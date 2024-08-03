import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import * as organizationsActions from '../../../../redux/features/organizationsSlice';
import { apiErrors } from 'constants/apiErrors';
import { OrganizationDropdown } from 'components/Dropdown/Organization';
import { ErrorMessage } from 'components/ErrorMessage';
import { Container } from 'components/Container';
import styles from 'pages/Main/blocks/Organizations/Organizations.scss';

export const Organizations = () => {
  const { organizations, error, isLoading } = useSelector((state) => state.organizations);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !organizations.length) {
          dispatch(organizationsActions.getOrganizations());
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [dispatch, organizations.length]);

  return (
    <Container>
      <section className={styles.block} ref={sectionRef}>
        <h2 className={styles.title}>National organizations</h2>
        <p className={styles.subtitle}>that are part of the European Confederation of Dance Sports</p>
        {!error ? (
          !isLoading && organizations.length === 0 ? (
            <ErrorMessage error={apiErrors.error404Message} />
          ) : (
            <ul className={styles.organizationsList}>
              {organizations.map((organization) => (
                <li className={styles.organization} key={organization.id}>
                  <OrganizationDropdown organization={organization} />
                </li>
              ))}
            </ul>
          )
        ) : (
          <ErrorMessage error={error} />
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </Container>
  );
};
