import React from "react";
import { useRef, useEffect } from "react";
import Message from "./Message";
import { Message as MessageInterface } from "../interfaces/message";
import { User } from "../interfaces/user";

interface MessageContainerProps {
  messages: MessageInterface[];
  users: User[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  users,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getReplies = (messageId: string) => {
    return messages
      .filter((msg) => msg.parentId === messageId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  return (
    <div className="mx-4 mb-4 h-[400px] md:h-[500px] overflow-scroll">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          message={msg}
          replies={getReplies(msg.id)}
          users={users}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
