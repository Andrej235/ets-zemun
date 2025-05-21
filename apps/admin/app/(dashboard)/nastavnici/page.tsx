"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
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
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import getTranslationStatus from "@/lib/get-translation-status";
import { useLanguageStore } from "@/stores/language-store";
import { motion } from "framer-motion";
import { Mail, Plus, Search, Trash2, User2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Teacher = Schema<"AdminTeacherResponseDto">;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherToDelete, setTeacherToDelete] = useState<number | null>(null);
  const languages = useLanguageStore((x) => x.languages);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await sendApiRequest("/teachers/admin", {
          method: "get",
        });
        setTeachers(data.response!);
      } catch {
        toast.error("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDeleteTeacher = async () => {
    if (teacherToDelete === null) return;

    const promise = sendApiRequest("/teachers/{id}", {
      method: "delete",
      parameters: {
        id: teacherToDelete,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to delete teacher",
          );
      }),
      {
        loading: "Deleting teacher...",
        success: "Teacher deleted successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    setTeachers(teachers.filter((teacher) => teacher.id !== teacherToDelete));
    setTeacherToDelete(null);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      teacher.email.toLowerCase().includes(searchLower) ||
      teacher.name.toLowerCase().includes(searchLower) ||
      teacher.title.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">
            Manage teacher profiles and their information
          </p>
        </div>
        <Button asChild>
          <Link href="/nastavnici/novi">
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teachers..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTeachers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Users className="mb-4 h-10 w-10 text-muted-foreground" />
            <CardTitle className="mb-2">No teachers found</CardTitle>
            <CardDescription>
              {searchTerm
                ? "Try a different search term"
                : "Add your first teacher to get started"}
            </CardDescription>
            {!searchTerm && (
              <Button asChild className="mt-4">
                <Link href="/nastavnici/novi">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Teacher
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredTeachers.map((teacher) => {
            const translationStatus = getTranslationStatus(
              teacher.translations,
              languages.map((l) => l.code),
            );

            return (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={teacher.image}
                          alt={teacher.name || "Teacher"}
                          fill
                          className="object-cover text-transparent"
                        />

                        <User2 className="size-full bg-muted/50" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {teacher.name || "Unnamed Teacher"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {teacher.title || "No title"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{teacher.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
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

                    <div className="mt-4 flex justify-between">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/nastavnici/${teacher.id}`}>
                          View & Edit
                        </Link>
                      </Button>
                      <AlertDialog
                        open={teacherToDelete === teacher.id}
                        onOpenChange={(open) => {
                          if (!open) setTeacherToDelete(null);
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setTeacherToDelete(teacher.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the teacher &quot;
                              {teacher.name || "Unnamed Teacher"}&quot; and all
                              their information. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteTeacher}
                              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
