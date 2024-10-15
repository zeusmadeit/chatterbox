'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push('/auth');
    return null;
  }

  return (
    <Layout>
        <div className="flex-1 bg-discord-dark flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h1 className="text-3xl font-bold mb-6 text-center text-discord-light">Rooms</h1>
        </div>
        </div>
    </Layout>
  );
}
