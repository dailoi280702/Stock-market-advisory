import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (user === undefined) {
    return <div className="text-center my-10">Loading...</div>;
  }

  if (!auth.currentUser) {
    return <Navigate to="/signin" />;
  }

  if (!auth.currentUser.emailVerified) {
    return (
      <p className="mx-auto px-4 py-10">
        Please check your email{' '}
        <Link
          to="https://mail.google.com/"
          className="text-blue-600 font-medium underline underline-offset-2"
        >
          email
        </Link>{' '}
        and verify your account
      </p>
    );
  }

  return children;
};

export default ProtectedRoute;
