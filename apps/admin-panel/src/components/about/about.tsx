import Async from "@/better-router/async";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function About() {
  const loaderData = useLoaderData<Schema<"UserResponseDto"> | null>();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await sendAPIRequest("/users/logout", {
      method: "post",
    });

    if (response.code !== "200") return;
    navigate("/auth");
  }

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center gap-16 p-16">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Dobrodošli u admin panel!</h1>

        <p className="text-muted-foreground text-xl">
          Ovde možete da menjate sadržaj sajta
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Async await={loaderData}>
          {(x) => (
            <p className="text-md">
              Trenutno ste ulogovani kao {x?.username ?? "nepoznato"}
            </p>
          )}
        </Async>

        <Button onClick={handleLogout} className="w-32">
          Izloguj se
        </Button>
      </div>
    </div>
  );
}
