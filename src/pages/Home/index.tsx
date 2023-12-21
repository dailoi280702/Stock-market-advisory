import { Link } from 'react-router-dom';
import SymbolsList from '../../components/SymbolsList';
import Watchlist from 'components/Watchlist';

export default function Home() {
  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto">
        ok
        <Link to="news">news</Link>
      </div>

      <Watchlist className="w-full max-w-screen-lg mx-auto mb-8" />

      <SymbolsList />
    </>
  );
}
