import { Message } from "../interfaces/message";

export const messages: Message[] = [
  {
    id: "1",
    content: "Hello!",
    senderId: "user1",
    timestamp: new Date("2023-08-10T08:00:00Z"),
    channelId: "1",
  },
  {
    id: "2",
    content: "Heya!",
    senderId: "user2",
    timestamp: new Date("2023-08-10T08:05:00Z"),
    channelId: "1",
    isReply: true,
    parentId: "1",
  },
  {
    id: "3",
    content: "How's everyone today?",
    senderId: "user1",
    timestamp: new Date("2023-08-10T09:00:00Z"),
    channelId: "2",
  },
  {
    id: "4",
    content: "I'm doing great, thanks!",
    senderId: "user2",
    timestamp: new Date("2023-08-10T09:05:00Z"),
    channelId: "1",
    isReply: true,
    parentId: "3",
  },
  {
    id: "5",
    content: "Don't forget about the meeting at 2 PM.",
    senderId: "user1",
    timestamp: new Date("2023-08-10T10:00:00Z"),
    channelId: "1",
  },
  {
    id: "6",
    content: "Thanks for the reminder!",
    senderId: "user2",
    timestamp: new Date("2023-08-10T10:05:00Z"),
    channelId: "1",
    isReply: true,
    parentId: "5",
  },
];
