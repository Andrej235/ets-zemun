"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Exam = Schema<"ExamResponseDto">;

export default function ExamsPage() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-pdf", {
      method: "POST",
      body: formData,
    });

    const exams = (await res.json()) as {
      exams: Omit<Exam, "id">[];
    };

    const { isOk } = await sendApiRequest("/exams/bulk", {
      method: "post",
      payload: exams.exams,
    });

    if (!isOk) {
      toast.error("Neuspešno dodavanje ispita");
      return;
    }

    toast.success("Ispiti su uspešno dodati");
    location.reload();
  };

  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const exams = await sendApiRequest("/exams", {
        method: "get",
      });

      if (!exams.isOk) {
        toast.error("Neuspešno učitavanje ispita");
        return;
      }

      setExams(exams.response!);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ispiti</h1>
          <p className="text-muted-foreground">
            Upravljajte ispitima za vanredne učenike
          </p>
        </div>

        <Button asChild>
          <Link href="/ispiti/novi">
            <Plus className="mr-2 h-4 w-4" />
            Dodaj ispit
          </Link>
        </Button>
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableHead>Predmet</TableHead>
            <TableHead>Komisija</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Vreme</TableHead>
            <TableHead>Kabinet</TableHead>
          </TableRow>
          
          {exams.map((x) => (
            <TableRow key={x.id}>
              <TableCell>{x.subject}</TableCell>
              <TableCell>{x.commission}</TableCell>
              <TableCell>{x.date}</TableCell>
              <TableCell>{x.startTime}</TableCell>
              <TableCell>{x.cabinet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="space-y-2">
        <Label className="text-muted-foreground">
          Dodajte sve ispite iz PDF file-a
        </Label>
        <Input type="file" accept="application/pdf" onChange={handleUpload} />
      </div>
    </div>
  );
}
