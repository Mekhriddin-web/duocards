import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

function useLocalStorageUser() {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  function addUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  function getUserFromLocalStorage() {
    const userFromLocalStorage = localStorage.getItem('user');
    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
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
