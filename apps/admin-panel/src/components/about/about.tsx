import sendAPIRequest from "@shared/api-dsl/send-api-request";

export default function About() {
  return (
    <div className="about-page">
      <br />
      <br />
      <br />
      <br />
      <br />

      <button
        onClick={async () => {
          const response = await sendAPIRequest("/auth", {
            method: "get",
          });
          console.log(response);
        }}
      >
        Get auth claims
      </button>
    </div>
  );
}

