import { auth } from '@/lib/firebase';
import useUserStore from '@/store/store';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

function useLocalStorageUser() {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
  const { user: userServer, addUser } = useUserStore(state => state);

  function addUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  function getUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const userFromLocalStorage = localStorage.getItem('user');
      return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    }
    return userServer;
  }

  useEffect(() => {
    const updateUser = () => {
      const updatedUser = getUserFromLocalStorage();
      setUser(updatedUser);
    };

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        if (typeof localStorage !== 'undefined') {
          addUserToLocalStorage(user);
        } else {
          addUser(user);
        }
      } else {
        if (typeof localStorage !== 'undefined') {
          removeUserFromLocalStorage();
        } else {
          addUser(null);
        }
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
