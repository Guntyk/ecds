import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useOrganizations } from 'hooks/useOrganizations';
import { useEvents } from 'hooks/useEvents';
import { TabSelector } from 'components/Button/TabSelector';
import { SearchForm } from 'components/SearchForm';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { EventCard } from 'pages/Calendar/EventCard';
import { TryAgain } from 'pages/Services/TryAgain';
import styles from 'pages/Calendar/Calendar.scss';

export const Calendar = () => {
  const { search } = useLocation();
  const URLParams = new URLSearchParams(search);

  const initialURLParams = {
    name: URLParams.get('name'),
    country: URLParams.get('country'),
    city: URLParams.get('city'),
  };

  const [searchFormState, setSearchFormState] = useState(initialURLParams || {});
  const organizations = useOrganizations();
  const {
    isLoading,
    error,
    eventsList,
    eventTenses,
    activeEventTenseIndex,
    setActiveEventTenseIndex,
    countryOptions,
    cityOptions,
    handleSearch,
    handleClear,
  } = useEvents({ organizations, searchFormState, setSearchFormState });

  const formConfig = [
    { name: 'name', placeholder: 'Enter Search Terms', type: 'search' },
    { name: 'country', placeholder: 'Country', options: countryOptions, printable: true },
    { name: 'city', placeholder: 'City', options: cityOptions, printable: true },
  ];

  if (error) return <TryAgain />;

  return (
    <section className={styles.calendar}>
      <Container>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Calendar</h2>
          <p className={styles.subtitle}>Of competition</p>
        </div>
        <div className={styles.pageContent}>
          <section className={styles.navigation}>
            <TabSelector
              buttonClassName={styles.tenseBtn}
              tabs={eventTenses}
              activeTabIndex={activeEventTenseIndex}
              setActiveTabIndex={setActiveEventTenseIndex}
            />
            <SearchForm
              className={styles.form}
              formConfig={formConfig}
              formState={searchFormState}
              setFormState={setSearchFormState}
              onSubmit={handleSearch}
              onClear={handleClear}
            />
          </section>
          <div className={styles.events}>
            {isLoading ? (
              <Loader />
            ) : eventsList.length === 0 ? (
              <p className={styles.text}>No events found</p>
            ) : (
              eventsList.map((event) => <EventCard event={event} key={event.id} />)
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
