export const filterEventsByParams = (events, filters, activeEventTenseIndex) => {
  const { name: nameParam, country: countryParam, city: cityParam } = filters || {};
  const today = new Date();

  return events
    .filter(({ startDate, endDate }) => {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : null;

      if (activeEventTenseIndex === 0) {
        return start >= today || (end && end >= today);
      } else if (activeEventTenseIndex === 1) {
        return end < today && start < today;
      }
      return true;
    })
    .filter(({ title }) => !nameParam || title.toLowerCase().includes(nameParam.toLowerCase()))
    .filter(
      ({ organization }) => !countryParam || organization?.country.toLowerCase().includes(countryParam.toLowerCase())
    )
    .filter(({ city }) => !cityParam || city.toLowerCase().includes(cityParam.toLowerCase()));
};
