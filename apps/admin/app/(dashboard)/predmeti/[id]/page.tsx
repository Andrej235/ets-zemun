"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { TeacherSelector } from "@/components/teacher-selector";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import getTranslationStatus from "@/lib/get-translation-status";
import { useLanguageStore } from "@/stores/language-store";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Globe, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type Teacher = Schema<"SimpleTeacherResponseDto">;
type Subject = Schema<"AdminFullSubjectResponseDto">;
type SubjectTranslation =
  Schema<"AdminFullSubjectTranslationDtoTranslationWrapper">;

export default function EditSubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const [subject, setSubject] = useState<Subject | null>(null);
  const languages = useLanguageStore((x) => x.languages);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [newTranslation, setNewTranslation] = useState<
    Omit<SubjectTranslation, "subjectId">
  >({
    languageCode: "",
    value: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectData, teachersData] = await Promise.all([
          sendApiRequest("/subjects/admin/{id}", {
            method: "get",
            parameters: {
              id: +id,
            },
          }),
          sendApiRequest("/teachers/simple", {
            method: "get",
            parameters: {
              languageCode: "sr_lt",
              limit: -1,
            },
          }),
        ]);

        if (subjectData.isOk) {
          setSubject(subjectData.response!);
        } else {
          toast.error("Subject not found");
          router.push("/predmeti");
          return;
        }

        setAllTeachers(teachersData.response!.items);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleUpdateSubject = async () => {
    if (!subject) return;

    const promise = sendApiRequest("/subjects", {
      method: "put",
      payload: {
        id: subject.id,
        teachers: subject.teachers.map((x) => x.id),
        translations: subject.translations.map((x) => ({
          languageCode: x.languageCode,
          subjectId: subject.id,
          ...x.value,
        })),
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to update subject",
          );
      }),
      {
        loading: "Updating subject...",
        success: "Subject updated successfully",
        error: (x) => (x as Error).message,
      },
    );
  };

  const handleAddTranslation = async () => {
    if (
      !subject ||
      !newTranslation.languageCode ||
      !newTranslation.value.name
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const translation: SubjectTranslation = {
      ...newTranslation,
    };

    const promise = sendApiRequest("/subjects/translation", {
      method: "post",
      payload: {
        subjectId: subject.id,
        languageCode: translation.languageCode,
        ...translation.value,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to add translation",
          );
      }),
      {
        loading: "Adding translation...",
        success: "Translation added successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    // Update local state
    setSubject({
      ...subject,
      translations: [...subject.translations, translation],
    });

    // Reset form
    setNewTranslation({
      languageCode: "",
      value: {
        name: "",
        description: "",
      },
    });

    setActiveTab("details");
  };

  const handleTeacherSelection = (selectedTeachers: Teacher[]) => {
    if (!subject) return;

    setSubject({
      ...subject,
      teachers: selectedTeachers,
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!subject) {
    return null;
  }

  const translationStatus = getTranslationStatus(
    subject.translations.map((x) => x.languageCode),
    languages.map((l) => l.code),
  );

  const availableLanguages = languages.filter(
    (lang) => !subject.translations.some((t) => t.languageCode === lang.code),
  );

  const mainTranslation =
    subject.translations.find((t) => t.languageCode === "sr_lt")?.value ||
    subject.translations[0].value;

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/predmeti")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Subject</h1>
          <p className="text-muted-foreground">
            {mainTranslation?.name || "Untitled Subject"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {Object.entries(translationStatus).map(([lang, status]) => (
          <TranslationStatusBadge key={lang} language={lang} status={status} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            {subject.translations.map((translation) => (
              <TabsTrigger
                key={translation.languageCode}
                value={translation.languageCode}
              >
                {languages.find((l) => l.code === translation.languageCode)
                  ?.fullName || translation.languageCode}
              </TabsTrigger>
            ))}
            <TabsTrigger value="add-translation">
              <Plus className="mr-1 h-4 w-4" />
              Add Translation
            </TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Details</CardTitle>
                <CardDescription>
                  Basic information about the subject
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    {mainTranslation?.name || "Untitled Subject"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {subject.translations.map((translation) => (
                    <div
                      key={translation.languageCode}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      <Globe className="mr-1 h-3 w-3" />
                      {languages.find(
                        (l) => l.code === translation.languageCode,
                      )?.fullName || translation.languageCode}
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">
                    Assigned Teachers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {subject.teachers.length > 0 ? (
                      subject.teachers.map((teacher) => {
                        const teacherName = teacher.name || "Unnamed Teacher";
                        return (
                          <div
                            key={teacher.id}
                            className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                          >
                            {teacherName}
                          </div>
                        );
                      })
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No teachers assigned
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleUpdateSubject}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {subject.translations.map((translation) => (
            <TabsContent
              key={translation.languageCode}
              value={translation.languageCode}
              className="mt-4 space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {languages.find((l) => l.code === translation.languageCode)
                      ?.fullName || translation.languageCode}{" "}
                    Translation
                  </CardTitle>
                  <CardDescription>
                    Edit the translation details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`name-${translation.languageCode}`}>
                      Subject Name
                    </Label>
                    <Input
                      id={`name-${translation.languageCode}`}
                      value={translation.value.name}
                      onChange={(e) => {
                        const updatedTranslations = subject.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  languageCode: t.languageCode,
                                  value: {
                                    name: e.target.value,
                                    description: t.value.description,
                                  },
                                }
                              : t,
                        );
                        setSubject({
                          ...subject,
                          translations: updatedTranslations,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${translation.languageCode}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`description-${translation.languageCode}`}
                      value={translation.value.description}
                      onChange={(e) => {
                        const updatedTranslations = subject.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  languageCode: t.languageCode,
                                  value: {
                                    name: t.value.name,
                                    description: e.target.value,
                                  },
                                }
                              : t,
                        );
                        setSubject({
                          ...subject,
                          translations: updatedTranslations,
                        });
                      }}
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleUpdateSubject}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Translation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="add-translation" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Translation</CardTitle>
                <CardDescription>
                  Create a translation in another language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={newTranslation.languageCode}
                      onChange={(e) =>
                        setNewTranslation({
                          ...newTranslation,
                          languageCode: e.target.value,
                        })
                      }
                    >
                      <option value="">Select language</option>
                      {availableLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-name">Subject Name</Label>
                  <Input
                    id="new-name"
                    value={newTranslation.value.name}
                    onChange={(e) =>
                      setNewTranslation({
                        ...newTranslation,
                        value: {
                          ...newTranslation.value,
                          name: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div>
                  <Label htmlFor="new-description">Description</Label>
                  <Textarea
                    id="new-description"
                    value={newTranslation.value.description}
                    onChange={(e) =>
                      setNewTranslation({
                        ...newTranslation,
                        value: {
                          ...newTranslation.value,
                          description: e.target.value,
                        },
                      })
                    }
                    placeholder="Describe the subject..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddTranslation}
                    disabled={
                      !newTranslation.languageCode || !newTranslation.value.name
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Translation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Teachers</CardTitle>
                <CardDescription>
                  Assign teachers to this subject
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TeacherSelector
                  teachers={allTeachers}
                  selectedTeachers={subject.teachers}
                  onChange={handleTeacherSelection}
                />

                <div className="flex justify-end">
                  <Button onClick={handleUpdateSubject}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Teacher Assignments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
