import { format } from "date-fns";

export function formatDate(date: Date): string {
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return `Today at ${format(date, "HH:mm")}`;
  }

  return `${format(date, "MMM dd, yyyy")} at ${format(date, "HH:mm")}`;
}
