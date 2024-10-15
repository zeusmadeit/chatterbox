import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = ({onChangeIsSignIn}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onChangeIsSignIn();
    } catch (error: any) {
      setError(error.message);
      console.error('Error signing up:', error);
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
        className="w-full p-2 border rounded focus:border-none"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded focus:border-none"
        required
      />
      <button 
        type="submit" 
        onClick={handleSignUp}
        className={cn("w-full p-2 bg-blue-500 text-white rounded", loading && 'disabled')}
      >
        {loading? 'Loading...': 'Sign Up'}
      </button>
      {error && <p className="mt-4 mb-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
