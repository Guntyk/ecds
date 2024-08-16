import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usersList } from 'constants/mockedUsers';
import { CertificationCard } from 'pages/Certification/CertificationCard';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import styles from 'pages/Certification/Certification.scss';

export const Certification = () => {
  const certificationTypes = ['dancers', 'coaches', 'clubs', 'conditions'];
  const { search, pathname } = useLocation();
  const { push } = useHistory();

  const searchTypeParam = new URLSearchParams(search).get('type');

  const [activeType, setActiveType] = useState(searchTypeParam);

  useEffect(() => {
    if (!searchTypeParam) {
      push(`?type=${certificationTypes[0]}`);
    }
  }, [searchTypeParam, pathname, push]);

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>Certification</h1>
        <div className={styles.pageContent}>
          <section className={styles.navigation}>
            <nav>
              <ul className={styles.typesList}>
                {certificationTypes.map((type) => (
                  <li key={type}>
                    <Link
                      className={styles.link}
                      content={type}
                      path={`?type=${type}`}
                      active={searchTypeParam === type}
                      {...(searchTypeParam === type && { tabIndex: -1 })}
                      tabIndex={-1}
                      buttonStyle
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <section className={styles.list}>
            {usersList
              .filter(({ type }) => type === searchTypeParam)
              .map((user) => (
                <CertificationCard user={user} key={user.id} />
              ))}
          </section>
        </div>
      </div>
    </Container>
  );
};
