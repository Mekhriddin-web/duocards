import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/store';

export default function Auth() {
  const { userProfile, addUser, removeUser } = useUserStore(state => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        addUser(user);
      } else {
        removeUser();
      }
    });
    setIsLoading(false);

    return () => {
      unsubscribe();
    };
  }, [addUser, removeUser]);

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {userProfile ? (
        <button
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          onClick={handleLogout}
        >
          Sign out
        </button>
      ) : (
        <button
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          onClick={handleLogin}
        >
          Sign in
        </button>
      )}
    </>
  );
}
