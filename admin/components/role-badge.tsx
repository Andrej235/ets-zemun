import { cn } from "@/lib/utils";

export function RoleBadge({ role }: { role: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        role.toLowerCase() === "admin" &&
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        role.toLowerCase() === "moderator" &&
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        role.toLowerCase() === "teacher" &&
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        role.toLowerCase() === "user" &&
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      )}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </div>
  );
}
