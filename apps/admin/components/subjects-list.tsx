"use client";

import type React from "react";

import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import sendApiRequest from "@/api-dsl/send-api-request";
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
} from "./ui/alert-dialog";

type Subject = Schema<"AdminSubjectResponseDto">;
type CurriculumSubject = Schema<"ProfileSubjectResponseDto"> & {
  type: "general" | "vocational";
};
type SubjectType = "general" | "vocational";

type SubjectsListProps = {
  profileId: number;
  curriculumSubjects: CurriculumSubject[];
  subjectMap: Map<number, Subject>;
  year: number;
  refresh: () => void;
};

export function SubjectsList({
  profileId,
  curriculumSubjects,
  subjectMap,
  year,
  refresh,
}: SubjectsListProps) {
  const router = useRouter();
  const [editingSubject, setEditingSubject] =
    useState<CurriculumSubject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    year: year,
    perWeek: 0,
    type: "general" as SubjectType,
  });

  const handleEdit = (subject: CurriculumSubject) => {
    setEditingSubject(subject);
    setFormData({
      year: subject.year,
      perWeek: subject.perWeek,
      type: subject.type || "general", // Default to general if not set
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (subject: CurriculumSubject) => {
    const promise = sendApiRequest("/profiles/remove-subject", {
      method: "patch",
      payload: {
        profileId: profileId,
        subjectId: subject.subject.id,
        type: subject.type === "general" ? "General" : "Vocational",
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno uklanjanje predmeta",
          );
      }),
      {
        loading: "Uklanjanje predmeta...",
        success: "Predmet je uspešno uklonjen",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;
    router.refresh();
    refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;

    setIsSubmitting(true);
    const promise = sendApiRequest("/profiles/update-subject", {
      method: "patch",
      payload: {
        currentType:
          editingSubject.type === "general" ? "General" : "Vocational",
        newType: formData.type === "general" ? "General" : "Vocational",
        profileId: profileId,
        subjectId: editingSubject.subject.id,
        newPerWeek: formData.perWeek,
        newYear: formData.year,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno ažuriranje predmeta",
          );
      }),
      {
        loading: "Ažuriranje predmeta...",
        success: "Predmet je uspešno ažuriran",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    setIsSubmitting(false);
    if (!response.isOk) return;

    setIsDialogOpen(false);
    router.refresh();
    refresh();
  };

  return (
    <>
      <AnimatePresence>
        {curriculumSubjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Predmet</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Sati/Nedelji</TableHead>
                  <TableHead className="text-right">Akcije</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {curriculumSubjects.map((subject) => {
                  const subjectDetails = subjectMap.get(subject.subjectId);
                  return (
                    <TableRow key={subject.subjectId}>
                      <TableCell className="font-medium">
                        {subjectDetails
                          ? subjectDetails.name
                          : "Nepoznat predmet"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            subject.type === "vocational"
                              ? "border-orange-200 bg-orange-50 text-orange-700"
                              : "border-blue-200 bg-blue-50 text-blue-700"
                          }
                        >
                          {subject.type === "vocational" ? "Stručni" : "Opšti"}
                        </Badge>
                      </TableCell>
                      <TableCell>{subject.perWeek}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(subject)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Izmeni</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Obriši</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Da li ste sigurni da želite da uklonite{" "}
                                  {subject.subject.name || "ovaj predmet"} iz
                                  profila?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Ova akcija je nepovratna. Ovo će trajno
                                  ukloniti predmet iz profila.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Otkaži</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => handleDelete(subject)}
                                >
                                  Obriši
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center"
          >
            <p className="text-muted-foreground">
              Još uvek nisu dodati predmeti za ovu godinu.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Izmena predmeta</DialogTitle>
            <DialogDescription>
              Ažurirajte podatke za{" "}
              {(editingSubject &&
                subjectMap.get(editingSubject.subjectId)?.name) ||
                "ovaj predmet"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="year">Razred</Label>
                <Input
                  id="year"
                  type="number"
                  min={1}
                  max={10}
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: Number.parseInt(e.target.value),
                    })
                  }
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="perWeek">Sati nedeljno</Label>
                <Input
                  id="perWeek"
                  type="number"
                  min={1}
                  max={20}
                  value={formData.perWeek}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      perWeek: Number.parseInt(e.target.value),
                    })
                  }
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tip predmeta</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      type: value as SubjectType,
                    })
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Izaberite tip" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Opšti</SelectItem>
                    <SelectItem value="vocational">Stručni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Otkaži
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4" />
                Sačuvaj izmene
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
