import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiGetCurrent } from '~/apis/user';

export const useUserStore = create(
  persist(
    // eslint-disable-next-line no-unused-vars
    (set, get) => ({
      token: null,
      current: null,
      setToken: (token) => set({ token }),
      getCurrent: async () => {
        const response = await apiGetCurrent();
        if (response.success)
          return set(() => ({
            current: response.currentUser,
          }));
      },
    }),
    {
      name: 'dksmart', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // tra ve truong mong muon
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            (item) => item[0] === 'token' || item[0] === 'current'
          )
        ),
    }
  )
);
