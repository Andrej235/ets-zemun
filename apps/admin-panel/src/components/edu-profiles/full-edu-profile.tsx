import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import fullEducationalProfileLoader from "./full-edu-profile-loader";
import { Input } from "../ui/input";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

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
      if (profileData.code !== "OK") return;
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
    console.log(subject, type, selectedYear, selectedSubjects);

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
    if (profile.code !== "OK") return;

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

    if (response.code !== "No Content") alert(response);
    isWaitingForResponse.current = false;
  }

  return (
    <div className="flex flex-col gap-16 p-16">
      <Async await={loaderData.profile}>
        {(profile) => {
          if (profile.code !== "OK") return;

          return <Input defaultValue={profile.content.name} />;
        }}
      </Async>

      <div className="grid grid-cols-[1fr_max-content] w-full">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {selectedSubjects
            .filter((x) => x.year === selectedYear)[0]
            ?.subjects.map((x) => (
              <div key={x.subjectId}>{x.subject.name}</div>
            ))}

          <AlertDialog>
            <AlertDialogTrigger>Promeni predmete</AlertDialogTrigger>

            <AlertDialogContent className="min-w-3/4 min-h-3/4 max-h-3/4 overflow-auto grid-rows-[max-content_1fr] gap-16 p-12">
              <AlertDialogHeader className="flex items-center">
                <AlertDialogTitle className="text-5xl">
                  Izaberi predmete za {selectedYear} godinu
                </AlertDialogTitle>
                <AlertDialogDescription className="text-3xl">
                  Izaberi predmete
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="grid grid-cols-3 gap-8">
                <Async await={loaderData.subjects}>
                  {(subjects) => {
                    if (subjects.code !== "OK") return;

                    return subjects.content.items.map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        onSelect={handleSelectSubject}
                        isSelected={selectedSubjects.some((x) =>
                          x.subjects.some((y) => y.subjectId === subject.id)
                        )}
                      />
                    ));
                  }}
                </Async>
              </div>

              <AlertDialogFooter className="justify-center!">
                <AlertDialogCancel className="text-3xl h-16 w-96">
                  Izadji
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex flex-col gap-4">
          {selectedSubjects.map((year) => (
            <Button key={year.year} onClick={() => setSelectedYear(year.year)}>
              <h2>{year.year}</h2>
            </Button>
          ))}

          <Button
            onClick={() =>
              setSelectedSubjects((x) => [
                ...x,
                { year: selectedSubjects.length + 1, subjects: [] },
              ])
            }
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

