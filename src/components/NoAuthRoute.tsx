import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const NoAuthRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (auth.currentUser || user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default NoAuthRoute;
