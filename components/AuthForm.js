import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 rounded bg-gray-700 text-discord-light"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 rounded bg-gray-700 text-discord-light"
      />
      <button type="submit" className="w-full p-2 rounded bg-discord-blue text-white font-semibold hover:bg-blue-600 transition-colors">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full p-2 rounded bg-gray-600 text-discord-light font-semibold hover:bg-gray-500 transition-colors"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
      </button>
    </form>
  );
}
