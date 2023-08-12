import { User } from "../interfaces/user";

// Find & return username based off senderId
export function getUsername(senderId: string, users: User[]): string {
  const user = users.find((user) => user.id === senderId);
  return user ? user.username : "Unknown";
}