export default function Students() {
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
          const response = await fetch("https://api.localhost.com/auth", {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (!response.ok) console.log(response);

          console.log(await response.text());
        }}
      >
        Get Username
      </button>

      <br />

      <button
        onClick={async () => {
          const response = await fetch(
            "https://api.localhost.com/auth/logout",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) console.log(response);
          console.log(await response.text());
        }}
      >
        Logout
      </button>
    </div>
  );
}

