import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Server {
  id: string;
  name: string;
}

const ServerList: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'servers'), (snapshot) => {
      setServers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Server)));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Servers</h2>
      <ul>
        {servers.map(server => (
          <li key={server.id} className="mb-2">
            <a href={`/servers/${server.id}`} className="text-blue-500 hover:underline">
              {server.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerList;
