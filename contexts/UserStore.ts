"use client"

import { create } from 'zustand'

interface useUserStoreInterface {
  displayName: string | null;
  photoURL: string | null;
  email: string;
  setUser: (displayName: string | null, photoURL: string | null, email: string) => void;
  signOut: () => void;
}

// export const useUserStore = create<useUserStoreInterface>((set) => ({
//   displayName: null,
//   photoURL: null,
//   email: '',
//   setActiveRoom: (room: string) => set({ activeRoom: room }),
//   resetRoom: () => set({ activeRoom: null }),
// }))

