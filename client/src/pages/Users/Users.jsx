import { useState } from 'react';
import { useUsers } from 'hooks/useUsers';
import { formConfig } from 'pages/Users/formConfig';
import { activeUsersTypes } from 'constants/usersTypes';
import { usersList } from 'constants/mockedUsers';
import { TabSelector } from 'components/Button/TabSelector';
import { Container } from 'components/Container';
import { Dropdown } from 'components/Dropdown';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { UserCard } from 'pages/Users/UserCard';
import { FilterMobile } from 'components/FilterMobile/FilterMobile';
import styles from 'pages/Users/Users.scss';

export const Users = () => {
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const { users, formState, activeTypeIndex, setActiveTypeIndex, handleFilterChange, handleSubmit, clearFilters } =
    useUsers(usersList, activeUsersTypes);

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
            <form
              className={`${styles.searchForm} ${isFilterMobileOpen ? styles.searchFormWithFilterOpen : ''}`}
              onSubmit={handleSubmit}
            >
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
              <FilterMobile
                className={styles.filterMobile}
                formState={formState}
                handleFilterChange={handleFilterChange}
                handleSubmit={handleSubmit}
                clearFilters={clearFilters}
                formConfig={formConfig}
                onOpenChange={setIsFilterMobileOpen}
              />
            </form>
          </section>
          <ul className={styles.users}>
            {users.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};
