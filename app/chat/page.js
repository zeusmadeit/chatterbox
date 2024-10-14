'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RoomList from '@/components/RoomList';
import CreateRoomForm from '@/components/CreateRoomForm';
import ChatRoom from '@/components/ChatRoom';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-discord-dark">Loading...</div>;
  if (!user) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="flex h-screen bg-discord-dark text-discord-light">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">ChatterBox</h1>
          <CreateRoomForm />
        </div>
        <div className="flex-1 overflow-y-auto">
          <RoomList onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
        </div>
        <div className="p-4 bg-gray-700">
          <div className="flex items-center">
            <img src={user.photoURL || '/default-avatar.png'} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            <span>{user.displayName || user.email}</span>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <ChatRoom roomId={selectedRoom} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-gray-500">Select a room to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
