'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import { Icons } from '@/components/Icons';

export default function Auth() {
  const [user] = useAuthState(auth);
  const [isSignIn, setIsSignIn] = useState(true);
  const changeIsSignIn = () => setIsSignIn(!isSignIn);
  const router = useRouter();

  if (user) {
    router.replace('/rooms');
    return null;
  }

  return (
  <div className='h-screen flex flex-col items-center justify-center align-center bg-discord_blue'>
    <div className="p-4">
      <h2 className='font-bold text-white text-4xl'>ChatterBox</h2>
    </div>

    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-discord_blurple mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
      {isSignIn ? <SignIn /> : <SignUp onChangeIsSignIn={changeIsSignIn} />}
      <button 
        onClick={() => setIsSignIn(!isSignIn)} 
        className="mt-4 text-white text-sm hover:underline"
      >
        {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </button>
    </div>
  </div>
)}
