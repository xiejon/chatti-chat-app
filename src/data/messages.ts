import { Message } from "../interfaces/message";

// Sample messages
export const messages: Message[] = [
  {
    id: "1",
    content: "Welcome to Chatti 😃",
    senderId: "1",
    timestamp: new Date("2023-08-10T08:00:00Z"),
    channelId: "1",
  },
  {
    id: "2",
    content: "Type a message below, or click 'reply' to continue this thread",
    senderId: "2",
    timestamp: new Date("2023-08-10T08:05:00Z"),
    channelId: "1",
    isReply: true,
    parentId: "1",
  },
  {
    id: "3",
    content: "Surf this weekend anyone? 🏄‍♀️",
    senderId: "1",
    timestamp: new Date("2023-08-10T08:06:00Z"),
    channelId: "2",
  },
];
