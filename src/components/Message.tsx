import React from "react";
import { Message as MessageInterface } from "../interfaces/message";
import Image from "next/image";
import { formatDate } from "../utils/dateUtil"; 

interface MessageProps {
  message: MessageInterface;
  replies: MessageInterface[];
}

const Message: React.FC<MessageProps> = ({ message, replies }) => {
  return (
    <div className="flex mt-4">
      <figure>
        <Image src="/avatar.svg" alt="avatar" width={50} height={50} />
      </figure>
      <section className="ml-2">
        <div>
          <strong>{message.senderId}</strong>
          <time className="ml-2 text-sm">{formatDate(message.timestamp)}</time>
        </div>
        <p>{message.content}</p>
        {replies.map(reply => (
            <Message key={reply.id} message={reply} replies={[]}/>
        ))}
      </section>
    </div>
  );
};

export default Message;
