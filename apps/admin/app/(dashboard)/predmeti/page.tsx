"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BookOpen, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
import sendApiRequest from "@/api-dsl/send-api-request";
import getTranslationStatus from "@/lib/get-translation-status";
import { useLanguageStore } from "@/stores/language-store";

type Subject = Schema<"AdminSubjectResponseDto">;

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectToDelete, setSubjectToDelete] = useState<number | null>(null);
  const languages = useLanguageStore((x) => x.languages);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { response: data } = await sendApiRequest("/subject/admin", {
          method: "get",
          parameters: {},
        });

        setSubjects(data!);
      } catch {
        toast.error("Failed to load subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleDeleteSubject = async () => {
    if (subjectToDelete === null) return;

    const promise = sendApiRequest("/subject/{id}", {
      method: "delete",
      parameters: {
        id: subjectToDelete,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to delete subject",
          );
      }),
      {
        loading: "Deleting subject...",
        success: "Subject deleted successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    setSubjects(subjects.filter((subject) => subject.id !== subjectToDelete));
    setSubjectToDelete(null);
  };

  const filteredSubjects = subjects;
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Predmeti</h1>
          <p className="text-muted-foreground">
            Upravljajte predmetima i njihovim prevodima
          </p>
        </div>
        <Button asChild>
          <Link href="/predmeti/novi">
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subjects..."
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
      ) : filteredSubjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <BookOpen className="mb-4 h-10 w-10 text-muted-foreground" />
            <CardTitle className="mb-2">No subjects found</CardTitle>
            <CardDescription>
              {searchTerm
                ? "Try a different search term"
                : "Add your first subject to get started"}
            </CardDescription>
            {!searchTerm && (
              <Button asChild className="mt-4">
                <Link href="/predmeti/novi">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subject
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
              <CardTitle>All Subjects</CardTitle>
              <CardDescription>
                Showing {filteredSubjects.length} of {subjects.length} subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Translations</TableHead>
                    <TableHead>Teachers</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => {
                    const translationStatus = getTranslationStatus(
                      subject.translations,
                      languages.map((lang) => lang.code),
                    );

                    return (
                      <TableRow key={subject.id}>
                        <TableCell className="font-medium">
                          {subject.name || "Untitled"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {subject.description || "No description"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(translationStatus).map(
                              ([lang, status]) => (
                                <TranslationStatusBadge
                                  key={lang}
                                  language={lang}
                                  status={status}
                                />
                              ),
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {subject.teachersCount
                              ? `${subject.teachersCount} nastavnik${subject.teachersCount > 1 ? "a" : ""}`
                              : "Nema nastavnika"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/predmeti/${subject.id}`}>
                                Edit
                              </Link>
                            </Button>
                            <AlertDialog
                              open={subjectToDelete === subject.id}
                              onOpenChange={(open) => {
                                if (!open) setSubjectToDelete(null);
                              }}
                            >
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setSubjectToDelete(subject.id)}
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
                                    Ova akcija će trajno obrisati &quot;
                                    {subject.name || "Untitled"}
                                    &quot; i sve njegove predmete.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Otkaži</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteSubject}
                                    className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                                  >
                                    Obriši
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
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
