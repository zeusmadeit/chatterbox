import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlusIcon } from 'lucide-react';
import { useRoomStore } from '@/contexts/RoomStore';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const setActiveRoom = useRoomStore((state) => state.setActiveRoom)
  const activeRoom = useRoomStore((state) => state.activeRoom)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room)));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <ul className=''>
        {rooms.map(Room => (
          <li key={Room.id} className={cn("text-white font-sm py-2 mb-2 text-start hover:cursor-pointer", activeRoom === Room.id && "bg-discord_blue rounded-xl")}>
            <span onClick={() => setActiveRoom(Room.id)} className="">
              {Room.name}
            </span>
          </li>
        ))}
        {/* Add the room creation button */}
        <li key="create-new-room" className="mb-4">
          <span onClick={ ()=> alert("room created: mock alert")} className="flex flex-row text-white font-sm py-6 text-start hover:cursor-pointer">
            <PlusIcon color='white' className='pr-2'/> Create room
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RoomList;
