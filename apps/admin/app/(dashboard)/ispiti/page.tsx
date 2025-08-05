"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Plus, Trash2 } from "lucide-react";
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

  async function handleDeleteAll() {
    const { isOk } = await sendApiRequest("/exams", {
      method: "delete",
    });

    if (!isOk) {
      toast.error("Neuspešno brisanje ispita");
      return;
    }

    toast.success("Ispiti su uspešno obrisani");
    location.reload();
  }

  async function handleDelete(id: number) {
    const { isOk } = await sendApiRequest("/exams/{id}", {
      method: "delete",
      parameters: {
        id,
      },
    });

    if (!isOk) {
      toast.error("Neuspešno brisanje ispita");
      return;
    }

    toast.success("Ispit je uspešno obrisan");
    location.reload();
  }

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

        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj ispit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Obriši sve ispite
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Potvrdite brisanje</AlertDialogTitle>
                <AlertDialogDescription>
                  Da li ste sigurni da želite da obrišete sve ispite? Ova akcija
                  je nepovratna.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Otkaži</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAll}>
                  Potvrdi
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
            <ContextMenu key={x.id}>
              <ContextMenuTrigger asChild>
                <TableRow>
                  <TableCell>{x.subject}</TableCell>
                  <TableCell>{x.commission}</TableCell>
                  <TableCell>{x.date}</TableCell>
                  <TableCell>{x.startTime}</TableCell>
                  <TableCell>{x.cabinet}</TableCell>
                </TableRow>
              </ContextMenuTrigger>

              <ContextMenuContent>
                <ContextMenuItem>
                  <span>Izmeni</span>
                  <Edit2 className="ml-auto size-4" />
                </ContextMenuItem>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <ContextMenuItem
                      variant="destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <span>Obriši</span>
                      <Trash2 className="ml-auto size-4" />
                    </ContextMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Potvrdite brisanje</AlertDialogTitle>
                      <AlertDialogDescription>
                        Da li ste sigurni da želite da obrišete ovaj ispit? Ova
                        akcija je nepovratna.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Otkaži</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(x.id)}>
                        Potvrdi
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ContextMenuContent>
            </ContextMenu>
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
