import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlusIcon } from 'lucide-react';
// import { HashtagIcon } from '@heroicons/react/20/solid';
import { useRoomStore } from '@/contexts/RoomStore';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const setActiveRoom = useRoomStore((state) => state.setActiveRoom)
  const activeRoom = useRoomStore((state) => state.activeRoomID)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room)));
    });

    return () => unsubscribe();
  }, []);

  const createRoom = async () => {
    const newRoomName = prompt("Enter a new channel name")

    if (newRoomName?.trim()) {
      await addDoc(collection(db, 'rooms'), { name: newRoomName });
    }
  };

  return (
    <div className="">
      <ul className=''>
        {rooms.map(Room => (
          <li key={Room.id} onClick={() => setActiveRoom(Room.id, Room.name)} className={cn("flex flex-row font-sm p-4 py-2 mb-2 text-white text-start hover:cursor-pointer", activeRoom === Room.id? "bg-gray-500 bg-opacity-60 rounded-sm opacity-100":"opacity-80")}>
            {Room.name.length > 18 ? Room.name.slice(0, 18) + "...." : Room.name}
          </li>
        ))}
        {/* Add the room creation button */}
        <li key="create-new-room" className="p-4 mb-4">
          <span 
            onClick={createRoom} 
            className="flex flex-row text-white font-sm py-6 text-start hover:cursor-pointer"
          >
            <PlusIcon color='white' className='pr-2'/> Create room
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RoomList;
