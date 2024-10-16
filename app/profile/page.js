'use client';

import ProfileForm from '@/components/ProfileForm';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useRoomStore} from "@/contexts/RoomStore";
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const resetRoom = useRoomStore(state => state.resetRoom);
  const activeRoom = useRoomStore(state => state.activeRoomID);

  if (!user) {
    router.push('/auth');
    return null;
  }

  if (activeRoom) {
    resetRoom();
  }

  return (
    <Layout>
      <div className="min-h-screen bg-discord-dark flex items-center justify-center">
        <div className="bg-[var(--channelsbg)] p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-bold mb-6 text-center text-[var(--text-normal)]">Update Profile</h1>
          <ProfileForm />
        </div>
      </div>
    </Layout>
  );
}
