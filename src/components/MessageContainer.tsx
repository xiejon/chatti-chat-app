import React from "react";
import Message from "./Message";
import { Message as MessageInterface } from "../interfaces/message";

interface MessageContainerProps {
  messages: MessageInterface[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  const getReplies = (messageId: string) => {
    return messages
      .filter((msg) => msg.parentId === messageId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  return (
    <div>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} replies={getReplies(msg.id)} />
      ))}
    </div>
  );
};

export default MessageContainer;
