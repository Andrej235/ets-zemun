import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import { useNavigate, useRevalidator } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import educationalProfilesLoader from "./edu-profiles-loader";

export default function EducationalProfiles() {
  const loaderData = useLoader<typeof educationalProfilesLoader>();
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

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

    if (response.code !== "201") return;
    isWaitingForResponse.current = false;
    revalidate();
  }

  async function handleDelete(
    profile: Schema<"SimpleEducationalProfileResponseDto">
  ) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/profile/{id}", {
      method: "delete",
      parameters: {
        id: profile.id,
      },
    });

    if (response.code !== "204") return;
    isWaitingForResponse.current = false;
    revalidate();
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-2xl">Id</TableHead>
            <TableHead className="text-2xl">Ime</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          <Async await={loaderData}>
            {(data) => {
              if (data.code !== "200") return;
              const profiles = data.content;

              return profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="text-3xl min-w-32">
                    {profile.id}
                  </TableCell>
                  <TableCell className="text-3xl w-full">
                    {profile.name}
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger className="min-h-full w-24 h-24 flex justify-center ml-4 hover:bg-red-500 rounded-md transition-colors">
                        <Trash2 className="min-h-full! aspect-square" />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="min-w-max">
                        <AlertDialogHeader className="min-w-max">
                          <AlertDialogTitle className="text-3xl">
                            Potvrda brisanja
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-xl">
                            Da li ste sigurni da zelite da obrisete ovaj
                            obrazovni profil?
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="mt-8 gap-4">
                          <AlertDialogCancel className="text-xl h-12 w-48">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="text-xl h-12 w-48"
                            onClick={() => handleDelete(profile)}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <button
                      className="w-24 h-24 grid place-items-center rounded-md hover:bg-slate-700 hover:text-accent-foreground"
                      onClick={() => navigate(`/profili/${profile.id}`)}
                    >
                      <Edit className="min-h-full! aspect-square" />
                    </button>
                  </TableCell>
                </TableRow>
              ));
            }}
          </Async>
        </TableBody>
      </Table>

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

