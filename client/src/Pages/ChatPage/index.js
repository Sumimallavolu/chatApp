import React, { useEffect, useState, useRef } from "react";
import ChatBar from "../../Components/ChatBar";
import ChatBody from "../../Components/ChatBody";
import ChatFooter from "../../Components/ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState([]);
  const lastMessageRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const handleTypingResponse = (data) => {
      setTypingStatus(data);

      // Clear the previous timeout if there is any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to clear the typing status
      timeoutRef.current = setTimeout(() => {
        setTypingStatus(null);
        socket.off("typingResponse", handleTypingResponse);
      }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    };

    socket.on("typingResponse", handleTypingResponse);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      socket.off("typingResponse", handleTypingResponse);
    };
  }, [socket]);


  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          socket={socket}
          typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};
export default ChatPage;
