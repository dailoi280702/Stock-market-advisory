import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);

      for (let i = 3; i >= 0; i--) {
        setTimeout(() => {
          setMessage(
            `We have sent you an email. Please check your inbox\nBack to signin in ${i} second${
              i > 1 ? 's' : ''
            }`
          );
        }, (3 - i) * 1000);
      }

      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (e) {
      try {
        const err = e as FirebaseError;
        switch (err.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            setError('Email already in use');
            break;
          case AuthErrorCodes.WEAK_PASSWORD:
            setError('Password is too weak');
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            setError('Too many attempts. Try again later');
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
        <h1 className="text-2xl font-bold py-2">Sign up for a free account</h1>
        <p className="py-2">
          Already have an account yet?{' '}
          <Link to="/signin" className="text-blue-600 font-medium">
            Sign in.
          </Link>
        </p>
      </div>

      {error && error != '' && <p className="text-sm font-medium text-red-600 my-3">{error}</p>}
      {message && message != '' && (
        <p className="text-sm font-medium text-green-600 my-3">{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg h-12 placeholder:text-neutral-700"
            placeholder="example@gmail.com"
            type="email"
            required
          />
        </div>

        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg h-12 placeholder:text-neutral-700"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full px-4 px-auto text-white h-12 text-sm font-medium rounded-lg mt-10">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
