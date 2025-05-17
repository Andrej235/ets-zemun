"use client";

import {
  Award,
  BookOpen,
  FileText,
  Globe,
  Home,
  MessageSquare,
  User,
  Users,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

type NavItem = {
  title: string;
  href: string;
  Icon: React.ElementType;
};

const navItems: NavItem[] = [
  { title: "Početna", href: "/", Icon: Home },
  {
    title: "Vesti",
    href: "/vesti",
    Icon: FileText,
  },
  {
    title: "Jezici",
    href: "/jezici",
    Icon: Globe,
  },
  {
    title: "Predmeti",
    href: "/predmeti",
    Icon: BookOpen,
  },
  {
    title: "Obrazovni profili",
    href: "/obrazovni-profili",
    Icon: MessageSquare,
  },
  {
    title: "Nastavnici",
    href: "/nastavnici",
    Icon: Users,
  },
  {
    title: "Nagrade",
    href: "/nagrade",
    Icon: Award,
  },
  { title: "Korisnici", href: "/korisnici", Icon: User },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center gap-4 px-4">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <h1 className="font-normal">Admin Panel</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
