'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/lib/firebase"
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import robotImage from "@/public/images/robot.svg";


const Home = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <div className='flex flex-col h-screen overflow-x-hidden bg-discord_blue'>
      <header className='flex items-center justify-between py-4 px-6 bg-discord_blue'>
        <a href='/'>
          <Icons.EchoBot className='text-white cursor-pointer w=32 h-12 object-contain'/>
        </a>
        <div className='hidden lg:flex space-x-10 text-white'>
          <a className='link'>Download</a>
          <a className='link'>Nitro</a>
          <a className='link'>Discover</a>
          <a className='link'>Safety</a>
          <a className='link'>Support</a>
          <a className='link'>blog</a>
          <a className='link'>Careers</a>
        </div>
        <div className='flex space-x-4'>
          <button 
            className='bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple
            transition duration-200 ease-in-out whitespace-nowrap font-medium'
            onClick={!user ? () => router.push("/auth") : () => router.push("/rooms")}>
            {!user ? "Login" : "Open Chat"}
          </button>
        </div>
      </header>
      {/* body */}
      <div className='flex lg:-top-44 lg:justify-center md:justify-start bg-discord_blue pb-8 md:pb-0'>
        <div className=' p-7 py-9 h-screen md:h-[72vh] md:flex relative'>
          <div className=' flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center'>
            <h1 className=' flex lg:justify-center text-5xl text-white font-bold'>CHATTERBOX</h1>
            <h2 className=' flex lg:justify-center text-white text-lg tracking-wide lg:max-w-3xl w-full text-center font-semibold'>Making it easy to connect with friends, talk every day and hang out more often.</h2>
            <div className=' flex lg:justify-center flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6'>
                <button className='bg-white p-5 rounded-xl font-bold hover:shadow-2xl hover:bg-opacity-95 text-discord_blurple'>
                  Download for Mac
                </button>
                <button
                  className='bg-gray-900 py-5 px-10 rounded-xl font-bold hover:shadow-2xl text-white hover:bg-gray-800'
                  onClick={!user ? () => router.push("/auth") : () => router.push("/rooms")}
                >
                  Open in browser
                </button>
            </div>
          </div>
          <Image
            priority
            src={robotImage}
            alt=""
            className='h-auto'
          />
        </div>
      </div>
    
    </div>
  );
};

export default Home;

