"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import sendApiRequest from "@/api-dsl/send-api-request";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export function NavUser() {
  const setUser = useUserStore((x) => x.setUser);
  const user = useUserStore((x) => x.user);
  const { isMobile } = useSidebar();
  const isWaitingForResponse = useRef(false);
  const router = useRouter();

  if (!user) return <></>;

  async function handleLogout() {
    if (isWaitingForResponse.current) {
      toast.info("Please wait...", {
        duration: 3000,
      });
      return;
    }
    isWaitingForResponse.current = true;

    const promise = sendApiRequest("/users/logout", {
      method: "post",
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(response.error?.message ?? "Failed to logout");
      }),
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    isWaitingForResponse.current = false;
    if (!response.isOk) return;

    setUser(null);
    router.replace("/login");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Izlogujte se
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
