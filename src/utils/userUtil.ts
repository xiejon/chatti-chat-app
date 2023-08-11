import { users } from "../data/users";

// Find & return username based off senderId
export function getUsername(senderId: string): string {
  const user = users.find((user) => user.id === senderId);
  return user ? user.username : "Unknown";
}