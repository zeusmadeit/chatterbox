import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlusIcon } from 'lucide-react';

interface Room {
  id: string;
  name: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room)));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-2">rooms</h2> */}
      <ul className='space-y-4'>
        {rooms.map(Room => (
          <li key={Room.id} className="mb-4">
            <a href={`/rooms/${Room.id}`} className="text-white font-bold p-6 bg-blue-400 justify-center text-center rounded-full hover:rounded-xl">
              {Room.name.charAt(0).toUpperCase()}
            </a>
          </li>
        ))}
        {/* Add the room creation button */}
        <li key="create-new-room" className="mb-4">
          <span onClick={ ()=> alert("room created: mock alert")} className="text-white font-bold p-6 bg-blue-400 justify-center text-center rounded-full hover:rounded-xl">
            <PlusIcon color='white'/>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RoomList;
