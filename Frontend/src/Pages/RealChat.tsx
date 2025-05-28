import {HubConnectionBuilder} from '@microsoft/signalr';
import { useState } from 'react';



export default function RealChat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<String[]>([]);

    const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:7170/chathub') 
    .build();

    connection.start();
    
    connection.on('ReceiveMessage', message => {
        setMessages([message]);
    });

    const sendMessage = async () => {
        try {
            await connection.invoke('SendMessage', message);
            setMessage(''); // Clear input after sending
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return <>
    <div className="flex flex-col sm:flex-row mx-auto justify-center mt-10 gap-7">
        <div className="border-1 border-black h-150 w-xs p-4 rounded-xl">
            <h1 className="border-b-2 pb-2">Messages</h1>
            <div className="flex flex-col gap-2 mt-4">
                <div className="border rounded-lg p-3 hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">James Harden</p>
                            <p className="text-sm text-gray-500 truncate">Last message preview here...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="border-2 border-black h-150 w-lg p-4 rounded-xl flex flex-col">
            <h1 className="border-b-2 pb-2">Jane Doe</h1>
            <div className="flex-grow overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 mb-2">
                        <div className="font-medium">Clark</div>
                        <div className="bg-gray-100 rounded-lg p-2">
                            {msg}
                        </div>
                        <div className="text-xs text-gray-500">bossman</div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-4 border-t-2 pt-4">
                <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>
    </div>
    </>
}