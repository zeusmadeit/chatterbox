'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Layout>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        {isSignIn ? <SignIn /> : <SignUp />}
        <button 
          onClick={() => setIsSignIn(!isSignIn)} 
          className="mt-4 text-blue-500 underline"
        >
          {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </div>
    </Layout>
  );
}
