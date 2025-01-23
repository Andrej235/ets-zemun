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
          window.location.href = "http://api.localhost.com/auth/login";
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const response = await fetch("http://api.localhost.com/test/user", {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies with the request
          });
          if (!response.ok) console.log(response);

          console.log(await response.text());
        }}
      >
        Get Username
      </button>
    </div>
  );
}

