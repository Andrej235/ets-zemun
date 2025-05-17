"use client";

import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useRef } from "react";

export default function FetchData() {
  const setUser = useUserStore((x) => x.setUser);

  const currentPromise =
    useRef<Promise<Schema<"UserResponseDto"> | null> | null>(null);

  useEffect(() => {
    currentPromise.current ??= sendApiRequest("/users/me/role", {
      method: "get",
    }).then(({ response }) => response);

    (async () => {
      const user = await currentPromise.current;
      setUser(user);
    })();
  }, [setUser]);

  return <></>;
}
