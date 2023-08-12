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
  currUser: User;
  onReply: (parentId: string, userId: string) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  replies,
  users,
  currUser,
  onReply,
}) => {
  const handleReplyClick = () => {
    onReply(message.id, message.senderId);
  };

  // Align right if message is from currUser and is not a reply
  const alignRight = message.senderId === currUser.id && !message.isReply

  return (
    <div className={`flex mt-4 ${alignRight? 'flex-row-reverse' : ''}`}>
        <figure className="">
        <Image src="/avatar.svg" alt="avatar" width={50} height={50} />
      </figure>
      <section className={`ml-2 ${alignRight ? 'text-right mr-2' : ''}`}>
        <div>
          <strong>{getUsername(message.senderId, users)}</strong>
          <time className="ml-2 text-sm">{formatDate(message.timestamp)}</time>
        </div>
        <p>{message.content}</p>
        {replies.map((reply) => (
          <Message
            key={reply.id}
            message={reply}
            replies={[]}
            users={users}
            currUser={currUser}
            onReply={onReply}
          />
        ))}
        {!message.isReply && (
          <button className="text-xs text-red" onClick={handleReplyClick}>
            reply
          </button>
        )}
      </section>
    </div>
  );
};

export default Message;
