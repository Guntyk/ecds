import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvents } from '@redux/features/eventsSlice';
import { getCities, getCityOptions } from 'helpers/citiesUtils';
import { getDanceStyleFromPath } from 'helpers/danceStyleUtils';
import { filterEventsByParams } from 'helpers/eventFilterUtils';

export const useEvents = ({ organizations, searchFormState, setSearchFormState }) => {
  const { isLoading, error, events } = useSelector((state) => state.events);
  const [eventsList, setEventsList] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const { pathname, search } = useLocation();
  const dispatch = useDispatch();

  const eventTenses = ['future events', 'past events'];
  const URLParams = new URLSearchParams(search);
  const initialActiveTense = URLParams.get('type')
    ? eventTenses.findIndex((tense) => tense === URLParams.get('type'))
    : 0;
  const [activeEventTenseIndex, setActiveEventTenseIndex] = useState(initialActiveTense);

  useEffect(() => {
    if (organizations.length) {
      setCountryOptions(organizations.map(({ country }) => country));
      setCityOptions(getCityOptions(organizations));

      if (events.length && searchFormState.country) {
        setSearchFormState((prevState) => {
          const { city, ...restState } = prevState;
          return restState;
        });

        const cities = getCities(organizations);
        const cityOptions = [...new Set(cities?.[searchFormState.country])].sort();

        setCityOptions(cityOptions);
      }
    }
  }, [organizations, searchFormState.country]);

  useEffect(() => {
    const danceStyle = getDanceStyleFromPath(pathname);
    if (danceStyle && !events.length) {
      dispatch(getEvents({ danceStyle }));
    }
  }, []);

  useEffect(() => {
    if (events.length) {
      setSearchFormState({});
    }
  }, [activeEventTenseIndex]);

  useEffect(() => {
    if (events.length) {
      setEventsList(filterEventsByParams(events, null, activeEventTenseIndex));
    }
  }, [events, activeEventTenseIndex]);

  useEffect(() => {
    if (events.length && (searchFormState.name || searchFormState.country || searchFormState.city)) {
      handleSearch();
    }
  }, [events]);

  const handleSearch = () => {
    setEventsList(filterEventsByParams(events, searchFormState, activeEventTenseIndex));
  };

  const handleClear = () => {
    setEventsList(filterEventsByParams(events, null, activeEventTenseIndex));
  };

  return {
    isLoading,
    error,
    eventsList,
    setEventsList,
    eventTenses,
    activeEventTenseIndex,
    setActiveEventTenseIndex,
    countryOptions,
    cityOptions,
    handleSearch,
    handleClear,
  };
};
