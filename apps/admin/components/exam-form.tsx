"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SubjectSelector } from "./subject-selector";
import { TeacherSelector } from "./teacher-selector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type Subject = Schema<"SimpleSubjectResponseDto">;
type Teacher = Schema<"SimpleTeacherResponseDto">;
type Exam = Schema<"ExamResponseDto">;

type AddExamFormProps = {
  subjects: Subject[];
  teachers: Teacher[];
  exam?: Exam;
};

export default function ExamForm({
  subjects,
  teachers,
  exam,
}: AddExamFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"details" | "commission">(
    "details",
  );
  const [createdExam, setCreatedExam] = useState<
    Schema<"CreateExamRequestDto">
  >({
    cabinet: "",
    startTime: "",
    subjectId: -1,
    commission: [],
  });

  useEffect(() => {
    if (exam)
      setCreatedExam({
        cabinet: exam.cabinet,
        startTime: exam.startTime,
        subjectId: exam.subject.id,
        commission: exam.commission.map((x) => x.id),
      });
  }, [exam]);

  const handleSave = async () => {
    if (!exam) {
      const promise = sendApiRequest("/exams", {
        method: "post",
        payload: createdExam,
      });

      toast.promise(
        promise.then((response) => {
          if (!response.isOk)
            throw new Error(
              response.error?.message ?? "Neuspešno kreiranje ispita",
            );
        }),
        {
          loading: "Kreiranje ispita...",
          success: "Ispit je uspešno kreiran",
          error: (x) => (x as Error).message,
        },
      );

      const response = await promise;
      if (!response.isOk) return;

      router.push("/ispiti");
      return;
    }

    const promise = sendApiRequest("/exams", {
      method: "put",
      payload: {
        id: exam.id,
        ...createdExam,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno ažuriranje ispita",
          );
      }),
      {
        loading: "Ažuriranje ispita...",
        success: "Ispit je uspešno ažuriran",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    router.push("/ispiti");
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(x) => setActiveTab(x as "details" | "commission")}
    >
      <TabsList>
        <TabsTrigger value="details">Detalji</TabsTrigger>
        <TabsTrigger value="commission">Komisija</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Detalji</CardTitle>
            <CardDescription>Unesite detalje za ovaj ispit</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2 md:grid-cols-[17rem_1fr]">
              <Label htmlFor="cabinet">
                Kabinet u kojem će biti održan ispit:
              </Label>

              <Input
                id="cabinet"
                type="text"
                placeholder="Cabinet"
                value={createdExam.cabinet}
                onChange={(e) =>
                  setCreatedExam({ ...createdExam, cabinet: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[17rem_1fr]">
              <Label htmlFor="startTime">Vreme održavanja:</Label>

              <Input
                type="datetime-local"
                placeholder="Vreme"
                id="startTime"
                value={createdExam.startTime}
                onChange={(e) =>
                  setCreatedExam({ ...createdExam, startTime: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[17rem_1fr]">
              <Label>Predmet ispita:</Label>

              <SubjectSelector
                onChange={(e) =>
                  setCreatedExam({
                    ...createdExam,
                    subjectId: e[e.length - 1]?.id ?? -1,
                  })
                }
                selectedSubjects={
                  createdExam.subjectId === -1
                    ? []
                    : [subjects.find((x) => x.id === createdExam.subjectId)!]
                }
                subjects={subjects}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              onClick={handleSave}
              disabled={createdExam.subjectId === -1 || !createdExam.startTime}
            >
              Sačuvaj ispit
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="commission">
        <Card>
          <CardHeader>
            <CardTitle>Sastavi komisiju</CardTitle>
            <CardDescription>
              Izaberite nastavnike koji čine komisiju za ovaj ispit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TeacherSelector
              onChange={(e) =>
                setCreatedExam({
                  ...createdExam,
                  commission: e.map((x) => x.id),
                })
              }
              selectedTeachers={teachers.filter((x) =>
                createdExam.commission.includes(x.id),
              )}
              teachers={teachers}
            />
          </CardContent>

          <CardFooter>
            <Button onClick={() => setActiveTab("details")}>
              Nazad na detalje
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
