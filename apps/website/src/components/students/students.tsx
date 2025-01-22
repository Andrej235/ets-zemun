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
          window.location.href = "http://api.localhost.com:8080/auth/login";
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const response = await fetch("http://api.localhost.com:8080/auth", {
            headers: {
              "Content-Type": "application/json",
            },
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

