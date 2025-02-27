import useLoader from "@/better-router/use-loader";
import educationalProfilesLoader from "./edu-profiles-loader";
import Async from "@/better-router/async";
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
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate, useRevalidator } from "react-router";
import { useRef } from "react";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";

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

    if (response.code !== "Created") return;
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

    if (response.code !== "No Content") return;
    isWaitingForResponse.current = false;
    revalidate();
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Ime</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          <Async await={loaderData}>
            {(data) => {
              if (data.code !== "OK") return;
              const profiles = data.content;

              return profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.id}</TableCell>
                  <TableCell>{profile.name}</TableCell>

                  <TableCell className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Potvrda brisanja</AlertDialogTitle>
                          <AlertDialogDescription>
                            Da li ste sigurni da zelite da obrisete ovaj
                            obrazovni profil?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(profile)}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button onClick={() => navigate(`/profili/${profile.id}`)}>
                      <Edit />
                    </Button>
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

