'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RoomList from '@/components/RoomList';
import CreateRoomForm from '@/components/CreateRoomForm';
import ChatRoom from '@/components/ChatRoom';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-discord-dark">Loading...</div>;
  if (!user) {
    router.push('/auth');
    return null;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-discord-dark text-discord-light">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 rounded"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-gray-800 flex flex-col fixed inset-y-0 left-0 z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">ChatApp</h1>
          <CreateRoomForm />
        </div>
        <div className="flex-1 overflow-y-auto">
          <RoomList onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
        </div>
        <div className="p-4 bg-gray-700">
          <div className="flex items-center">
            <img src={user.photoURL || '/default-avatar.png'} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            <span className="text-sm truncate">{user.displayName || user.email}</span>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {selectedRoom ? (
          <ChatRoom roomId={selectedRoom} />
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-xl sm:text-2xl text-gray-500 text-center">Select a room to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}