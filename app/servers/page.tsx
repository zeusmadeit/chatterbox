'use client';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

interface Server {
  id: string;
  name: string;
  ownerId: string;
}

const ServersPage = () => {
  const {user} = useAuth();
  const [servers, setServers] = useState<Server[]>([]);
  const [newServerName, setNewServerName] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'servers'), (snapshot) => {
      setServers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Server)));
    });

    return () => unsubscribe();
  }, []);

  const createServer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newServerName.trim() && user) {
      await addDoc(collection(db, 'servers'), {
        name: newServerName,
        ownerId: user.uid,
        createdAt: new Date()
      });
      setNewServerName('');
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Servers</h1>
        <form onSubmit={createServer} className="mb-4">
          <input
            type="text"
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            placeholder="New server name"
            className="p-2 bg-[var(--channeltextarea-background)] text-[var(--text-normal)] rounded mr-2"
          />
          <button type="submit" className="p-2 bg-[var(--text-link)] text-white rounded">Create Server</button>
        </form>
        <ul>
          {servers.map(server => (
            <li key={server.id} className="mb-2">
              <a href={`/servers/${server.id}`} className="text-[var(--text-link)] hover:underline">
                {server.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default ServersPage;
