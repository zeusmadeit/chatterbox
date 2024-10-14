import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateRoomForm() {
  const [roomName, setRoomName] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    await addDoc(collection(db, 'rooms'), {
      name: roomName,
      createdBy: user.uid,
      createdAt: new Date()
    });

    setRoomName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="New room name"
          required
          className="flex-1 p-2 rounded bg-gray-700 text-discord-light"
        />
        <button type="submit" className="px-4 py-2 rounded bg-discord-blue text-white font-semibold hover:bg-blue-600 transition-colors">
          Create Room
        </button>
      </div>
    </form>
  );
}
