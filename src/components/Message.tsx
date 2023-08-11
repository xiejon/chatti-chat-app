import React from "react";
import { Message as MessageInterface } from "../interfaces/message";
import Image from "next/image";
import { formatDate } from "../utils/dateFormat"; 

interface MessageProps {
  message: MessageInterface;
  replies: MessageInterface[];
}

const Message: React.FC<MessageProps> = ({ message, replies }) => {
    console.log(message)
  return (
    <div className="flex">
      <div>
        <Image src="/avatar.svg" alt="avatar" width={50} height={50} />
      </div>
      <div>
        <div>
          <div>{message.senderId}</div>
          <div>{formatDate(message.timestamp)}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
