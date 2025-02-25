import useLoader from "@/better-router/use-loader";
import teachersLoader from "./teachers-loader";
import LazyAwaitedList from "../lazy-loaded-list/lazy-awaited-list";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function Teachers() {
  const loaderData = useLoader<typeof teachersLoader>();
  const navigate = useNavigate();

  return (
    <div className="flex min-w-full min-h-full justify-center">
      <div className="h-full w-2/3 max-h-full grid grid-cols-3 grid-flow-row gap-8 p-8 rounded-lg">
        <LazyAwaitedList data={loaderData} success="OK">
          {(x) => (
            <Button
              key={x.id}
              variant="ghost"
              className="flex flex-col gap-2 border-2 border-muted w-full h-[40rem] p-6"
              onClick={() => navigate(`/nastavnici/${x.id}`)}
            >
              <img
                src={x.image}
                alt={x.name}
                className="w-max h-max max-w-full max-h-full object-cover text-background/0"
              />
              <h2 className="text-center text-2xl">{x.name}</h2>
            </Button>
          )}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

