import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDancers, getCoaches, getClubs, getStatuses } from '@redux/features/ephanSlice';
import { Container } from 'components/Container';
import { NoResults } from 'components/NoResults';
import { Loader } from 'components/Loader';
import { Link } from 'components/Link';
import { CertificationCard } from 'pages/Certification/CertificationCard';
import styles from 'pages/Certification/Certification.scss';

const certificationTypes = ['dancers', 'coaches', 'clubs', 'conditions'];

export const Certification = () => {
  const { dancers, coaches, clubs, statuses, isLoading, error } = useSelector((state) => state.ephan);
  const { search } = useLocation();
  const { replace } = useHistory();
  const dispatch = useDispatch();

  const searchTypeParam = new URLSearchParams(search).get('type') || certificationTypes[0];

  useEffect(() => {
    if (!certificationTypes.includes(searchTypeParam)) {
      replace(`?type=${certificationTypes[0]}`);
    }

    if (!statuses) dispatch(getStatuses());
    if (searchTypeParam === 'dancers') dispatch(getDancers());
    if (searchTypeParam === 'coaches') dispatch(getCoaches());
    if (searchTypeParam === 'clubs') dispatch(getClubs());
  }, [searchTypeParam, replace, dispatch, statuses]);

  const renderCards = () => {
    const data = { dancers, coaches, clubs }[searchTypeParam] || [];

    if (data.length === 0) return <NoResults />;

    return data.map((user) => <CertificationCard user={user} key={user.id} />);
  };

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>Certification</h1>
        <div className={styles.pageContent}>
          <nav className={styles.navigation}>
            <ul className={styles.typesList}>
              {certificationTypes.map((type) => (
                <li key={type}>
                  <Link
                    className={styles.link}
                    content={type}
                    path={`?type=${type}`}
                    active={searchTypeParam === type}
                    tabIndex={searchTypeParam === type ? -1 : 0}
                    buttonStyle
                  />
                </li>
              ))}
            </ul>
          </nav>
          {error && <p className={styles.error}>{error}</p>}
          {isLoading ? <Loader /> : <section className={styles.list}>{renderCards()}</section>}
        </div>
      </div>
    </Container>
  );
};
