import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { redirect } from "react-router";

const appLoader = async () => {
  const userStatus = await sendAPIRequest("/auth/user", {
    method: "get",
  });

  if (userStatus.code !== "OK") return redirect("/auth");

  const adminStatus = await sendAPIRequest("/auth/admin", {
    method: "get",
  });

  if (adminStatus.code !== "OK") return redirect("/forbidden");

  return null;
};

export default appLoader;

