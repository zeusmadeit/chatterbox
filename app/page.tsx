'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/chat');
    }
  }, [user, router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-discord-dark text-discord-light">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">ChatApp</h1>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Welcome to ChatApp
          </h2>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-200">
            Connect with friends and communities in real-time
          </p>
          <div className="space-x-4 animate-fade-in-up animation-delay-400">
            <button
              onClick={() => router.push('/auth')}
              className="bg-discord-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ChatApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
