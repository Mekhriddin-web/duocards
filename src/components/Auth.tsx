import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import useLocalStorageUser from '@/hooks/useLocalStorageUser';

export default function Auth() {
  const { user } = useLocalStorageUser();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {user ? (
        <button
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      ) : (
        <button
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          onClick={handleLogin}
        >
          Зарегистрироваться
        </button>
      )}
    </>
  );
}
