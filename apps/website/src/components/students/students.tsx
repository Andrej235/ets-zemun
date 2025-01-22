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
          window.location.href = "http://localhost:5212/auth/login";
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const response = await fetch("http://localhost:5212/test/user", {
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

