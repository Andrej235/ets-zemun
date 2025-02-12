import sendAPIRequest from "@shared/api-dsl/send-api-request";

export default function AdminLogin() {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <button
        onClick={async () => {
          window.location.href = "https://api.localhost.com/auth/login";
        }}
      >
        Login
      </button>

      <br />

      <button
        onClick={async () => {
          const response = await sendAPIRequest("/auth", {
            method: "get",
          });

          if (response.code === "OK") console.log(response);
          else console.error(response);
        }}
      >
        Get Username
      </button>

      <br />

      <button
        onClick={async () => {
          const response = await sendAPIRequest("/auth/logout", {
            method: "get",
          });

          if (response.code === "OK") console.log(response);
          else console.error(response);
        }}
      >
        Logout
      </button>

      <a href={"https://admin.localhost.com"}>Admin page</a>
    </div>
  );
}

