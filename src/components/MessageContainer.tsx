import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";
import { Message as MessageInterface } from "../interfaces/message";
import { User } from "../interfaces/user";

interface MessageContainerProps {
  messages: MessageInterface[];
  users: User[];
  currUser: User;
  onReply: (parentId: string, userId: string) => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  users,
  currUser,
  onReply,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // If new message is added, scroll down to newest message
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

  const handleReplyClick = (parentId: string, userId: string) => {
    onReply(parentId, userId);
  };

  // Filter only the parent messages
  const parentMessages = messages.filter((msg) => !msg.isReply);

  return (
    <div className="mx-4 mb-4 h-[400px] md:h-[500px] overflow-scroll">
      {parentMessages.map((msg) => (
        <Message
          key={msg.id}
          message={msg}
          replies={getReplies(msg.id)}
          users={users}
          currUser={currUser}
          onReply={() => handleReplyClick(msg.id, msg.senderId)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
