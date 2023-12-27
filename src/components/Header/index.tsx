import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import HeaderLink from './HeaderLink';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen((v) => !v);
  };

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
        <>
          <button
            className="inline-flex items-center p-2 w-10 h-10 justify-center md:hidden stroke-2"
            onClick={toggleNav}
          >
            <Bars3Icon className="w-6 h-6 stroke-2" />
          </button>

          <div className={`${isNavOpen ? '' : 'hidden'} w-full md:block md:w-auto`}>
            <ul className="text-base flex flex-col p-4 space-y-2 md:p-0 md:flex-row md:space-x-4 md:space-y-0">
              <HeaderLink to="/" text="Watchlists" />
              <HeaderLink to="/market" text="Market" />
              <HeaderLink to="/news" text="News" />
              <button className="text-red-500 font-medium text-sm" onClick={handleLogout}>
                Log out
              </button>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
