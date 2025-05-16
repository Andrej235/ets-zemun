import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { LoaderFunctionArgs, redirect } from "react-router";

const appLoader = async (args: LoaderFunctionArgs) => {
  const opened = new URL(args.request.url).pathname;
  if (opened === "/auth" || opened === "/forbidden") return null;

  const userStatus = await sendAPIRequest("/users/me/role", {
    method: "get",
  });

  if (userStatus.code !== "200") return redirect("/auth");

  const hasAccess = userStatus.content.role !== "User";
  if (!hasAccess) return redirect("/forbidden");

  return null;
};

export default appLoader;
