"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { useLanguageStore } from "@/stores/language-store";
import { useUserStore } from "@/stores/user-store";
import { useCallback, useEffect, useRef } from "react";

export default function FetchData() {
  const setUser = useUserStore((x) => x.setUser);
  const setLanguages = useLanguageStore((x) => x.setLanguages);

  const currentPromise = useRef<Promise<void> | null>(null);

  const fetch = useCallback(async () => {
    const user = await sendApiRequest("/users/me/role", {
      method: "get",
    });
    setUser(user.response);

    const languages = await sendApiRequest("/language", {
      method: "get",
    });
    setLanguages(languages.response!);
  }, [setUser, setLanguages]);

  useEffect(() => {
    currentPromise.current ??= fetch();
  }, [fetch]);

  return <></>;
}
