import useLoader from "@/better-router/use-loader";
import fullTeacherLoader from "./full-teacher-loader";
import Async from "@/better-router/async";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
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
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { useNavigate } from "react-router";
import { useRef } from "react";

export default function FullTeacher() {
  const loaderData = useLoader<typeof fullTeacherLoader>();
  const navigate = useNavigate();
  const isWaitingForResponse = useRef(false);

  async function handleDelete(teacher: Schema<"TeacherResponseDto">) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/teacher/{id}", {
      method: "delete",
      parameters: {
        id: teacher.id,
      },
    });

    isWaitingForResponse.current = false;
    if (response.code !== "No Content") alert(response);
    navigate("/nastavnici");
  }

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.code !== "OK") return null;
        const teacher = data.content;

        return (
          <div>
            <h1>{teacher.name}</h1>
            <p>{teacher.bio}</p>
            <img src={teacher.image} alt={teacher.name} />

            <AlertDialog>
              <AlertDialogTrigger>Obriši</AlertDialogTrigger>

              <AlertDialogContent className="min-w-max">
                <AlertDialogHeader className="flex flex-col min-w-max">
                  <AlertDialogTitle className="text-4xl">
                    Da li ste sigurni da želite da obrišete ovog nastavnika?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                    Ova akcija je{" "}
                    <span className="text-red-500 font-bold">nepovratna</span>
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="text-2xl h-16 w-32 mr-4">
                    Odustani
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 text-foreground hover:bg-red-900 text-2xl h-16 w-32"
                    onClick={() => handleDelete(teacher)}
                  >
                    Obrisi
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      }}
    </Async>
  );
}

