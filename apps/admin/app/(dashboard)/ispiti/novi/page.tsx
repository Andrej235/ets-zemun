"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import AddExamForm from "@/components/exam-form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type Subject = Schema<"SimpleSubjectResponseDto">;
export type Teacher = Schema<"SimpleTeacherResponseDto">;

export default function NewExamPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ response: teachers }, { response: subjects }] =
          await Promise.all([
            sendApiRequest("/teachers", {
              method: "get",
              parameters: {
                languageCode: "sr_lt",
                limit: -1,
              },
            }),
            sendApiRequest("/subjects", {
              method: "get",
              parameters: {
                languageCode: "sr_lt",
                limit: -1,
              },
            }),
          ]);

        if (!teachers) throw new Error("Neuspešno učitavanje nastavnika");
        if (!subjects) throw new Error("Neuspešno učitavanje predmeta");

        setTeachers(teachers.items);
        setSubjects(subjects.items);
      } catch (err) {
        toast.error((err as Error)?.message || "Neuspešno učitavanje podataka");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <></>;

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/ispiti")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kreiraj ispit</h1>
          <p className="text-muted-foreground">
            Dodajte novi ispit za vanredne učenike
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AddExamForm subjects={subjects} teachers={teachers} />
      </motion.div>
    </div>
  );
}
