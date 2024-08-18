import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { initialState } from 'pages/Users/formConfig';

export const useUsers = (usersList, activeUsersTypes) => {
  const { search, pathname } = useLocation();
  const { push } = useHistory();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const filters = useMemo(
    () => ({
      searchTypeParam: searchParams.get('type'),
      searchNameParam: searchParams.get('name'),
      searchCountryParam: searchParams.get('country'),
      searchClassParam: searchParams.get('class'),
    }),
    [searchParams]
  );

  const [formState, setFormState] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [activeTypeIndex, setActiveTypeIndex] = useState(
    activeUsersTypes.findIndex((userType) => userType === filters.searchTypeParam)
  );

  useEffect(() => {
    if (!filters.searchTypeParam) {
      push(`${pathname}?type=${activeUsersTypes[0]}`);
      setActiveTypeIndex(0);
    } else {
      setFormState(initialState);
    }
  }, [filters.searchTypeParam, pathname, push]);

  useEffect(() => {
    const filteredUsers = filterUsers(usersList, filters);
    setUsers(filteredUsers);
  }, [filters, usersList]);

  const filterUsers = (usersList, filters) => {
    const { searchTypeParam, searchNameParam, searchCountryParam, searchClassParam } = filters;
    return usersList
      .filter(({ type }) => !searchTypeParam || type === searchTypeParam)
      .filter(({ name }) => !searchNameParam || name.toLowerCase().includes(searchNameParam.toLowerCase()))
      .filter(({ country }) => !searchCountryParam || country?.toLowerCase().includes(searchCountryParam.toLowerCase()))
      .filter(({ level }) => !searchClassParam || level === searchClassParam.toUpperCase());
  };

  const handleFilterChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    newParams.set('type', filters.searchTypeParam);

    Object.entries(formState).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });

    push(`?${newParams.toString()}`);
  };

  const clearFilters = () => {
    setFormState(initialState);
    const newParams = new URLSearchParams();
    if (filters.searchTypeParam) {
      newParams.set('type', filters.searchTypeParam);
    }
    push(`?${newParams.toString()}`);
  };

  return { users, formState, activeTypeIndex, setActiveTypeIndex, handleFilterChange, handleSubmit, clearFilters };
};
