import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrganizations } from '@redux/features/organizationsSlice';

export const useOrganizations = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.organizations);

  useEffect(() => {
    if (organizations.length === 0) {
      dispatch(getOrganizations());
    }
  }, [dispatch, organizations.length]);

  return organizations;
};
