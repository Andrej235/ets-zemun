import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import i18n from "@/i18n";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { RotateCcwSquare, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import fullEducationalProfileLoader from "./full-edu-profile-loader";
import { useNavigate } from "react-router";

type Subject = {
  type: "general" | "vocational";
  subjectId: number;
  subject: {
    id: number;
    name: string;
    description: string;
  };
  perWeek: number;
  year: number;
};

export default function FullEducationalProfile() {
  const loaderData = useLoader<typeof fullEducationalProfileLoader>();
  const [selectedYear, setSelectedYear] = useState(1);
  const isWaitingForResponse = useRef(false);
  const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<
    {
      subjects: Subject[];
      year: number;
    }[]
  >([]);

  useEffect(() => {
    async function setInitialState() {
      const profileData = await loaderData.profile;
      if (profileData.code !== "200") return;
      const profile = profileData.content;

      const years = Array.from([
        ...new Set(
          [...profile.generalSubjects, ...profile.vocationalSubjects].map(
            (x) => x.year
          )
        ),
      ]);
      const maxYear = Math.max(...years);

      setSelectedYear(1);

      const subjects = Array.from({
        length: maxYear,
      }).map((_, i) => ({
        subjects: extractSubjectsForYear(i + 1),
        year: i + 1,
      }));
      setSelectedSubjects(subjects);

      function extractSubjectsForYear(year: number) {
        return profile.generalSubjects
          .filter((x) => x.year === year)
          .map((x) => ({
            ...x,
            type: "general" as "general" | "vocational",
          }))
          .concat(
            profile.vocationalSubjects
              .filter((x) => x.year === year)
              .map((x) => ({
                ...x,
                type: "vocational",
              }))
          );
      }
    }

    setInitialState();
  }, [loaderData]);

  function handleSelectSubject(
    subject: Schema<"SimpleSubjectResponseDto">,
    type: "general" | "vocational" | null
  ) {
    setSelectedSubjects((prev) => {
      const index = prev.findIndex((x) => x.year === selectedYear);
      if (index < 0) return prev;

      if (type === null) {
        prev[index].subjects = prev[index].subjects.filter(
          (x) => x.subjectId !== subject.id
        );
        return [...prev];
      }

      prev[index].subjects.push({
        type,
        subjectId: subject.id,
        subject,
        perWeek: 0,
        year: selectedYear,
      });

      return [...prev];
    });
  }

  async function handleSave() {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const profile = await loaderData.profile;
    if (profile.code !== "200") return;

    const name =
      (nameInputRef.current?.value?.trim() ?? "") || profile.content.name;

    const preProcessedSubjects: ((typeof profile.content.generalSubjects)[number] & {
      type: "general" | "vocational";
    })[] = selectedSubjects.flatMap((x) =>
      x.subjects.map((y) => ({
        perWeek: y.perWeek,
        subjectId: y.subject.id,
        subject: y.subject,
        year: x.year,
        type: y.type,
      }))
    );

    const mappedSubjects: {
      general: typeof profile.content.generalSubjects;
      vocational: typeof profile.content.vocationalSubjects;
    } = {
      general: preProcessedSubjects.filter((x) => x.type === "general"),
      vocational: preProcessedSubjects.filter((x) => x.type === "vocational"),
    };

    const response = await sendAPIRequest("/profile", {
      method: "put",
      payload: {
        id: profile.content.id,
        name,
        generalSubjects: mappedSubjects.general,
        vocationalSubjects: mappedSubjects.vocational,
      },
    });

    if (response.code !== "204") alert(response);
    isWaitingForResponse.current = false;
  }

  function handleChangeType(subject: Subject) {
    setSelectedSubjects((prev) => {
      const index = prev.findIndex((x) => x.year === selectedYear);
      if (index < 0) return prev;
      const subjects = prev[index].subjects;

      const currIdx = subjects.findIndex(
        (x) => x.subjectId === subject.subjectId
      );
      if (currIdx < 0) return prev;

      prev[index].subjects[currIdx] = {
        ...subject,
        type: subject.type === "general" ? "vocational" : "general",
      };

      return [...prev];
    });
  }

  function handleChangePerWeek(subject: Subject, perWeek: number) {
    setSelectedSubjects((prev) => {
      const index = prev.findIndex((x) => x.year === selectedYear);
      if (index < 0) return prev;
      const subjects = prev[index].subjects;

      const currIdx = subjects.findIndex(
        (x) => x.subjectId === subject.subjectId
      );
      if (currIdx < 0) return prev;

      prev[index].subjects[currIdx] = {
        ...subject,
        perWeek,
      };

      return [...prev];
    });
  }

  const [subjects, setSubjects] = useState<
    Schema<"SimpleSubjectResponseDto">[]
  >([]);
  const currentPage = useRef(1);

  useEffect(() => {
    loaderData.subjects.then((x) =>
      setSubjects(x.code === "200" ? x.content.items : [])
    );
  }, [loaderData.subjects]);

  async function loadMoreSubjects() {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const newResponse = await sendAPIRequest("/subject", {
      method: "get",
      parameters: {
        languageCode: i18n.language,
        limit: 9,
        offset: currentPage.current * 9,
      },
    });

    if (newResponse.code !== "200") return;
    currentPage.current++;
    isWaitingForResponse.current = false;
    setSubjects([...subjects, ...newResponse.content.items]);
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
    navigate("/profili");
  }

  return (
    <div className="flex flex-col gap-16 p-16">
      <Async await={loaderData.profile}>
        {(profile) => {
          if (profile.code !== "200") return;

          return (
            <div className="flex justify-between">
              <Input
                defaultValue={profile.content.name}
                className="h-24 text-2xl px-4"
              />

              <AlertDialog>
                <AlertDialogTrigger className="min-h-full w-24 flex justify-center ml-4 hover:bg-red-500 rounded-md transition-colors">
                  <Trash2 className="min-h-full! aspect-square" />
                </AlertDialogTrigger>
                <AlertDialogContent className="min-w-max">
                  <AlertDialogHeader className="min-w-max">
                    <AlertDialogTitle className="text-3xl">
                      Potvrda brisanja
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xl">
                      Da li ste sigurni da zelite da obrisete ovaj obrazovni
                      profil?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="mt-8 gap-4">
                    <AlertDialogCancel className="text-xl h-12 w-48">
                      Odustani
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="text-xl h-12 w-48"
                      onClick={() => handleDelete(profile.content)}
                    >
                      Potvrdi
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        }}
      </Async>

      <div className="grid grid-cols-[1fr_max-content] w-full">
        <div className="flex flex-col gap-16 items-start">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 min-w-full">
            {selectedSubjects
              .filter((x) => x.year === selectedYear)[0]
              ?.subjects.map((x) => (
                <div
                  key={`${x.subjectId}-year-${selectedYear}`}
                  className="flex flex-col gap-4 border-2 border-slate-700 rounded-md p-4"
                >
                  <div className="flex justify-between">
                    <p className="font-bold text-3xl">{x.subject.name}</p>

                    <Button
                      variant="ghost"
                      onClick={() => handleSelectSubject(x.subject, null)}
                      className="text-2xl h-12 w-12 p-2 hover:bg-red-500"
                    >
                      <Trash2 className="min-w-full! min-h-full!" />
                    </Button>
                  </div>
                  <p className="text-xl h-full">{x.subject.description}</p>
                  <div className="flex gap-4 w-full justify-between items-center">
                    <Input
                      type="number"
                      className="w-full h-16"
                      defaultValue={x.perWeek}
                    />

                    <Button
                      variant="ghost"
                      className="h-16 w-16 p-2 hover:bg-slate-500"
                      onClick={(e) => {
                        const perWeek = Number(
                          (
                            (e.target as HTMLElement)
                              .previousElementSibling as HTMLInputElement
                          )?.value
                        );
                        handleChangePerWeek(x, perWeek);
                      }}
                    >
                      <Save className="min-w-full! min-h-full!" />
                    </Button>
                  </div>
                  <div className="flex gap-4 w-full justify-between items-center">
                    <p className="text-xl">
                      {x.type === "general" ? "Opste-obrazovni" : "Strucan"}{" "}
                      predmet
                    </p>

                    <Button
                      variant="ghost"
                      className="h-16 w-16 p-2 hover:bg-slate-500"
                      onClick={() => handleChangeType(x)}
                    >
                      <RotateCcwSquare className="min-w-full! min-h-full!" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <AlertDialog>
            <AlertDialogTrigger className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/60 h-24 w-96 text-2xl">
              Promeni predmete
            </AlertDialogTrigger>

            <AlertDialogContent className="min-w-3/4 min-h-3/4 max-h-3/4 overflow-auto grid-rows-[max-content_1fr] gap-16 p-12">
              <AlertDialogHeader className="flex items-center">
                <AlertDialogTitle className="text-5xl">
                  Izaberi predmete za {selectedYear} godinu
                </AlertDialogTitle>
                <AlertDialogDescription className="text-3xl">
                  Izaberi predmete
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-8">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onSelect={handleSelectSubject}
                      isSelected={selectedSubjects.some(
                        (x) =>
                          x.year === selectedYear &&
                          x.subjects.some((y) => y.subjectId === subject.id)
                      )}
                    />
                  ))}
                </div>

                <Button
                  className="text-xl h-16 w-64 self-center mt-16"
                  onClick={loadMoreSubjects}
                >
                  Ucitaj vise predmeta
                </Button>
              </div>

              <AlertDialogFooter className="justify-center!">
                <AlertDialogCancel className="text-3xl h-16 w-96">
                  Izadji
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex flex-col gap-4 items-center">
          {selectedSubjects.map((year) => (
            <Button
              key={year.year}
              onClick={() => setSelectedYear(year.year)}
              className={`min-h-24 min-w-24 max-h-24 max-w-24 bg-accent text-white hover:bg-slate-700 ${
                year.year === selectedYear ? "bg-slate-500" : ""
              }`}
            >
              <h2 className="text-3xl">{year.year}</h2>
            </Button>
          ))}

          <Button
            onClick={() =>
              setSelectedSubjects((x) => [
                ...x,
                { year: selectedSubjects.length + 1, subjects: [] },
              ])
            }
            className="text-2xl h-16"
          >
            Dodaj godinu
          </Button>
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-96 h-16 text-2xl font-bold self-center"
      >
        Sacuvaj
      </Button>
    </div>
  );
}

type SubjectCardProps = {
  readonly subject: Schema<"SimpleSubjectResponseDto">;
  readonly onSelect: (
    subject: Schema<"SimpleSubjectResponseDto">,
    type: "general" | "vocational" | null
  ) => void;
  readonly isSelected: boolean;
};

function SubjectCard({ subject, onSelect, isSelected }: SubjectCardProps) {
  return (
    <div
      key={subject.id}
      className={`flex flex-col gap-4 min-h-full min-w-full p-4 border-2 aspect-square ${
        isSelected ? "border-slate-700" : ""
      }`}
    >
      <p className="font-bold text-3xl">{subject.name}</p>
      <p className="text-xl h-full">{subject.description}</p>

      <div className="flex flex-col gap-4">
        <p>Izaberi kao:</p>

        <div className="flex gap-4">
          {!isSelected && (
            <Button
              variant="outline"
              onClick={() => onSelect(subject, "general")}
              className="flex-1/2 h-16 text-lg"
            >
              Opste-obrazovni predmet
            </Button>
          )}

          {!isSelected && (
            <Button
              variant="outline"
              onClick={() => onSelect(subject, "vocational")}
              className="flex-1/2 h-16 text-lg"
            >
              Strucni predmet
            </Button>
          )}

          {isSelected && (
            <Button
              variant="outline"
              onClick={() => onSelect(subject, null)}
              className="flex-1/2 h-16 text-lg"
            >
              Ukloni
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

