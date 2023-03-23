import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

export const withAuth = <T extends object>(WrappedComponent: React.ComponentType<T & object>) => {
  return (props: T) => {
    const navigate = useNavigate();

    useEffect(() => {
      const tokens = AuthService.getTokens();
      if (!tokens) {
        navigate('/auth');
      }
    }, []);

    return (
      <Fragment>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};
