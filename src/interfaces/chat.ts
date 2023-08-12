import { Channel } from "./channel";
import { Message } from "./message";
import { User } from "./user";

interface ReplyTo {
  messageId: string; 
  userId: string;
}

export interface State {
  channels: Channel[];
  currentChannel: Channel;
  messages: Message[];
  inputMessage: string;
  isMenuOpen: boolean;
  isModalOpen: boolean;
  users: User[];
  currUser: User;
  replyTo: ReplyTo | null;
}

export type Action =
| { type: "SET_INPUT_MESSAGE"; payload: string }
| { type: "SEND_MESSAGE"; payload: Message }
| { type: "REPLY_TO_MESSAGE"; payload: Message }
| { type: "ENTER_REPLY_MODE"; payload: ReplyTo }
| { type: "CANCEL_REPLY_MODE" }
| { type: "SET_NAME"; payload: { newUser: User } }
| { type: "TOGGLE_MENU" };