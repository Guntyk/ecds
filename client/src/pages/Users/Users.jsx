import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUsers } from 'hooks/useUsers';
import { getDancers, getJudges, getStatuses, getDancerClasses, getCountries } from '@redux/features/ephanSlice';
import { formConfig } from 'pages/Users/formConfig';
import { activeUsersTypes } from 'constants/usersTypes';
import { TabSelector } from 'components/Button/TabSelector';
import { Container } from 'components/Container';
import { NoResults } from 'components/NoResults';
import { Dropdown } from 'components/Dropdown';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Input } from 'components/Input';
import { UserCard } from 'pages/Users/UserCard';
import styles from 'pages/Users/Users.scss';

export const Users = () => {
  const { dancers, judges, dancerClasses, statuses, countries, isLoading, error } = useSelector((state) => state.ephan);
  const [usersList, setUsersList] = useState([]);
  const dispatch = useDispatch();

  const { users, formState, activeTypeIndex, setActiveTypeIndex, handleFilterChange, handleSubmit, clearFilters } =
    useUsers(usersList, statuses, activeUsersTypes);

  const activeTabName = activeUsersTypes[activeTypeIndex];

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (activeTabName === 'dancers') {
      dispatch(getDancers());
      if (!dancerClasses) {
        dispatch(getDancerClasses());
      }
    } else if (activeTabName === 'judges') {
      dispatch(getJudges());
    }
  }, [activeTypeIndex, dispatch]);

  useEffect(() => {
    setUsersList(activeTabName === 'judges' ? judges : dancers);
  }, [activeTypeIndex, judges, dancers]);

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>List of active users</h1>
        <div className={styles.pageContent}>
          <section className={styles.navigation}>
            <TabSelector
              tabs={activeUsersTypes}
              activeTabIndex={activeTypeIndex}
              setActiveTabIndex={setActiveTypeIndex}
            />
            <form className={styles.searchForm} onSubmit={handleSubmit}>
              {formConfig.map(({ name, placeholder, options, zIndex }) =>
                options ? (
                  <Dropdown
                    className={styles.dropdownFilter}
                    options={options}
                    selectedValue={formState[name]}
                    placeholder={placeholder}
                    onChange={(option) => handleFilterChange(name, option)}
                    zIndex={zIndex}
                    key={name}
                  />
                ) : (
                  <Input
                    wrapperClassName={styles.input}
                    key={name}
                    name={name}
                    inputValue={formState[name]}
                    placeholder={placeholder}
                    onChange={(e) => handleFilterChange(name, e.target.value)}
                  />
                )
              )}
              <Button className={styles.searchBtn} text='Search' type='submit' searchStyle />
              <Button
                className={styles.clearFilters}
                text='Clear filters'
                type='reset'
                onClick={clearFilters}
                ghostStyle
              />
            </form>
          </section>
          {error && <p className={styles.error}>{error}</p>}
          {isLoading ? (
            <Loader />
          ) : users.length ? (
            <ul className={styles.users}>
              {users.map((user) => (
                <UserCard
                  role={activeTabName}
                  user={user}
                  key={user.id}
                  countries={countries}
                  dancerClasses={dancerClasses}
                />
              ))}
            </ul>
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </Container>
  );
};
