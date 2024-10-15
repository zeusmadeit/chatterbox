import React, { ReactNode, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Icons } from '@/components/Icons';
import { signOut } from 'firebase/auth';
import RoomList from '@/components/RoomList';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex h-screen bg-[var(--background)]">

      {/* Channels sidebar */}
      <div className="w-60 bg-[var(--channelsbg)] text-[var(--text-normal)] flex flex-col">
        <div className="p-4">
          <Icons.EchoBot className='text-white cursor-pointer w=32 h-12 object-contain'/>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <RoomList />
        </nav>
        {user ? (
          <div className="p-4 border-t border-gray-700 flex flex-col justify-center items-center">
            <img src={user.photoURL || '/default-avatar.png'} alt="User avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>{user.displayName || user.email}</span>
            <button onClick={() => signOut(auth)} className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-normal)]">Sign Out</button>
          </div>
        ) : ("")}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
