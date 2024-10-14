import React, { ReactNode } from 'react';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-bold">Discord Clone</h1>
        </div>
        <nav className="flex-1">
          <Link href="/" className="block p-4 hover:bg-gray-800">Home</Link>
          {user && (
            <>
              <Link href="/servers" className="block p-4 hover:bg-gray-800">Servers</Link>
              <Link href="/direct-messages" className="block p-4 hover:bg-gray-800">Direct Messages</Link>
            </>
          )}
        </nav>
        {user ? (
          <button onClick={() => signOut(auth)} className="p-4 hover:bg-gray-800">Sign Out</button>
        ) : (
          <Link href="/auth" className="p-4 hover:bg-gray-800">Sign In</Link>
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
