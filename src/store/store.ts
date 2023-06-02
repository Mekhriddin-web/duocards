import { create } from 'zustand';
import { User } from 'firebase/auth';

type UserStoreState = {
  user: User | null;
  addUser: (user: User | null) => void;
};

const useUserStore = create<UserStoreState>(set => ({
  user: null,
  addUser: user => set(() => ({ user })),
}));

export default useUserStore;
