import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  _id: string;
  username: string;
}

interface IUserStore {
  user: IUser | null;
  email: string | null;
  token: string | null;
  loading?: boolean,
  error?: unknown | string | null;
  setUser: (user: IUser) => void;
  setEmail: (email: string) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => {
      return {
        user: null,
        token: null,
        email: '',
        loading: false,
        error: null,
        setEmail: (email: string) => set({ email }) ,
        setLoading: (loading: boolean) => set({ loading }),
        setError: (error: string) => set({ error }),
        setUser: (user: IUser) => set({ user }),
        setToken: (token: string | null) => set({ token }),
        logout: () => set({ user: null, token: null, email: '' }),
      };
    },
    {
      name: "user",
    }
  )
);

export default useUserStore;
