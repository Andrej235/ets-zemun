import sendAPIRequest from "@shared/api-dsl/send-api-request";

export default function About() {
  return (
    <div className="about-page">
      <button
        onClick={async () => {
          const response = await sendAPIRequest("/auth", {
            method: "get",
          });
          console.log(response);
        }}
      ></button>
    </div>
  );
}

