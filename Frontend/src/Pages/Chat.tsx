import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import useFetch from "@/Hooks/useFetch";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";

export interface Message {
    message: string;
    SentAt: Date;
    isSent: boolean;
  }

const ChatComponent: React.FC = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [targetUser, setTargetUser] = useState("");
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState<Message[]>([]);
    const [usernames, setUsernames] = useState<string[]>([]);

    const getUsernames = () => {
        const {get} = useFetch("https://localhost:7170/api/message/recipients/");
         const username = localStorage.getItem("username")!;
         try {
           get(username).then((data: string[]) => {
           setUsernames(data);
         })
       }
       catch (error) {
         console.log("error!");
       }
 }

 const getChatHistory = (recieverUsername: string) => {
        const {get} = useFetch("https://localhost:7170/api/message/history/");
        try {
            const queryParams = new URLSearchParams();
            queryParams.append("recipientUsername", recieverUsername);
            queryParams.append("senderUsername", localStorage.getItem("username")!);
            const queryString = queryParams.toString();
            get(`?${queryString}`).then((data: Message[]) => {
                setChatLog(data);
                setTargetUser(recieverUsername);
            });
        }
        catch(error) {
            console.log("error!");
        }
 }

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        getUsernames();

        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7170/chathub", {
                accessTokenFactory: () => token || ""
            })
            .withAutomaticReconnect()
            .build();
        

        newConnection
            .start()
            .then(() => {
                console.log("Connected to SignalR");

                newConnection.on("ReceiveMessage", (message) => {
                    setChatLog(prev => [...prev, {
                        message: `${message}`,
                        SentAt: new Date(),
                        isSent: false
                    }]);
                });
            })
            .catch(err => console.error("SignalR connection error:", err));

        setConnection(newConnection);
    }, []);

    const sendPrivateMessage = async () => {
        if (connection) {
            try {
                await connection.invoke("SendPrivateMessage", targetUser, message);
                setChatLog(prev => [...prev, {
                    message: `${message}`,
                    SentAt: new Date(),
                    isSent: true
                }]);                
                setMessage("");
            } catch (err) {
                console.error("Failed to send message:", err);
            }
        }
    };




    return (
        <div className="container mx-auto w-full md:w-2/4 h-screen p-2 md:p-4">
            <div className="flex flex-col md:flex-row h-200 bg-gray-100 p-2 md:p-4 rounded-xl">
                {/* Left sidebar - Chat list */}
                <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg md:mr-4 overflow-y-auto mb-4 md:mb-0">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Chats</h2>
                    </div>
                    <div className="divide-y">
                        {/* Chat list items */}
                        {usernames.map((username, index) => 
                                <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => {
                                    getChatHistory(username);
                                }}>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">{username}</p>
                                    </div>
                                </div>
                            </div>
                            
                        )}    
                    </div>
                </div>
        
                {/* Right side - Chat area */}
                <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col h-[500px] md:h-auto">
                    {/* Chat header */}
                    <div className="p-3 md:p-4 border-b">
                        <h2 className="text-lg md:text-xl font-semibold">{targetUser || "Select a chat"}</h2>
                    </div>
        
                    {/* Messages area */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4">
                    <ChatMessageList>
                    {chatLog
                    .map((chat, index) => (
                        
                        <ChatBubble key={index} variant={chat.isSent ? 'sent' : 'received'}>
                            <ChatBubbleAvatar 
                                fallback={chat.isSent ? 'You' : targetUser?.charAt(0)} 
                            />
                            <ChatBubbleMessage variant={chat.isSent ? 'sent' : 'received'}>
                                {chat.message}
                            </ChatBubbleMessage>
                        </ChatBubble>
                    ))}
                    </ChatMessageList>

                    </div>
        
                    {/* Input area */}
                    <div className="p-3 md:p-4 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type a message..."
                            />
                            <button
                                onClick={sendPrivateMessage}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
