import { FirebaseError } from 'firebase/app';
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthErrorCodes } from 'firebase/auth';

const Recover = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { sendPasswordResetMail } = useAuth();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await sendPasswordResetMail(email);

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
          case AuthErrorCodes.INVALID_EMAIL:
            setError('Invalid email address');
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
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        <p className="py-2">
          Forgot your password? Enter your email and we'll send you a link to reset it.
        </p>
      </div>

      {error && error != '' && <p className="text-sm font-medium text-red-600 my-3">{error}</p>}
      {message && message != '' && (
        <p className="text-sm font-medium text-green-600 my-3">{message}</p>
      )}

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
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full px-4 px-auto text-white h-12 text-sm font-medium rounded-lg mt-10">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Recover;
