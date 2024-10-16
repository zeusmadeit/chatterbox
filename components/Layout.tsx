import React, { ReactNode } from 'react';
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
        <div className="flex flex-row p-4 space-x-4 items-center border-b border-gray-700">
          <Icons.EchoBot className='text-white cursor-pointer w=32 h-12 object-contain'/>
          <span className='font-semibold'>ChatterBox</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <RoomList />
        </nav>
        {user ? (
          <div className="p-4 border-t border-gray-700 flex flex-col">
            <div className='flex flex-row justify-between items-center space-x-3'>
              <span className="flex flex-row items-center space-x-4">
                <img src={user.photoURL? user.photoURL : '/default-avatar.png'} alt="" className="w-6 h-6 rounded-full mr-2" />
                <span>{user.displayName || user.email?.split("@")[0]}</span>
              </span>
              <Icons.Settings className="opacity-70 w-4 h-4 hover:cursor-pointer" />
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
