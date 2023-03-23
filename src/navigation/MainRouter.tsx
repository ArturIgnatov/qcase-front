import { BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthPage } from '../pages/auth-page/AuthPage';
import { MainPage } from '../pages/main-page/MainPage';
import { withAuth } from '../hocks/WithAuth';
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { GET_GLOBAL_USER } from '../apollo/queries';
import { Backdrop, CircularProgress } from '@mui/material';

const SecretMainPage = withAuth(MainPage);

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <AppMainRoutes />
    </BrowserRouter>
  );
};

const AppMainRoutes = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const client = useApolloClient();
  const navigate = useNavigate();
  const location = useLocation();
  const isStarted = useRef(false);

  useEffect(() => {
    if (!isStarted.current) {
      isStarted.current = true;
      const tokens = AuthService.getTokens();
      if (tokens) {
        const jwtUser = AuthService.decodeJWT(tokens.accessToken);

        client
          .query({ query: GET_GLOBAL_USER, variables: { id: jwtUser.id } })
          .then(response => {
            console.log('MAIN REGISTRY 1', location);
            const isAuth = location.pathname.match('auth');
            if (isAuth) {
              navigate('/main');
            }
          })
          .catch(() => {
            console.log('MAIN REGISTRY 2');
            navigate('/auth');
          })
          .finally(() => {
            console.log('MAIN REGISTRY 2');
            setIsLoading(false);
          });
      } else {
        navigate('/auth');
        setIsLoading(false);
      }
    }
  }, [client, location.pathname, navigate]);

  if (isLoading) {
    console.log('RENDER PLACE');
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/main/*" element={<MainPage />} />
    </Routes>
  );
});
