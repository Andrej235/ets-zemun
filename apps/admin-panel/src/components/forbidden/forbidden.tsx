import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function Forbidden() {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await sendAPIRequest("/auth/logout", {
      method: "delete",
    });

    if (response.code !== "No Content") return;
    navigate("/auth");
  }

  return (
    <div className="w-full h-full p-16 flex flex-col gap-8 justify-center items-center font-bold">
      <p className="text-5xl">Zabranjen pristup</p>

      <p className="text-2xl"> 
        Zatrazite pristup od administratora kako biste mogli da pristupite admin
        panelu
      </p>
      <p className="text-2xl">Nakon odobrenja, izlogujte se i ponovo ulogujte</p>
      <Button onClick={handleLogout} className="w-96 h-16 text-2xl">Izloguj se</Button>
    </div>
  );
}

