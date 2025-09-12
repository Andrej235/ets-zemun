"use client";

import { useUserStore } from "@/stores/user-store";

export default function RecentLoginsDescription() {
  const user = useUserStore((x) => x.user);

  if (!user) return "Učitavanje...";

  if (user.role === "Admin")
    return "Najnovije prijave na administratorski panel škole";

  return "Najnovije prijave na vaš nalog. Ako ne prepoznajete neku prijavu, molimo vas da kontaktirate administratora u najkraćem roku.";
}
