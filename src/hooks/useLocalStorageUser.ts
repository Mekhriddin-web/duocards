import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

function useLocalStorageUser() {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  function addUserToLocalStorage(user: User) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  function removeUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
  }

  function getUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const userFromLocalStorage = localStorage.getItem('user');
      return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    }

    return null;
  }

  useEffect(() => {
    const updateUser = () => {
      const updatedUser = getUserFromLocalStorage();
      setUser(updatedUser);
    };

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        addUserToLocalStorage(user);
      } else {
        removeUserFromLocalStorage();
      }

      updateUser();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
  };
}

export default useLocalStorageUser;
