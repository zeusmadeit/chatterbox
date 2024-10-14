import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function RoomList({ onSelectRoom, selectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const roomList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(roomList);
    });

    return unsubscribe;
  }, []);

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await deleteDoc(doc(db, 'rooms', roomId));
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-discord-light">Chat Rooms</h2>
      <ul className="space-y-2">
        {rooms.map(room => (
          <li key={room.id} className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedRoom === room.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            <span 
              onClick={() => onSelectRoom(room.id)}
              className="text-discord-light flex-1"
            >
              {room.name}
            </span>
            {room.createdBy === user.uid && (
              <button 
                onClick={() => handleDeleteRoom(room.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
