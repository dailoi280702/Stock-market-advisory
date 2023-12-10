import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Recover from './pages/Signin/recover';
import News from './pages/News';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="*" element={<div>not found!</div>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin/recover" element={<Recover />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
        loader={async () => {
          const url =
            'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo';
          return fetch(url).then((res) => res.json());
        }}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
