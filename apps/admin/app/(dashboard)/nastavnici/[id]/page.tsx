"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { TeacherTranslations } from "@/components/teacher-translations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import compressImage from "@/lib/compress-image";
import { useLanguageStore } from "@/stores/language-store";
import { ArrowLeft, Globe, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Teacher = Schema<"AdminFullTeacherResponseDto">;
type Subject = Schema<"AdminSubjectResponseDto">;

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const languages = useLanguageStore((x) => x.languages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const currentPromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        const [{ response: teacherData }, { response: subjectsData }] =
          await Promise.all([
            await sendApiRequest("/teacher/admin/{id}", {
              method: "get",
              parameters: {
                id: +teacherId,
              },
            }),
            await sendApiRequest("/subject/admin", {
              method: "get",
              parameters: {
                limit: -1,
              },
            }),
          ]);

        if (!teacherData) {
          throw new Error("Teacher not found");
        }

        setTeacher(teacherData);
        setSubjects(subjectsData!);
      } catch (err) {
        console.error("Error fetching teacher data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load teacher data",
        );
        toast.error("Failed to load teacher data");
      } finally {
        setLoading(false);
      }

      currentPromise.current = null;
    }

    currentPromise.current ??= fetchData();
  }, [teacherId]);

  // Handle loading state
  if (loading) {
    return <TeacherDetailSkeleton />;
  }

  // Handle error state
  if (error || !teacher) {
    return (
      <div className="container mx-auto py-10">
        <div className="mb-6">
          <Link href="/nastavnici">
            <Button variant="ghost" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Teachers
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-600">Error</h2>
            <p className="text-muted-foreground">
              {error || "Teacher not found"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/nastavnici")}
            >
              Return to Teachers List
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const teacherSubjects = subjects.filter((subject) =>
    teacher.subjects.some((x) => x.id === subject.id),
  );

  async function handleSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file, 0.2);
    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressed);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    if (!teacher) return;

    const promise = sendApiRequest("/teacher", {
      method: "put",
      payload: {
        id: teacher.id,
        email: teacher.email,
        image: imageBase64,
        startOfOpenOfficeHoursFirstShift: null,
        startOfOpenOfficeHoursSecondShift: null,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to update user role",
          );
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully",
        error: "Failed to upload image",
      },
    );

    const { isOk } = await promise;
    if (!isOk) return;

    setTeacher((x) => ({
      ...x!,
      image: imageBase64,
    }));
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/nastavnici">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Teachers
          </Button>
        </Link>
      </div>

      <h1 className="mb-4 text-3xl font-bold">
        {teacher.translations[0].value.name}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="translations">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Translations
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Information</CardTitle>
            </CardHeader>

            <CardContent className="flex items-start gap-16">
              <div className="relative">
                <Image
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.translations[0].value.name}
                  width={200}
                  height={200}
                  className="pointer-events-none size-32 rounded-full object-cover"
                />

                <Input
                  type="file"
                  className="absolute top-0 z-10 size-full opacity-0"
                  onChange={handleSelectImage}
                />
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <p>{teacher.email}</p>
                </div>

                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        type="button"
                      >
                        Edit Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Email</DialogTitle>
                        <DialogDescription>
                          Please enter the new email address for the teacher.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input type="email" defaultValue={teacher.email} />
                        <DialogFooter className="grid grid-cols-2">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-center"
                              type="button"
                            >
                              Cancel
                            </Button>
                          </DialogClose>

                          <DialogClose asChild>
                            <Button
                              className="w-full justify-center"
                              type="submit"
                              onClick={async (e) => {
                                const editedEmail = (
                                  e.target as HTMLElement
                                ).parentElement?.parentElement?.querySelector(
                                  "input",
                                )?.value;
                                if (!editedEmail) return;

                                const promise = sendApiRequest(`/teacher`, {
                                  method: "put",
                                  payload: {
                                    id: teacher.id,
                                    image: teacher.image,
                                    email: editedEmail,
                                    startOfOpenOfficeHoursFirstShift: null,
                                    startOfOpenOfficeHoursSecondShift: null,
                                  },
                                });

                                setTeacher((prev) => ({
                                  ...prev!,
                                  email: editedEmail,
                                }));

                                toast.promise(
                                  promise.then((response) => {
                                    if (!response.isOk)
                                      throw new Error(
                                        response.error?.message ??
                                          "Failed to update user role",
                                      );
                                  }),
                                  {
                                    loading: "Updating teacher email...",
                                    success:
                                      "Teacher email updated successfully",
                                    error: "Failed to update teacher email",
                                  },
                                );
                              }}
                            >
                              Update
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              {teacherSubjects.length > 0 ? (
                <ul className="space-y-2">
                  {teacherSubjects.map((subject) => (
                    <li key={subject.id} className="flex items-center gap-2">
                      <Badge variant="secondary">{subject.name}</Badge>
                      <span className="text-sm text-muted-foreground">
                        ({subject.name})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No subjects assigned to this teacher.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualifications">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Professional Qualifications</CardTitle>
              <Link href={`/nastavnici/${teacherId}/qualifications`}>
                <Button size="sm">Manage Qualifications</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and manage professional qualifications and certifications.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations">
          {teacher && languages.length > 0 ? (
            <TeacherTranslations
              teacher={teacher}
              languages={languages}
              onChangeTranslations={(newTranslations) =>
                setTeacher((x) => ({ ...x!, translations: newTranslations }))
              }
            />
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="ml-2">Loading translations...</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Skeleton loader component for the teacher detail page
function TeacherDetailSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="ghost" className="gap-1" disabled>
          <ArrowLeft className="h-4 w-4" />
          Back to Teachers
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="mb-6">
        <Skeleton className="mb-6 h-10 w-full max-w-md" />

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-6 w-64" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <Skeleton className="h-7 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
