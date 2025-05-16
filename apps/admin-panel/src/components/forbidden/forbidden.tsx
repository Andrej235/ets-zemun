import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Forbidden() {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await sendAPIRequest("/users/logout", {
      method: "post",
    });

    if (response.code !== "200") {
      toast.error("Odjavljivanje nije uspelo, molimo pokušajte ponovo");
      return;
    }

    navigate("/auth");
    toast.success("Uspešno ste se odjavili");
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-2 p-16 font-bold">
      <p className="text-4xl">Zabranjen pristup</p>

      <p className="text-muted-foreground mb-8 text-xl">
        Zatrazite pristup od administratora kako biste mogli da pristupite admin
        panelu
      </p>

      <Button onClick={handleLogout} className="w-96">
        Izloguj se
      </Button>
      <p className="text-muted-foreground text-sm">
        Nakon odobrenja, ponovo se ulogujte
      </p>
    </div>
  );
}
