import useLoader from "@/better-router/use-loader";
import educationalProfilesLoader from "./edu-profiles-loader";
import Async from "@/better-router/async";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useRevalidator } from "react-router";
import { useRef } from "react";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

export default function EducationalProfiles() {
  const loaderData = useLoader<typeof educationalProfilesLoader>();
  const { revalidate } = useRevalidator();

  const isWaitingForResponse = useRef(false);

  async function handleCreate(name: string) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/profile", {
      method: "post",
      payload: {
        name,
        generalSubjects: [],
        vocationalSubjects: [],
      },
    });

    if (response.code !== "Created") return;
    isWaitingForResponse.current = false;
    revalidate();
  }

  return (
    <div className="flex flex-col gap-4">
      <Async await={loaderData}>
        {(data) => {
          if (data.code !== "OK") return;
          const profiles = data.content;

          return profiles.map((profile) => (
            <div key={profile.id}>
              <h1>{profile.id}</h1>
              <p>{profile.name}</p>
            </div>
          ));
        }}
      </Async>

      <AlertDialog>
        <AlertDialogTrigger className="fixed bottom-16 right-16 w-24 h-24 rounded-full bg-accent grid place-items-center hover:bg-accent/90 border-2 border-transparent hover:border-slate-700 transition-colors">
          <Plus className="w-12 h-12" />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Napravi novi profile</AlertDialogTitle>
            <AlertDialogDescription>
              Unesi ime novog profila
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Input placeholder="Ime profila" />
          <div className="flex gap-4">
            <AlertDialogCancel>Odustani</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                const name = (
                  (e.target as HTMLElement).parentElement
                    ?.previousElementSibling as HTMLInputElement
                )?.value?.trim();

                if (!name) return;
                handleCreate(name);
              }}
            >
              Napravi
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

