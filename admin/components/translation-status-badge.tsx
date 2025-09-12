import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

export type TranslationStatus = "complete" | "missing";

export function TranslationStatusBadge({
  status,
  language,
}: {
  status: TranslationStatus;
  language: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        status === "complete" &&
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        status === "missing" &&
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      )}
    >
      {status === "complete" && <CheckCircle2 className="mr-1 h-3 w-3" />}
      {status === "missing" && <XCircle className="mr-1 h-3 w-3" />}
      {language}
    </div>
  );
}
