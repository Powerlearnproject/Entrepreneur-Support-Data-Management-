// components/PublicOnlyRoute.jsx
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const PublicOnlyRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicOnlyRoute;
