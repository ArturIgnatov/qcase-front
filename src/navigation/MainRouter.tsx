import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from '../pages/auth-page/AuthPage';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};
