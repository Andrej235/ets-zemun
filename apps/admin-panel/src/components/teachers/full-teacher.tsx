import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import i18n from "@/i18n";
import compressImage from "@/lib/compress-image";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import fullTeacherLoader from "./full-teacher-loader";

export default function FullTeacher() {
  const { teacher: teacherLoaderData, subjects: subjectsLoaderData } =
    useLoader<typeof fullTeacherLoader>();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
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
    if (response.code !== "204") alert(response);
    navigate("/nastavnici");
  }

  const [image, setImage] = useState<string>("");
  const changedImage = useRef(false);
  useEffect(() => {
    teacherLoaderData.then((x) => x.code === "200" && setImage(x.content.image));
  }, [teacherLoaderData]);

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

    const loaderDataResponse = await teacherLoaderData;
    if (loaderDataResponse.code !== "200") return;

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

      if (response.code !== "201" && response.code !== "204")
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

      if (response.code !== "204") alert(response);
    }
  }

  async function handleAddQualification(
    name: string,
    description: string,
    date: string
  ) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const teacher = await teacherLoaderData;
    if (teacher.code !== "200") return;

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

    isWaitingForResponse.current = false;
    if (response.code !== "201") alert(response);
    revalidate();
  }

  async function handleDeleteQualification(
    qualification: Schema<"QualificationResponseDto">
  ) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/qualification/{id}", {
      method: "delete",
      parameters: {
        id: qualification.id,
      },
    });

    isWaitingForResponse.current = false;
    if (response.code !== "204") alert(response);
    revalidate();
  }

  async function handleEditQualification(
    qualification: Schema<"QualificationResponseDto">,
    name: string,
    description: string
  ) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    if (
      name === qualification.name &&
      description === qualification.description
    ) {
      isWaitingForResponse.current = false;
      return;
    }

    const response = await sendAPIRequest("/qualification/translation", {
      method:
        qualification.name.length < 1 && qualification.description
          ? "post"
          : "put",
      payload: {
        name,
        description,
        qualificationId: qualification.id,
        languageCode: i18n.language,
      },
    });

    isWaitingForResponse.current = false;
    if (response.code !== "204" && response.code !== "201")
      alert(response);
    revalidate();
  }

  async function handleRemoveSubject(
    subject: Schema<"SimpleSubjectResponseDto">
  ) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const teacher = await teacherLoaderData;
    if (teacher.code !== "200") return;

    const response = await sendAPIRequest(
      "/teacher/{teacherId}/subject/{subjectId}",
      {
        method: "delete",
        parameters: {
          teacherId: teacher.content.id,
          subjectId: subject.id,
        },
      }
    );

    isWaitingForResponse.current = false;
    if (response.code !== "204") alert(response);
    revalidate();
  }

  const [currentPage, setCurrentPage] = useState<
    Schema<"SimpleSubjectResponseDto">[] | null
  >(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    teacherLoaderData.then((x) => {
      if (x.code !== "200") return;
      const initial = x.content.subjects.map((x) => x.id);
      setInitialSubjects(initial);
      setSelectedSubjects(initial);
    });
  }, [teacherLoaderData]);

  useEffect(() => {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    subjectsLoaderData.then((x) => {
      isWaitingForResponse.current = false;
      setCurrentPage(x.code === "200" ? x.content.items : []);
    });
  }, [subjectsLoaderData]);

  function handleNextClick() {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    sendAPIRequest("/subject", {
      method: "get",
      parameters: {
        limit: 9,
        offset: 9 * (pageCount + 1),
        languageCode: i18n.language,
      },
    }).then(async (x) => {
      setCurrentPage(
        (prev) => prev?.concat(x.code === "200" ? x.content.items : []) ?? []
      );
      setPageCount(pageCount + 1);
      isWaitingForResponse.current = false;
    });
  }

  const [initialSubjects, setInitialSubjects] = useState<number[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  async function saveSelectedSubjectsChanges() {
    const teacherData = await teacherLoaderData;
    if (teacherData.code !== "200") return;

    const teacherId = teacherData.content.id;
    const promises: Promise<{
      code: string;
    }>[] = [];

    initialSubjects
      .filter((x) => !selectedSubjects.includes(x))
      .forEach((id) =>
        promises.push(
          sendAPIRequest("/teacher/{teacherId}/subject/{subjectId}", {
            method: "delete",
            parameters: {
              teacherId: +teacherId,
              subjectId: id,
            },
          })
        )
      );

    promises.push(
      sendAPIRequest(`/teacher/subject`, {
        method: "post",
        payload: {
          subjectIds: selectedSubjects.filter(
            (x) => !initialSubjects.includes(x)
          ),
          teacherId: teacherId,
        },
      })
    );

    const responses = await Promise.all(promises);

    responses.forEach((x) => {
      if (x.code !== "204" && x.code !== "201") alert(x);
    });

    setInitialSubjects(selectedSubjects);
    revalidate();
  }

  return (
    <Async await={teacherLoaderData}>
      {(data) => {
        if (data.code !== "200") return null;
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
                    <div className="flex justify-between">
                      <p className="font-bold text-xl">{subject.name}</p>

                      <AlertDialog>
                        <AlertDialogTrigger className="group aspect-square p-0">
                          <Trash2 className="min-w-full min-h-full group-hover:stroke-red-500" />
                        </AlertDialogTrigger>

                        <AlertDialogContent className="min-w-max">
                          <AlertDialogHeader className="flex flex-col min-w-max">
                            <AlertDialogTitle className="text-4xl">
                              Da li ste sigurni da želite da uklonite ovaj
                              predmet?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                              Ova akcija ce samo ukloniti ovog nastavnika kao
                              predavaca ovog predmeta, nece izbrisati sam
                              predmet ili nastavnika
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-2xl h-16 w-32 mr-4">
                              Odustani
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-foreground hover:bg-red-900 text-2xl h-16 w-32"
                              onClick={() => handleRemoveSubject(subject)}
                            >
                              Ukloni
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <p>{subject.description}</p>
                  </div>
                ))}

                <AlertDialog>
                  <AlertDialogTrigger className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/70 h-24 rounded-lg">
                    Izmeni Predmete
                  </AlertDialogTrigger>

                  <AlertDialogContent className="min-w-2/3 min-h-2/3 max-h-2/3 grid-rows-[max-content_1fr] gap-16">
                    <AlertDialogHeader className="flex flex-col min-w-max">
                      <AlertDialogTitle className="text-4xl text-center">
                        Izaberite predmete
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                        Izaberite predmete koje ovaj nastavnik predaje
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="h-full w-full max-h-full overflow-auto grid grid-cols-3 grid-flow-row gap-8 p-8 rounded-lg">
                      {currentPage?.map((x) => (
                        <Button
                          variant="ghost"
                          key={x.id}
                          className={`flex flex-col gap-2 border-2 border-muted w-full h-[30rem] p-6 ${
                            selectedSubjects.includes(x.id)
                              ? "bg-muted border-slate-700"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedSubjects((prev) => {
                              if (prev.includes(x.id)) {
                                return prev.filter((y) => y !== x.id);
                              } else {
                                return [...prev, x.id];
                              }
                            })
                          }
                        >
                          <p className="font-bold text-2xl">{x.name}</p>
                          <p>{x.description}</p>
                        </Button>
                      ))}

                      <Button
                        onClick={handleNextClick}
                        className="col-start-2 col-end-2 py-8"
                        variant="secondary"
                      >
                        Ucitaj jos predmeta
                      </Button>
                    </div>

                    <AlertDialogFooter className="flex gap-12 justify-center!">
                      <AlertDialogCancel className="text-xl text-red-500">
                        Odbaci promene
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="text-xl px-8"
                        onClick={saveSelectedSubjectsChanges}
                      >
                        Potvrdi
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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

                      <div className="flex gap-4">
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

                        <AlertDialog>
                          <AlertDialogTrigger className="group aspect-square p-0">
                            <Edit className="min-w-full min-h-full group-hover:stroke-yellow-500" />
                          </AlertDialogTrigger>

                          <AlertDialogContent className="min-w-2/3 min-h-2/3 grid-rows-[max-content_1fr] gap-16">
                            <AlertDialogHeader className="flex flex-col min-w-max">
                              <AlertDialogTitle className="text-4xl">
                                Izmeni kvalifikaciju
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                                Unesite podatke o kvalifikaciji
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="flex flex-col gap-4">
                              <Input
                                placeholder="Naziv"
                                className="h-16 text-xl"
                                defaultValue={qualification.name}
                              />
                              <Textarea
                                placeholder="Opis"
                                className="h-32 text-xl"
                                defaultValue={qualification.description}
                              />
                            </div>

                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-2xl h-16 w-32 mr-4">
                                Odustani
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="text-2xl h-16 w-32"
                                onClick={(e) => {
                                  const target = e.target as HTMLButtonElement;
                                  target.disabled = true;
                                  const parent =
                                    target.parentElement
                                      ?.previousElementSibling;

                                  const name =
                                    (
                                      parent?.children[0] as HTMLInputElement
                                    )?.value?.trim() || qualification.name;

                                  const description =
                                    (
                                      parent?.children[1] as HTMLInputElement
                                    )?.value?.trim() ||
                                    qualification.description;

                                  handleEditQualification(
                                    qualification,
                                    name,
                                    description
                                  );
                                }}
                              >
                                Izmeni
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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

                  <AlertDialogContent className="min-w-2/3 min-h-2/3 grid-rows-[max-content_1fr] gap-16">
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

