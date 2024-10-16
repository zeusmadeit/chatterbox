"use client"

import { create } from 'zustand'

interface useRoomStoreInterface {
  activeRoomID: string | null;
  activeRoomName: string | null,
  setActiveRoom: (room_id: string, room_name: string) => void;
  resetRoom: () => void;
}

export const useRoomStore = create<useRoomStoreInterface>((set) => ({
  activeRoomID: null,
  activeRoomName: null,
  setActiveRoom: (room_id: string, room_name: string) => set({ activeRoomID: room_id, activeRoomName: room_name }),
  resetRoom: () => set({ activeRoomID: null, activeRoomName: null }),
}))

