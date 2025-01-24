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
          const response = await fetch("https://api.localhost.com/test/user", {
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
            "https://api.localhost.com/test/check-connection",
            {
              method: "GET",
            }
          );

          if (!response.ok) console.log(response);

          console.log(await response.text());
        }}
      >
        Check connection
      </button>

      <br />

      <button
        onClick={async () => {
          const response = await fetch(
            "https://api.localhost.com/test/cookie",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) console.log(response);
          console.log(await response.text());
        }}
      >
        Get test cookie
      </button>
    </div>
  );
}

