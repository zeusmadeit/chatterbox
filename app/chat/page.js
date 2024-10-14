'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RoomList from '@/components/RoomList';
import CreateRoomForm from '@/components/CreateRoomForm';
import ChatRoom from '@/components/ChatRoom';

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to access the chat.</div>;

  return (
    <div>
      <h1>Welcome to the Chat App, {user.displayName || user.email}!</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%' }}>
          <RoomList onSelectRoom={setSelectedRoom} />
          <CreateRoomForm />
        </div>
        <div style={{ width: '70%' }}>
          {selectedRoom ? (
            <ChatRoom roomId={selectedRoom} />
          ) : (
            <div>Select a room to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}
