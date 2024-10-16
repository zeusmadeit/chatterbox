import { BellIcon, ChatBubbleBottomCenterIcon, HashtagIcon, InboxIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon, UsersIcon, PlusCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState, useEffect } from 'react'
import {useRoomStore} from "@/contexts/RoomStore";
import { collection, onSnapshot, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from "@/lib/firebase"
import firebase from 'firebase/compat/app';
import Message from '@/components/Message';


interface Message {
    id: string;
    name: string;
    photoURL: string;
    email: string;
    message: string;
    userId: string;
    timestamp: any;
}

function Chat() {
    const {activeRoomID, activeRoomName} = useRoomStore();
    const [user] = useAuthState(auth);
    const [newMessage, setNewMessage] = useState(''); // State for the new message
    const chatRef = useRef<null | HTMLDivElement>(null); // Ref for scrolling to bottom
    const [messages, setMessages] = useState<Message[]>([]); // State for messages
    const messagesEndRef = useRef<null | HTMLDivElement>(null); // Ref for scrolling to bottom

    useEffect(() => {
        if(activeRoomID){
            const messagesRef = collection(db, 'rooms', activeRoomID, 'messages');
            const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));
    
            const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Message));
                setMessages(fetchedMessages.reverse());
            });
    
            return () => unsubscribe();
        }
    }, [activeRoomID]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start"});
    }

    const sendMessage = async (e: any) => {
        e.preventDefault();
        if (newMessage !== "" && user && activeRoomID) {
            const messagesRef = collection(db, 'rooms', activeRoomID, 'messages');
            await addDoc(messagesRef, {
                timestamp: new Date(),
                message: newMessage,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
                userId: user?.uid
            });
            setNewMessage("");
        }
        scrollToBottom();
    }

  return (
    <div className='flex flex-col h-screen'>

      <header className='flex items-center justify-between space-x-5 border-b border-b-gray-800 p-4 -mt-1'>
        <div className='flex items-center space-x-1'>
            <HashtagIcon className='h-6 text-[#72767d]'/>
            <h4 className='text-white font-semibold opacity-80'>{activeRoomName}</h4>
        </div>
        <div className='flex space-x-3'>
            <BellIcon className='icon h-6 text-[#72767d] hover:cursor-pointer hover:text-white'/>
            <UsersIcon className='icon h-6 text-[#72767d] hover:cursor-pointer hover:text-white'/>
            <div className='flex bg-[#202225] text-xs p-1 rounded-md'>
                <input type='' placeholder='Search' className='bg-transparent focus:outline-none text-white pl-1 
                placeholder-[#72767d]' />
                <MagnifyingGlassIcon className='h-4 text-[#72767d] mr-1'/>
            </div>
            <InboxIcon className='icon h-6 text-[#72767d] hover:cursor-pointer hover:text-white'/>
            <QuestionMarkCircleIcon className='icon h-6 text-[#72767d] hover:cursor-pointer hover:text-white'/>
        </div>
      </header>

      <main className='flex-grow overflow-y-scroll scrollbar-hide'>
        {messages?.map((doc) => {
            const {message, timestamp, name, photoURL, email} = doc;

            return (
                <Message 
                    key={doc.id} 
                    id={doc.id} 
                    message={message}
                    timestamp={timestamp}
                    name={name? name : email}
                    email={email}
                    photoURL={photoURL}
                />
            );
        })}
        <div ref={chatRef} className='pb-16'/>
      </main>

      <div className='flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg'>
        <PlusCircleIcon className='icon mr-4 h-6 text-[#72767d]'/>
        <form onSubmit={sendMessage} className='flex-grow'>
            <input 
                type='text' 
                disabled={!activeRoomID} 
                placeholder={activeRoomID ? `Message #${activeRoomName}` : "Select a Channel"}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className='bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm' 
            />
            <button hidden type='submit' onClick={sendMessage}>
                Send
            </button>
        </form>
        <div 
            className='p-2 rounded-full text-[#72767d] hover:text-white hover:bg-gray-500 cursor-pointer' 
            onClick={sendMessage}
        >
            <ArrowRightCircleIcon className='icon h-6 '/>
        </div>
      </div>
    </div>
  )
}

export default Chat;
