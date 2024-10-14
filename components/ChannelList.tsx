import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Channel {
  id: string;
  name: string;
}

interface ChannelListProps {
  serverId: string;
}

const ChannelList: React.FC<ChannelListProps> = ({ serverId }) => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const channelsQuery = query(collection(db, 'channels'), where('serverId', '==', serverId));
    const unsubscribe = onSnapshot(channelsQuery, (snapshot) => {
      setChannels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Channel)));
    });

    return () => unsubscribe();
  }, [serverId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Channels</h2>
      <ul>
        {channels.map(channel => (
          <li key={channel.id} className="mb-2">
            <a href={`/servers/${serverId}/channels/${channel.id}`} className="text-blue-500 hover:underline">
              #{channel.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
