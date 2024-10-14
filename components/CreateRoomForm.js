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
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="New room name"
          required
          className="flex-1 p-2 rounded bg-gray-700 text-discord-light text-sm sm:text-base"
        />
        <button type="submit" className="px-4 py-2 rounded bg-discord-blue text-white font-semibold hover:bg-blue-600 transition-colors text-sm sm:text-base">
          Create Room
        </button>
      </div>
    </form>
  );
}
