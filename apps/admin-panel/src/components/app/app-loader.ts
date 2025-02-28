import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { LoaderFunctionArgs, redirect } from "react-router";

const appLoader = async (args: LoaderFunctionArgs) => {
  const opened = new URL(args.request.url).pathname;
  if (opened === "/auth" || opened === "/forbidden") return null;

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

