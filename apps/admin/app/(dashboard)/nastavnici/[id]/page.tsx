"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { SubjectSelector } from "@/components/subject-selector";
import { TeacherTranslations } from "@/components/teacher-translations";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import getTranslationStatus from "@/lib/get-translation-status";
import { useLanguageStore } from "@/stores/language-store";
import { ArrowLeft, Calendar, Globe, Loader2 } from "lucide-react";
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
            await sendApiRequest("/teachers/admin/{id}", {
              method: "get",
              parameters: {
                id: +teacherId,
              },
            }),
            await sendApiRequest("/subjects/admin", {
              method: "get",
              parameters: {
                limit: -1,
              },
            }),
          ]);

        if (!teacherData) {
          throw new Error("Nastavnik nije pronađen");
        }

        setTeacher(teacherData);
        setSubjects(subjectsData!);
      } catch (err) {
        console.error("Error fetching teacher data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Neuspešno učitavanje podataka o nastavniku",
        );
        toast.error("Neuspešno učitavanje podataka o nastavniku");
      } finally {
        setLoading(false);
      }

      currentPromise.current = null;
    }

    currentPromise.current ??= fetchData();
  }, [teacherId]);

  async function handleSaveSubjectAssignments() {
    if (!teacher) return;

    const promise = sendApiRequest("/teachers/subject", {
      method: "put",
      payload: {
        teacherId: +teacherId,
        subjectIds: teacher.subjects.map((x) => x.id),
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno čuvanje predmeta",
          );
      }),
      {
        loading: "Čuvanje predmeta...",
        success: "Predmeti su uspešno sačuvani",
        error: "Neuspešno čuvanje predmeta",
      },
    );
  }

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
              Nazad na nastavnike
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-600">Greška</h2>
            <p className="text-muted-foreground">
              {error || "Nastavnik nije pronađen"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/nastavnici")}
            >
              Povratak na listu nastavnika
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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

    const promise = sendApiRequest("/teachers", {
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
            response.error?.message ?? "Neuspešno otpremanje slike",
          );
      }),
      {
        loading: "Otpremanje slike...",
        success: "Slika je uspešno otpremljena",
        error: "Neuspešno otpremanje slike",
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
            Nazad na nastavnike
          </Button>
        </Link>
      </div>

      <h1 className="mb-4 text-3xl font-bold">
        {teacher.translations[0].value.name}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="details">Detalji</TabsTrigger>
          <TabsTrigger value="subjects">Predmeti</TabsTrigger>
          <TabsTrigger value="qualifications">Kvalifikacije</TabsTrigger>
          <TabsTrigger value="translations">
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Prevodi
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Informacije o nastavniku</CardTitle>
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

              {/* TODO: Add translation badges / status */}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {Object.entries(
                    getTranslationStatus(
                      teacher.translations.map((x) => x.languageCode),
                      languages.map((l) => l.code),
                    ),
                  ).map(([lang, status]) => (
                    <TranslationStatusBadge
                      key={lang}
                      language={lang}
                      status={status}
                    />
                  ))}
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
                          Izmeni email
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Izmeni email</DialogTitle>
                          <DialogDescription>
                            Unesite novu email adresu za nastavnika.
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
                                Otkaži
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

                                  const promise = sendApiRequest(`/teachers`, {
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
                                            "Neuspešno ažuriranje email adrese",
                                        );
                                    }),
                                    {
                                      loading: "Ažuriranje email adrese...",
                                      success:
                                        "Email adresa je uspešno ažurirana",
                                      error:
                                        "Neuspešno ažuriranje email adrese",
                                    },
                                  );
                                }}
                              >
                                Ažuriraj
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dodeli predmete</CardTitle>
              <CardDescription>
                Izaberite predmete koje ovaj nastavnik predaje
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SubjectSelector
                subjects={subjects}
                selectedSubjects={teacher.subjects}
                onChange={(x) =>
                  setTeacher((prev) => ({ ...prev!, subjects: x }))
                }
              />

              <div className="flex justify-end">
                <Button onClick={handleSaveSubjectAssignments}>
                  Sačuvaj predmete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualifications">
          <Card>
            <CardHeader className="gap-y-0">
              <div className="flex flex-row items-center justify-between">
                <CardTitle>Stručne kvalifikacije</CardTitle>
                <Link href={`/nastavnici/${teacherId}/kvalifikacije`}>
                  <Button size="sm">Upravljaj kvalifikacijama</Button>
                </Link>
              </div>

              <p className="text-muted-foreground">
                Pregled i upravljanje stručnim kvalifikacijama i sertifikatima.
              </p>
            </CardHeader>
            <CardContent>
              {teacher.qualifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted p-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    Nema dodatih kvalifikacija
                  </h3>
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
                            {mainTranslation?.name ||
                              "Kvalifikacija bez naziva"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(
                              qualification.dateObtained,
                            ).toLocaleDateString()}
                          </p>
                          <p className="mt-1 text-sm">
                            {mainTranslation?.description || "Bez opisa"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
                  <span className="ml-2">Učitavanje prevoda...</span>
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
          Nazad na nastavnike
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
