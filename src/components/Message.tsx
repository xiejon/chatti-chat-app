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
  onReply: (parentId: string) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  replies,
  users,
  onReply,
}) => {

  const handleReplyClick = () => {
    onReply(message.id);
  };

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
          <Message
            key={reply.id}
            message={reply}
            replies={[]}
            users={users}
            onReply={onReply}
          />
        ))}
        {!message.isReply && (
          <button
            onClick={handleReplyClick}
          >
            <Image src="/corner-down-right.svg" alt="reply" width={20} height={20} />
          </button>
        )}
      </section>
    </div>
  );
};

export default Message;
