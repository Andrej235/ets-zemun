import createLoader from "@/better-router/create-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

const emailConfirmationLoader = createLoader(async ({ request }) => {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return "no-token";

  const response = await sendAPIRequest("/users/confirm-email", {
    method: "post",
    parameters: {
      token,
    },
  });

  if (response.code !== "200") {
    console.log(response);
    return "bad-token";
  }

  return "success";
});

export default emailConfirmationLoader;
