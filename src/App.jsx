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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="*" element={<div>not found!</div>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
