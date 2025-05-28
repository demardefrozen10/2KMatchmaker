import React, { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

const ChatComponent: React.FC = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [targetUser, setTargetUser] = useState("");
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState<string[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");


        console.log("Token sent to SignalR:", token);

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

                newConnection.on("ReceiveMessage", (fromUser, msg) => {
                    console.log(fromUser, msg);
                    setChatLog(prev => [...prev, `${fromUser}: ${msg}`]);
                });
            })
            .catch(err => console.error("SignalR connection error:", err));

        setConnection(newConnection);
    }, []);

    const sendPrivateMessage = async () => {
        if (connection) {
            try {
                await connection.invoke("SendPrivateMessage", targetUser, message);
                setChatLog(prev => [...prev, `You to ${targetUser}: ${message}`]);
                setMessage("");
            } catch (err) {
                console.error("Failed to send message:", err);
            }
        }
    };

    return (
        <div style={{ padding: "1rem", maxWidth: 400, margin: "0 auto" }}>
            <h3>Private Chat</h3>
            <input
                type="text"
                placeholder="Recipient Username"
                value={targetUser}
                onChange={e => setTargetUser(e.target.value)}
                style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <input
                type="text"
                placeholder="Your message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ width: "100%", marginBottom: "0.5rem" }}
                onKeyDown={e => e.key === "Enter" && sendPrivateMessage()}
            />
            <button onClick={sendPrivateMessage} style={{ width: "100%" }}>
                Send
            </button>
            <div style={{ marginTop: "1rem", maxHeight: 200, overflowY: "auto", border: "1px solid #ccc", padding: "0.5rem" }}>
                {chatLog.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>
        </div>
    );
};

export default ChatComponent;
