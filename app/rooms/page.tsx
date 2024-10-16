'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Layout from '@/components/Layout';
import Chat from '@/components/Chat';
import { cn } from '@/lib/utils';
import { useRoomStore } from '@/contexts/RoomStore';
import Image from 'next/image';
import chatImage from "@/public/images/undraw_popular_re_mlfe.svg";


export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const { activeRoomID, activeRoomName } = useRoomStore();
  const router = useRouter();

  if (!user) {
    router.push('/auth');
    return null;
  }

  return (
    <Layout>
      <div className={cn("h-screen bg-discord-dark", activeRoomID === null && "flex items-center justify-center")}>
        {activeRoomID && activeRoomName ? (
          <Chat />
        ) : (
          <Image
            priority
            src={chatImage}
            alt=""
            className='h-auto'
          />
        )}
      </div>
    </Layout>
  );
}

