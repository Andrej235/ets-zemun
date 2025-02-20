import { Button } from "@ui/button";
import "quill/dist/quill.snow.css";
import { Outlet, useNavigate } from "react-router";
import "./news.scss";

export default function News() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-10 flex flex-col gap-8">
      <div className="flex gap-4">
        <Button onClick={() => navigate("/vesti")}>Prikaži sve člankove</Button>
        <Button onClick={() => navigate("/vesti/napravi")}>
          Napravi novi članak
        </Button>
      </div>

      <Outlet />
    </div>
  );
}

