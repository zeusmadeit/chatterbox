'use client';

import AuthForm from '@/components/AuthForm';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-discord-dark">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-discord-light">Welcome to ChatterBox</h1>
        <AuthForm />
      </div>
    </div>
  );
}
