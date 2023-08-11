export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  channelId: string;
  isReply?: boolean;
  parentId?: string;
}
