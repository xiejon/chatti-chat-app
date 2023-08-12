import React from "react";
import { Message as MessageInterface } from "../interfaces/message";
import Image from "next/image";
import { formatDate } from "../utils/dateUtil";
import { getUsername } from "../utils/userUtil";
import { User } from "../interfaces/user";

interface MessageProps {
  message: MessageInterface;
  replies: MessageInterface[];
  users: User[];
}

const Message: React.FC<MessageProps> = ({ message, replies, users }) => {
  return (
    <div className="flex mt-4">
      <figure>
        <Image src="/avatar.svg" alt="avatar" width={50} height={50} />
      </figure>
      <section className="ml-2">
        <div>
          <strong>{getUsername(message.senderId, users)}</strong>
          <time className="ml-2 text-sm">{formatDate(message.timestamp)}</time>
        </div>
        <p>{message.content}</p>
        {replies.map((reply) => (
          <Message key={reply.id} message={reply} replies={[]} users={users} />
        ))}
      </section>
    </div>
  );
};

export default Message;
