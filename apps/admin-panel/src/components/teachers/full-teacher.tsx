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
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import compressImage from "@/lib/compress-image";
import i18n from "@/i18n";
import { Trash2 } from "lucide-react";

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

  const [image, setImage] = useState<string>("");
  const changedImage = useRef(false);
  useEffect(() => {
    loaderData.then((x) => x.code === "OK" && setImage(x.content.image));
  }, [loaderData]);

  async function handleImageChange(file: File | null) {
    if (!file) return;

    const compressed = compressImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(await compressed);
    reader.onload = () => {
      setImage(reader.result as string);
      changedImage.current = true;
    };
  }

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  async function handleSave() {
    if (
      !nameRef.current ||
      !titleRef.current ||
      !emailRef.current ||
      !bioRef.current
    )
      return;

    const loaderDataResponse = await loaderData;
    if (loaderDataResponse.code !== "OK") return;

    const loadedTeacher = loaderDataResponse.content;

    const name = nameRef.current.value.trim() || loadedTeacher.name;
    const title = titleRef.current.value.trim() || loadedTeacher.title;
    const email = emailRef.current.value.trim() || loadedTeacher.email;
    const bio = bioRef.current.value.trim() || loadedTeacher.bio;

    if (
      name !== loadedTeacher.name ||
      title !== loadedTeacher.title ||
      bio !== loadedTeacher.bio
    ) {
      const response = await sendAPIRequest("/teacher/translation", {
        method:
          loadedTeacher.name.length < 1 &&
          loadedTeacher.title.length < 1 &&
          loadedTeacher.bio.length < 1
            ? "post"
            : "put",
        payload: {
          teacherId: loadedTeacher.id,
          languageCode: i18n.language,
          name,
          title,
          bio,
        },
      });

      if (response.code !== "Created" && response.code !== "No Content")
        alert(response);
    }

    if (email !== loadedTeacher.email || changedImage.current) {
      const response = await sendAPIRequest("/teacher", {
        method: "put",
        payload: {
          id: loadedTeacher.id,
          startOfOpenOfficeHoursFirstShift: null,
          startOfOpenOfficeHoursSecondShift: null,
          email,
          image,
        },
      });

      if (response.code !== "No Content") alert(response);
    }
  }

  async function handleAddQualification(
    name: string,
    description: string,
    date: string
  ) {
    const teacher = await loaderData;
    if (teacher.code !== "OK") return;

    const response = await sendAPIRequest("/qualification", {
      method: "post",
      payload: {
        dateObtained: date,
        teacherId: teacher.content.id,
        translation: {
          qualificationId: -1,
          languageCode: i18n.language,
          name,
          description,
        },
      },
    });

    if (response.code !== "Created") alert(response);
  }

  async function handleDeleteQualification(
    qualification: Schema<"QualificationResponseDto">
  ) {
    const response = await sendAPIRequest("/qualification/{id}", {
      method: "delete",
      parameters: {
        id: qualification.id,
      },
    });

    if (response.code !== "No Content") alert(response);
  }

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.code !== "OK") return null;
        const teacher = data.content;

        return (
          <div className="p-24 flex flex-col">
            <div className="flex gap-16 h-max">
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4">
                  <Input
                    defaultValue={teacher.name}
                    placeholder="Ime"
                    className="h-16"
                    ref={nameRef}
                  />
                  <Input
                    defaultValue={teacher.title}
                    placeholder="Pozicija"
                    className="h-16"
                    ref={titleRef}
                  />
                </div>

                <Input
                  defaultValue={teacher.email}
                  placeholder="Email"
                  className="h-16"
                  ref={emailRef}
                />

                <Textarea
                  defaultValue={teacher.bio}
                  placeholder="Opis (bio)"
                  className="min-h-64"
                  ref={bioRef}
                />
              </div>

              <div className="relative w-2/5">
                <img
                  src={image}
                  alt={teacher.name}
                  className="absolute max-w-full max-h-full"
                />
                <Input
                  type="file"
                  className="absolute w-full h-full opacity-0"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] ?? null)
                  }
                />
              </div>
            </div>

            <div className="flex gap-8 self-center mt-16">
              <Button className="py-4 h-16 w-64 text-xl" onClick={handleSave}>
                Sacuvaj promene
              </Button>

              <AlertDialog>
                <AlertDialogTrigger className="h-16 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 py-4 w-64">
                  Obriši
                </AlertDialogTrigger>

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

            <div className="grid grid-cols-2 gap-8 mt-16">
              <div className="flex flex-col gap-4">
                <p className="font-bold text-3xl mb-4">Predmeti</p>

                {teacher.subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex flex-col w-full min-h-max h-32 border-2 border-slate-600 p-4"
                  >
                    <p className="font-bold text-xl">{subject.name}</p>
                    <p>{subject.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-bold text-3xl mb-4">Kvalifikacije</p>

                {teacher.qualifications.map((qualification) => (
                  <div
                    key={qualification.id}
                    className="flex flex-col items-start w-full min-h-max h-32 border-2 border-slate-600 p-4"
                  >
                    <div className="flex justify-between w-full">
                      <p className="font-bold text-xl">{qualification.name}</p>

                      <AlertDialog>
                        <AlertDialogTrigger className="group aspect-square p-0">
                          <Trash2 className="min-w-full min-h-full group-hover:stroke-red-500" />
                        </AlertDialogTrigger>

                        <AlertDialogContent className="min-w-max">
                          <AlertDialogHeader className="flex flex-col min-w-max">
                            <AlertDialogTitle className="text-4xl">
                              Da li ste sigurni da želite da obrišete ovu
                              kvalifikaciju?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                              Ova akcija je{" "}
                              <span className="text-red-500 font-bold">
                                nepovratna
                              </span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-2xl h-16 w-32 mr-4">
                              Odustani
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-foreground hover:bg-red-900 text-2xl h-16 w-32"
                              onClick={() =>
                                handleDeleteQualification(qualification)
                              }
                            >
                              Obrisi
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <p className="text-muted-foreground">
                      {qualification.dateObtained}
                    </p>
                    <p>{qualification.description}</p>
                  </div>
                ))}

                <AlertDialog>
                  <AlertDialogTrigger className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/70 h-24 rounded-lg">
                    Dodaj kvalifikaciju
                  </AlertDialogTrigger>

                  <AlertDialogContent className="min-w-3/4 min-h-3/4 grid-rows-[max-content_1fr] gap-16">
                    <AlertDialogHeader className="flex flex-col min-w-max">
                      <AlertDialogTitle className="text-4xl text-center">
                        Dodaj kvalifikaciju
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                        Unesite podatke o kvalifikaciji
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col gap-4">
                      <Input placeholder="Naziv" className="h-16 text-xl" />
                      <Textarea placeholder="Opis" className="h-64 text-xl" />
                      <Input
                        placeholder="Datum dobijanja (yyyy-mm-dd)"
                        className="h-16 text-xl"
                      />

                      <div className="flex">
                        <AlertDialogCancel className="text-2xl h-16 w-64 mr-4">
                          Odustani
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="text-2xl h-16 w-64"
                          onClick={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.disabled = true;
                            const parent = target.parentElement?.parentElement;

                            const name = (
                              parent?.firstChild as HTMLInputElement
                            )?.value?.trim();

                            const description = (
                              parent?.children[1] as HTMLTextAreaElement
                            )?.value?.trim();

                            const date = (
                              parent?.children[2] as HTMLInputElement
                            )?.value?.trim();

                            if (name && description && date)
                              handleAddQualification(name, description, date);
                          }}
                        >
                          Sacuvaj
                        </AlertDialogAction>
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        );
      }}
    </Async>
  );
}

