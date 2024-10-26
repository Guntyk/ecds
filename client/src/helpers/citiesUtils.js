import cities from 'cities.json';

export const getCities = (organizations) => {
  const groupedCitiesByCountries = cities.reduce((acc, { country, name }) => {
    if (!acc[country]) {
      acc[country] = [];
    }

    acc[country].push(name);

    return acc;
  }, {});

  const countryNames = organizations.reduce((acc, { country, countryAcronym }) => {
    acc[countryAcronym] = country;
    return acc;
  }, {});

  const citiesByCountryName = Object.entries(groupedCitiesByCountries).reduce((acc, [acronym, cities]) => {
    const countryName = countryNames[acronym];
    if (countryName) {
      acc[countryName] = cities;
    }
    return acc;
  }, {});

  return citiesByCountryName;
};

export const getCityOptions = (organizations) => {
  const cities = getCities(organizations);
  return [...new Set(Object.values(cities).flat())].sort();
};
