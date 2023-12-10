import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/');
    } catch (e) {
      try {
        const err = e as FirebaseError;
        switch (err.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            setError('Invalid email address');
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            setError('Too many attempts. Try again later');
            break;
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            setError('Email or password is invalid');
            break;
          default:
            setError('Something went wrong. Try again later');
            console.log(JSON.stringify(err));
        }
      } catch (e) {
        setError('Something went wrong. Try again later');
        console.log(e);
      }
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto my-16 p-4 w-screen">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        <p className="py-2">
          Don&apos;t have an account yet?{' '}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign up.
          </Link>
        </p>
      </div>

      {error && error != '' && <p className="text-sm font-medium text-red-600 my-3">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-bold text-sm">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg h-12 placeholder:text-neutral-600"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </div>

        <div className="flex flex-col py-2 rounded-lg">
          <label className="py-2 font-bold text-sm">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg h-12 placeholder:text-neutral-700"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full px-4 px-auto text-white h-12 text-sm font-medium rounded-lg mt-10">
          Sign In
        </button>
        <Link to="./recover" className="text-center block text-blue-600 mt-3 text-sm font-medium">
          Forgot password?
        </Link>
      </form>
    </div>
  );
};

export default Signin;
