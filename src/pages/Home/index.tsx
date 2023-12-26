import { Link } from 'react-router-dom';
import SymbolsList from '../../components/SymbolsList';
import Watchlists from 'components/Watchlists';

export default function Home() {
  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto">
        <Link to="news">news</Link>
      </div>

      <Watchlists className="w-full max-w-screen-lg mx-auto mb-8 px-4" />

      <SymbolsList />
    </>
  );
}
