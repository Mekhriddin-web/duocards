import { useEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import useUserStore from '@/store/store';

export default function Auth() {
  const auth = getAuth(app);
  const user = useUserStore(state => state.user);
  const addUser = useUserStore(state => state.addUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      addUser(user);
    });

    return () => unsubscribe();
  }, [auth, addUser]);

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
