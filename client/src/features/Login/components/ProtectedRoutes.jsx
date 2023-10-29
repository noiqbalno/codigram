import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
  const token = Cookies.get('accessToken');
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}
