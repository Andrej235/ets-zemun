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
        onClick={() => {
          sendAPIRequest("/auth/logout", {
            method: "delete",
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
}

