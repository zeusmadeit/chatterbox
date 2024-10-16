/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(email, password);
      setLoading(false);
      router.push('/rooms');
    } catch (error: any) {
      setError(error.message);
      console.error('Error signing in:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit" 
        onClick={handleSignIn}
        className={cn("w-full p-2 bg-blue-500 text-white rounded", loading && 'disabled')}
      >
        {loading? 'Loading...': 'Sign In'}
      </button>
      {error && <p className="mt-4 mb-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;
