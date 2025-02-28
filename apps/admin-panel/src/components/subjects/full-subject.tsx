import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import i18n from "@/i18n";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import LazyLoadedList from "../lazy-loaded-list/lazy-loaded-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import fullSubjectLoader from "./full-subject-loader";

export default function FullSubject() {
  const loaderData = useLoader<typeof fullSubjectLoader>();

  async function updateTranslation(
    subject: Schema<"SubjectResponseDto">,
    newName: string,
    newDesc: string,
    languageCode: string
  ) {
    if (subject.name === "" && subject.description === "") {
      const response = await sendAPIRequest("/subject/translation", {
        method: "post",
        payload: {
          name: newName,
          description: newDesc,
          subjectId: subject.id,
          languageCode,
        },
      });

      if (response.code !== "Created") alert(response);
      return;
    }

    const response = await sendAPIRequest("/subject/translation", {
      method: "put",
      payload: {
        name: newName,
        description: newDesc,
        subjectId: subject.id,
        languageCode,
      },
    });

    if (response.code !== "No Content") alert(response);
  }

  const [initialTeachers, setInitialTeachers] = useState<number[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const { id: subjectId } = useParams();

  useEffect(() => {
    loaderData.subject.then((x) => {
      const initialTeachers =
        x.code === "OK" ? x.content.teachers.items.map((x) => x.id) : [];
      setInitialTeachers(initialTeachers);
      setSelectedTeachers(initialTeachers);
    });
  }, [loaderData]);

  async function saveTeacherChanges() {
    if (!subjectId || isNaN(+subjectId)) return;

    initialTeachers
      .filter((x) => !selectedTeachers.includes(x))
      .forEach((id) =>
        sendAPIRequest("/teacher/{teacherId}/subject/{subjectId}", {
          method: "delete",
          parameters: {
            subjectId: +subjectId,
            teacherId: id,
          },
        })
      );

    selectedTeachers
      .filter((x) => !initialTeachers.includes(x))
      .forEach((id) =>
        sendAPIRequest(`/teacher/subject`, {
          method: "post",
          payload: {
            subjectIds: [+subjectId],
            teacherId: id,
          },
        })
      );

    setInitialTeachers(selectedTeachers);
  }

  const [currentPage, setCurrentPage] = useState<
    Schema<"SimpleTeacherResponseDto">[] | null
  >(null);
  const isLoadingData = useRef(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (isLoadingData.current) return;
    isLoadingData.current = true;

    loaderData.teachers.then((x) => {
      isLoadingData.current = false;
      setCurrentPage(x.code === "OK" ? x.content.items : []);
    });
  }, [loaderData]);

  function handleNextClick() {
    if (isLoadingData.current) return;
    isLoadingData.current = true;

    sendAPIRequest("/teacher/simple", {
      method: "get",
      parameters: {
        limit: 9,
        offset: 9 * (pageCount + 1),
        languageCode: i18n.language,
      },
    }).then(async (x) => {
      setCurrentPage(
        (prev) => prev?.concat(x.code === "OK" ? x.content.items : []) ?? []
      );
      setPageCount(pageCount + 1);
      isLoadingData.current = false;
    });
  }

  return (
    <div>
      <div>
        <h1>Prevodi</h1>

        <div>
          <h2>Српски (ћирилица)</h2>

          <Async await={loaderData.translations.sr}>
            {(data) => {
              if (data.code !== "OK") return null;

              return (
                <div className="flex gap-4">
                  <Input defaultValue={data.content.name} />

                  <Textarea defaultValue={data.content.description} />

                  <Button
                    variant="outline"
                    className="group min-h-20 min-w-20 p-4"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const name = (
                        target.previousElementSibling
                          ?.previousElementSibling as HTMLInputElement
                      ).value;
                      const description = (
                        target.previousElementSibling as HTMLInputElement
                      ).value;

                      updateTranslation(data.content, name, description, "sr");
                    }}
                  >
                    <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                  </Button>
                </div>
              );
            }}
          </Async>
        </div>

        <div>
          <h2>Srpski (latinica)</h2>

          <Async await={loaderData.translations.sr_lt}>
            {(data) => {
              if (data.code !== "OK") return null;

              return (
                <div className="flex gap-4">
                  <Input defaultValue={data.content.name} />
                  <Textarea defaultValue={data.content.description} />
                  <Button
                    variant="outline"
                    className="group min-h-20 min-w-20 p-4"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const name = (
                        target.previousElementSibling
                          ?.previousElementSibling as HTMLInputElement
                      ).value;
                      const description = (
                        target.previousElementSibling as HTMLInputElement
                      ).value;

                      updateTranslation(
                        data.content,
                        name,
                        description,
                        "sr_lt"
                      );
                    }}
                  >
                    <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                  </Button>
                </div>
              );
            }}
          </Async>
        </div>

        <div>
          <h2>English</h2>

          <Async await={loaderData.translations.en}>
            {(data) => {
              if (data.code !== "OK") return null;

              return (
                <div className="flex gap-4">
                  <Input defaultValue={data.content.name} />
                  <Textarea defaultValue={data.content.description} />
                  <Button
                    variant="outline"
                    className="group min-h-20 min-w-20 p-4"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const name = (
                        target.previousElementSibling
                          ?.previousElementSibling as HTMLInputElement
                      ).value;
                      const description = (
                        target.previousElementSibling as HTMLInputElement
                      ).value;

                      updateTranslation(data.content, name, description, "en");
                    }}
                  >
                    <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                  </Button>
                </div>
              );
            }}
          </Async>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h1>Nastavnici</h1>

        <Async await={loaderData.subject}>
          {(data) => {
            if (data.code !== "OK") return null;

            const teachers = data.content.teachers;
            console.log(teachers.nextCursor);

            return (
              <>
                <AlertDialog>
                  <AlertDialogTrigger className="mt-12">
                    Dodaj nastavnika
                  </AlertDialogTrigger>

                  <AlertDialogContent className="min-w-2/3 min-h-2/3 grid-rows-[max-content_1fr] gap-12 p-12 max-h-2/3">
                    <AlertDialogHeader className="max-h-max space-y-1">
                      <AlertDialogTitle className="text-3xl text-center">
                        Izaberite nastavnike koji ce predavati ovaj predmet
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-center text-muted-foreground text-xl">
                        Izaberite jednog ili vise nastavnika
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="h-full w-full max-h-full overflow-auto grid grid-cols-3 grid-flow-row gap-8 p-8 rounded-lg">
                      {currentPage?.map((x) => (
                        <Button
                          variant="ghost"
                          key={x.id}
                          className={`flex flex-col gap-2 border-2 border-muted w-full h-[30rem] p-6 ${
                            selectedTeachers.includes(x.id)
                              ? "bg-muted border-slate-700"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedTeachers((prev) => {
                              if (prev.includes(x.id)) {
                                return prev.filter((y) => y !== x.id);
                              } else {
                                return [...prev, x.id];
                              }
                            })
                          }
                        >
                          <img
                            src={x.image}
                            alt={x.name}
                            className="w-max h-max max-w-full max-h-full object-cover"
                          />
                          <h2 className="text-center text-xl">{x.name}</h2>
                        </Button>
                      ))}

                      <Button
                        onClick={handleNextClick}
                        className="col-start-2 col-end-2 py-8"
                        variant="secondary"
                      >
                        Ucitaj jos nastavnika
                      </Button>
                    </div>

                    <AlertDialogFooter className="flex gap-12 justify-center!">
                      <AlertDialogCancel className="text-xl text-red-500">
                        Odbaci promene
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="text-xl px-8"
                        onClick={saveTeacherChanges}
                      >
                        Potvrdi
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {teachers.loadedCount > 0 ? (
                  <div className="grid grid-cols-3 gap-12 w-max self-center">
                    <LazyLoadedList response={teachers}>
                      {(x) => (
                        <Card key={x.id} className="w-120 h-120">
                          <CardHeader>
                            <CardTitle>{x.name}</CardTitle>
                          </CardHeader>

                          <CardDescription>
                            <img src={x.image} alt={x.name} />
                          </CardDescription>
                        </Card>
                      )}
                    </LazyLoadedList>
                  </div>
                ) : (
                  <p className="my-4">
                    Trenutno nijedan nastavnik ne predaje ovaj predmet
                  </p>
                )}
              </>
            );
          }}
        </Async>
      </div>
    </div>
  );
}

