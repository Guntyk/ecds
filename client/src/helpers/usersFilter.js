export const filterUsers = (usersList, filters) => {
  const { searchTypeParam, searchNameParam, searchCountryParam, searchClassParam } = filters;
  return usersList
    .filter(({ role }) => !searchTypeParam || role === searchTypeParam.slice(0, -1))
    .filter(({ name }) => !searchNameParam || name.toLowerCase().includes(searchNameParam.toLowerCase()))
    .filter(({ country }) => !searchCountryParam || country?.toLowerCase().includes(searchCountryParam.toLowerCase()))
    .filter(({ level }) => !searchClassParam || level === searchClassParam.toUpperCase());
};
