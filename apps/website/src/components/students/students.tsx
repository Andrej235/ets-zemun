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
          window.location.href = "https://localhost:5000/auth/login";
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const response = await fetch("https://localhost:5000/test/user", {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://localhost:5000",
            },
            credentials: "include",
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

