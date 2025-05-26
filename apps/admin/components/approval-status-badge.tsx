import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ApprovalStatusBadge({
  isApproved,
}: {
  isApproved: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        isApproved
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      )}
    >
      {isApproved ? (
        <>
          <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
        </>
      ) : (
        <>
          <AlertTriangle className="mr-1 h-3 w-3" /> Pending Approval
        </>
      )}
    </div>
  );
}
