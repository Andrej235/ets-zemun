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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { BookOpen, Plus, Search, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ExamsPage() {
  const [exams, setExams] = useState<Schema<"ExamResponseDto">[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { response: data } = await sendApiRequest("/exams", {
          method: "get",
          parameters: { languageCode: "sr_lt" },
        });

        if (!data) throw new Error("Neuspešno učitavanje ispita");
        setExams(data);
      } catch {
        toast.error("Neuspešno učitavanje ispita");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const filteredExams = exams.filter(
    (exam) =>
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.cabinet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.startTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.commission.some((commission) =>
        commission.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const [examToDelete, setExamToDelete] = useState<number | null>(null);
  const handleDeleteExam = async () => {
    if (examToDelete === null) return;

    const promise = sendApiRequest("/exams/{id}", {
      method: "delete",
      parameters: {
        id: examToDelete,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno brisanje ispita",
          );
      }),
      {
        loading: "Brišem ispit...",
        success: "Ispit je uspešno obrisan",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    setExams(exams.filter((exam) => exam.id !== examToDelete));
    setExamToDelete(null);
  };

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
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pretraži ispite..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : filteredExams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <BookOpen className="mb-4 h-10 w-10 text-muted-foreground" />
            <CardTitle className="mb-2">Nema pronađenih ispita</CardTitle>
            <CardDescription>
              {searchTerm
                ? "Pokušajte sa drugačijim pojmom za pretragu"
                : "Dodajte prvi ispit da biste započeli"}
            </CardDescription>
            {!searchTerm && (
              <Button asChild className="mt-4">
                <Link href="/ispiti/novi">
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj ispit
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Svi ispiti</CardTitle>
              <CardDescription>
                Prikazano {filteredExams.length} od {exams.length} predmeta
              </CardDescription>
            </CardHeader>
            <CardContent className="mx-auto max-w-[90vw] overflow-auto lg:mx-0 lg:max-w-none">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Predmet</TableHead>
                    <TableHead>Kabinet</TableHead>
                    <TableHead>Nastavnici</TableHead>
                    <TableHead>Vreme</TableHead>
                    <TableHead className="text-right">Akcije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">
                        {exam.subject || "Bez predmeta"}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {exam.cabinet || "Nema kabinet"}
                      </TableCell>
                      <TableCell>
                        {exam.commission.join(", ") || "Nema nastavnika"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(exam.startTime), "dd.MM.yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/ispiti/${exam.id}`}>Uredi</Link>
                          </Button>
                          <AlertDialog
                            open={examToDelete === exam.id}
                            onOpenChange={(open) => {
                              if (!open) setExamToDelete(null);
                            }}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => setExamToDelete(exam.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Da li ste sigurni?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Ova akcija će trajno obrisati ispit iz &quot;
                                  {exam.subject || "Bez predmeta"}
                                  &quot; u kabinetu{" "}
                                  {exam.cabinet || "Nema kabinet"}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Otkaži</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteExam}
                                  className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                                >
                                  Obriši
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
