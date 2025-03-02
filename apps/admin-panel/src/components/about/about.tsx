import Async from "@/better-router/async";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function About() {
  const loaderData = useLoaderData<Schema<"GetUserResponseDto"> | null>();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await sendAPIRequest("/auth/logout", {
      method: "delete",
    });

    if (response.code !== "204") return;
    navigate("/auth");
  }

  return (
    <div className="flex flex-col gap-16 p-16 justify-center h-full items-center">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-5xl">Dobrodošli u admin panel!</p>
        <p className="text-3xl text-muted-foreground">
          Ovde možete da menjate sadržaj sajta
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Async await={loaderData}>
          {(x) => (
            <p className="text-3xl">
              Trenutno ste ulogovani kao {x?.username ?? "nepoznato"}
            </p>
          )}
        </Async>

        <Button onClick={handleLogout} className="w-96 h-16 text-2xl">
          Izloguj se
        </Button>
      </div>
    </div>
  );
}

