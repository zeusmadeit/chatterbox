import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Channel {
  id: string;
  name: string;
}

interface ChannelListProps {
  serverId: string;
}

const ChannelList: React.FC<ChannelListProps> = ({ serverId }) => {
  const {user} = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [newChannelName, setNewChannelName] = useState('');

  useEffect(() => {
    const channelsQuery = query(collection(db, 'channels'), where('serverId', '==', serverId));
    const unsubscribe = onSnapshot(channelsQuery, (snapshot) => {
      setChannels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Channel)));
    });

    return () => unsubscribe();
  }, [serverId]);

  const createChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newChannelName.trim() && user) {
      await addDoc(collection(db, 'channels'), {
        name: newChannelName,
        serverId,
        createdAt: new Date()
      });
      setNewChannelName('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Channels</h2>
      <form onSubmit={createChannel} className="mb-4">
        <input
          type="text"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
          placeholder="New channel name"
          className="p-2 bg-[var(--channeltextarea-background)] text-[var(--text-normal)] rounded mr-2"
        />
        <button type="submit" className="p-2 bg-[var(--text-link)] text-white rounded">Create Channel</button>
      </form>
      <ul>
        {channels.map(channel => (
          <li key={channel.id} className="mb-2">
            <a href={`/servers/${serverId}/channels/${channel.id}`} className="text-[var(--text-link)] hover:underline">
              #{channel.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
