import { Link } from 'react-router-dom';
import SymbolsList from '../../components/SymbolsList';

export default function Home() {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      ok
      <Link to="news">news</Link>
      <SymbolsList />
    </div>
  );
}
