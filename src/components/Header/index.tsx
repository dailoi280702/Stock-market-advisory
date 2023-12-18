import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/signin');
      console.log('You are logged out');
    } catch (e) {
      console.log((e as Error).message);
    }
  };
  return (
    <header className="flex items-center px-4 text-xl w-full max-w-screen-lg flex-wrap justify-between mx-auto p-4">
      <Link to="/">STOCK ADVISORY</Link>
      {user && (
        <button className="text-red-500 font-medium text-sm" onClick={handleLogout}>
          Log out
        </button>
      )}
    </header>
  );
}
