import { Message } from "../interfaces/message";

export const messages: Message[] = [
  {
    id: "1",
    content: "Hello!",
    senderId: "user1",
    timestamp: new Date(),
    channelId: "1",
  },
  {
    id: "2",
    content: "Heya!",
    senderId: "user2",
    timestamp: new Date(),
    channelId: "1",
    isReply: true,
    parentId: "1",
  },
];
