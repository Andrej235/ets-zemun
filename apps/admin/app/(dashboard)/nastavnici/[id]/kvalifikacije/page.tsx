"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { QualificationForm } from "@/components/qualification-form";
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
import { useLanguageStore } from "@/stores/language-store";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type Teacher = Schema<"AdminFullTeacherResponseDto">;
type Qualification = Schema<"AdminQualificationResponseDto">;

export default function TeacherQualificationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: teacherId } = use(params);
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const languages = useLanguageStore((x) => x.languages);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQualification, setEditingQualification] =
    useState<Qualification | null>(null);
  const [qualificationToDelete, setQualificationToDelete] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response: teacherData } = await sendApiRequest(
          "/teachers/admin/{id}",
          {
            method: "get",
            parameters: {
              id: +teacherId,
            },
          },
        );

        if (teacherData) {
          setTeacher(teacherData);
        } else {
          toast.error("Teacher not found");
          router.push("/nastavnici");
        }
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId, router]);

  const handleDeleteQualification = async () => {
    if (!teacher || qualificationToDelete === null) return;

    try {
      const promise = sendApiRequest("/qualifications/{id}", {
        method: "delete",
        parameters: {
          id: qualificationToDelete,
        },
      });

      toast.promise(
        promise.then((response) => {
          if (!response.isOk)
            throw new Error(
              response.error?.message ?? "Failed to delete qualification",
            );
        }),
        {
          loading: "Deleting qualification...",
          success: "Qualification deleted successfully",
          error: "Failed to delete qualification",
        },
      );

      const { isOk } = await promise;
      if (!isOk) return;

      setTeacher({
        ...teacher,
        qualifications: teacher.qualifications.filter(
          (q) => q.id !== qualificationToDelete,
        ),
      });
      setQualificationToDelete(null);
    } catch {
      toast.error("Failed to delete qualification");
    }
  };

  const handleQualificationSuccess = (qualification: Qualification) => {
    if (!teacher) return;

    const newQualifications = [...teacher.qualifications];
    if (editingQualification) {
      const index = newQualifications.findIndex(
        (q) => q.id === editingQualification.id,
      );
      newQualifications[index] = qualification;
    } else {
      qualification.id =
        teacher.qualifications.toSorted((a, b) => b.id - a.id)[0].id + 1;
      newQualifications.push(qualification);
    }

    setTeacher({
      ...teacher,
      qualifications: newQualifications,
    });

    // Reset form state
    setShowAddForm(false);
    setEditingQualification(null);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!teacher) {
    return null;
  }

  const mainTranslation =
    teacher.translations.find((t) => t.languageCode === "en") ||
    teacher.translations[0];

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/nastavnici/${teacher.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Teacher Qualifications
          </h1>
          <p className="text-muted-foreground">
            {mainTranslation?.value?.name || "Unnamed Teacher"}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {showAddForm || editingQualification ? (
          <QualificationForm
            teacherId={teacher.id}
            qualification={editingQualification || undefined}
            languages={languages}
            onSuccess={handleQualificationSuccess}
            onCancel={() => {
              setShowAddForm(false);
              setEditingQualification(null);
            }}
          />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Qualifications</CardTitle>
                <CardDescription>
                  Manage teacher&apos;s qualifications and certifications
                </CardDescription>
              </div>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Qualification
              </Button>
            </CardHeader>
            <CardContent>
              {teacher.qualifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted p-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    No qualifications added
                  </h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Add qualifications to showcase this teacher&apos;s expertise
                    and credentials
                  </p>
                  <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Qualification
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {teacher.qualifications.map((qualification) => {
                    const mainTranslation =
                      qualification.translations[0]?.value;

                    return (
                      <div
                        key={qualification.id}
                        className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                      >
                        <div>
                          <h4 className="font-medium">
                            {mainTranslation?.name || "Unnamed Qualification"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              qualification.dateObtained,
                            ).toLocaleDateString()}
                          </p>
                          <p className="mt-1 text-sm">
                            {mainTranslation?.description || "No description"}
                          </p>
                        </div>
                        <div className="flex gap-2 self-end sm:self-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setEditingQualification(qualification)
                            }
                          >
                            Edit
                          </Button>
                          <AlertDialog
                            open={qualificationToDelete === qualification.id}
                            onOpenChange={(open) => {
                              if (!open) setQualificationToDelete(null);
                            }}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() =>
                                  setQualificationToDelete(qualification.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the qualification
                                  &quot;
                                  {mainTranslation?.name ||
                                    "Unnamed Qualification"}
                                  &quot; and all its translations. This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteQualification}
                                  className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
