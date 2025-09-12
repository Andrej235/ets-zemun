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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Edit2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Exam = Schema<"ExamResponseDto">;

export default function ExamsPage() {
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEditingExam(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  function handleCreateLocalExam() {
    const newExam = {
      id: -1,
      cabinet: "",
      commission: "",
      date: "",
      startTime: "",
      subject: "",
    };

    setExams((prev) => [...prev, newExam]);
    setEditingExam({ ...newExam });
  }

  async function handleDeleteAll() {
    const { isOk } = await sendApiRequest("/exams", {
      method: "delete",
    });

    if (!isOk) {
      toast.error("Neuspešno brisanje ispita");
      return;
    }

    toast.success("Ispiti su uspešno obrisani");
    setExams([]);
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
    setExams((exams) => exams.filter((e) => e.id !== id));
  }

  async function handleSave() {
    if (!editingExam) return;

    const { isOk, response } = await sendApiRequest("/exams", {
      method: editingExam.id < 0 ? "post" : "put",
      payload: editingExam,
    });

    if (!isOk) {
      toast.error("Neuspešno sačuvanje ispita");
      return;
    }

    toast.success("Ispit je uspešno sačuvan");
    setEditingExam(null);
    setExams((exams) =>
      exams.map((e) =>
        e.id === editingExam.id
          ? {
              ...editingExam,
              id:
                editingExam.id < 0
                  ? (response as { id: number })?.id || 0
                  : editingExam.id,
            }
          : e,
      ),
    );
  }

  function handleCancelEdit() {
    if (!editingExam) return;

    setEditingExam(null);
    if (editingExam.id < 0)
      setExams((exams) => exams.filter((e) => e.id !== editingExam.id));
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
          <Button onClick={handleCreateLocalExam} disabled={!!editingExam}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj ispit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={!!editingExam}>
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
            <TableHead>Akcije</TableHead>
          </TableRow>

          {exams.map((x) => (
            <ContextMenu key={x.id}>
              <ContextMenuTrigger asChild disabled={!!editingExam}>
                <TableRow
                  className={cn(
                    !!editingExam && editingExam.id !== x.id && "opacity-50",
                    editingExam && editingExam.id === x.id && "bg-muted/50",
                  )}
                >
                  {(!editingExam || editingExam.id !== x.id) && (
                    <>
                      <TableCell>{x.subject || "-"}</TableCell>
                      <TableCell>{x.commission || "-"}</TableCell>
                      <TableCell>{x.date || "-"}</TableCell>
                      <TableCell>{x.startTime || "-"}</TableCell>
                      <TableCell className="text-center">
                        {x.cabinet || "-"}
                      </TableCell>
                    </>
                  )}

                  {editingExam && editingExam.id === x.id && (
                    <>
                      <TableCell>
                        <Input
                          value={editingExam.subject}
                          onChange={(e) =>
                            setEditingExam({
                              ...editingExam,
                              subject: e.target.value,
                            })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <Input
                          value={editingExam.commission}
                          onChange={(e) =>
                            setEditingExam({
                              ...editingExam,
                              commission: e.target.value,
                            })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <Input
                          value={editingExam.date}
                          onChange={(e) =>
                            setEditingExam({
                              ...editingExam,
                              date: e.target.value,
                            })
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <Input
                          value={editingExam.startTime}
                          onChange={(e) =>
                            setEditingExam({
                              ...editingExam,
                              startTime: e.target.value,
                            })
                          }
                        />
                      </TableCell>

                      <TableCell className="text-center">
                        <Input
                          value={editingExam.cabinet}
                          onChange={(e) =>
                            setEditingExam({
                              ...editingExam,
                              cabinet: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                    </>
                  )}

                  <TableCell className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={!!editingExam}>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={!!editingExam}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setEditingExam({ ...x })}
                        >
                          <span>Izmeni</span>
                          <Edit2 className="ml-auto size-4" />
                        </DropdownMenuItem>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <span>Obriši</span>
                              <Trash2 className="ml-auto size-4" />
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Potvrdite brisanje
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Da li ste sigurni da želite da obrišete ovaj
                                ispit? Ova akcija je nepovratna.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Otkaži</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(x.id)}
                              >
                                Potvrdi
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </ContextMenuTrigger>

              <ContextMenuContent>
                <ContextMenuItem onClick={() => setEditingExam({ ...x })}>
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

      <motion.div
        className="fixed right-16 bottom-16 flex gap-2"
        animate={{
          scale: editingExam ? 1 : 0.5,
          opacity: editingExam ? 1 : 0,
        }}
      >
        <Button variant="outline" onClick={handleCancelEdit}>
          Otkaži
        </Button>

        <Button onClick={handleSave}>Sačuvaj</Button>
      </motion.div>
    </div>
  );
}
