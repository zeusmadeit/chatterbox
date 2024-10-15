import React, { ReactNode } from 'react';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {user} = useAuth();

  return (
    <div className="flex h-screen bg-[var(--background)]">

      {/* Channels sidebar */}
      <div className="w-60 bg-[var(--channelsbg)] text-[var(--text-normal)] flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">ChatterBox</h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {user && (
            <>
              <Link href="/servers" className="block p-2 hover:bg-gray-700">Servers</Link>
            </>
          )}
        </nav>
        {user ? (
          <div className="p-4 border-t border-gray-700 flex items-center">
            <img src={user.photoURL || '/default-avatar.png'} alt="User avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>{user.displayName || user.email}</span>
            <button onClick={() => signOut(auth)} className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-normal)]">Sign Out</button>
          </div>
        ) : (
          <Link href="/auth" className="p-4 border-t border-gray-700 hover:bg-gray-700">Sign In</Link>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
