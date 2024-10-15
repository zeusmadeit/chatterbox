"use client"

import { create } from 'zustand'

interface useRoomStoreInterface {
  activeRoom: string | null;
  setActiveRoom: (room: string) => void;
  resetRoom: () => void;
}

export const useRoomStore = create<useRoomStoreInterface>((set) => ({
  activeRoom: null,
  setActiveRoom: (room: string) => set({ activeRoom: room }),
  resetRoom: () => set({ activeRoom: null }),
}))

