import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

type AuthStoreState = {
  userProfile: User | null;
  addUser: (user: User | null) => void;
  removeUser: () => void;
};

const useAuthStore = create<AuthStoreState>()(
  devtools(
    persist(
      set => ({
        userProfile: null,
        addUser: userProfile => set(() => ({ userProfile })),
        removeUser: () => set({ userProfile: null }),
      }),
      {
        name: 'auth',
      }
    )
  )
);

export default useAuthStore;
