import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Button } from "../ui/button";

export default function About() {
  return (
    <div className="about-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      Admin Panel
      <Button
        onClick={async () => {
          const response = await sendAPIRequest("/auth/logout", {
            method: "delete",
          });

          if (response.code !== "No Content") return;
          window.location.href = "https://localhost.com";
        }}
      >
        Logout
      </Button>
    </div>
  );
}

