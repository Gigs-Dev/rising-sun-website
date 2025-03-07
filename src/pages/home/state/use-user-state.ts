import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  _id: string;
  username: string;
}

interface IUserStore {
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser) => void;
  setToken: (token: string | null) => void;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => {
      return {
        user: null,
        token: null,
        setUser: (user: IUser) => set({ user }),
        setToken: (token: string | null) => set({ token }),
      };
    },
    {
      name: "user",
    }
  )
);

export default useUserStore;
