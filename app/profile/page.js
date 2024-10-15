'use client';

import ProfileForm from '@/components/ProfileForm';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // if (loading) return <div className="min-h-screen flex items-center justify-center bg-discord-dark">Loading...</div>;
  if (!user) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-discord-dark flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-discord-light">Your Profile</h1>
        <ProfileForm />
      </div>
    </div>
  );
}
