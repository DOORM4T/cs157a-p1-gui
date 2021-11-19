import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../App';
import { LoginContext } from '../LoginContext';

export const useRedirectIfNotLoggedIn = () => {
  const { customerId } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = customerId === null;
    if (isLoggedIn)
      navigate(ROUTES.title);
  }, [customerId]);
};
