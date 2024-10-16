"use client";

import React, { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Icons } from '@/components/Icons';
import { signOut } from 'firebase/auth';
import RoomList from '@/components/RoomList';
import { useRouter, usePathname } from 'next/navigation';
// import default_profile_pic from '@/public/images/default-profile-pic.jpg';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname()

  const handleDisplayProfile = () => {
    router.push('/profile');
  }

  return (
    <div className="flex h-screen bg-[var(--background)]">

      {/* Channels sidebar */}
      <div className="w-60 bg-[var(--channelsbg)] text-[var(--text-normal)] flex flex-col">
        <div className="flex flex-row p-4 space-x-4 items-center border-b border-gray-700">
          <Icons.EchoBot className='text-white cursor-pointer w=32 h-12 object-contain'/>
          <span className='font-semibold'>ChatterBox</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {pathname === "/rooms"? 
            <RoomList /> : 
            <ul>
              <li key="rooms" onClick={() => router.push("/rooms")} className="flex flex-row font-sm p-4 mb-2 text-white text-start hover:bg-gray-500 hover:cursor-pointer opacity-80">
                Rooms
              </li>
            </ul>
          }
        </nav>
        {user ? (
          <div className="p-4 border-t border-gray-700 flex flex-col">
            <div className='flex flex-row justify-between items-center space-x-3'>
              <span className="flex flex-row items-center space-x-4">
                <img src={user.photoURL? user.photoURL : ""} alt="" className="w-6 h-6 rounded-full mr-2" />
                <span>{user.displayName || user.email?.split("@")[0]}</span>
              </span>
              <div className="p-2 bg-gray-500 rounded-lg cursor-pointer" onClick={handleDisplayProfile}>
                <Icons.Settings className="opacity-70 hover:opacity-100 w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center align-center">
              <button onClick={() => signOut(auth)} className="text-center py-4 text-[var(--text-muted)] font-semibold hover:text-red-400">
                Sign Out
              </button>
            </div>
          </div>
        ) : ("")}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
