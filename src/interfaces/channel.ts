import { User } from "./user";

export interface Channel {
  id: string;
  name: string;

  // For private channels in future iterations
  isPrivate?: boolean;
  members?: User[];
}
