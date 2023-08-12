import { Channel } from "./channel";
import { Message } from "./message";
import { User } from "./user";

export interface State {
  channels: Channel[];
  currentChannel: Channel;
  messages: Message[];
  inputMessage: string;
  isMenuOpen: boolean;
  isModalOpen: boolean;
  users: User[];
  currUser: User;
};

export type Action =
  | { type: "SET_INPUT_MESSAGE"; payload: string }
  | { type: "SEND_MESSAGE"; payload: Message }
  | { type: "SET_NAME"; payload: { newUser: User } }
  | { type: "TOGGLE_MENU" };
