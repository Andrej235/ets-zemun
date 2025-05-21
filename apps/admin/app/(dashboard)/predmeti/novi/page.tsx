"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Globe, Plus, Save } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeacherSelector } from "@/components/teacher-selector";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useLanguageStore } from "@/stores/language-store";
import sendApiRequest from "@/api-dsl/send-api-request";
import FullPageLoadingIndicator from "@/components/full-page-loading-indicator";

type Teacher = Schema<"SimpleTeacherResponseDto">;
type Subject = {
  id: number;
  translations: SubjectTranslation[];
  teachers: Teacher[];
};
type SubjectTranslation = Omit<
  Schema<"CreateSubjectTranslationRequestDto">,
  "subjectId"
>;

export default function CreateSubjectPage() {
  const router = useRouter();
  const languages = useLanguageStore((x) => x.languages);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  const [subjectData, setSubjectData] = useState<Omit<Subject, "id">>({
    translations: [],
    teachers: [],
  });

  const [currentTranslation, setCurrentTranslation] = useState<
    Omit<SubjectTranslation, "subjectId">
  >({
    languageCode: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersData = await sendApiRequest("/teachers/simple", {
          method: "get",
          parameters: {
            languageCode: "sr_lt",
            limit: -1,
          },
        });

        setTeachers(teachersData.response!.items);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTranslation = () => {
    if (!currentTranslation.languageCode || !currentTranslation.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if translation for this language already exists
    const existingIndex = subjectData.translations.findIndex(
      (t) => t.languageCode === currentTranslation.languageCode,
    );

    if (existingIndex !== -1) {
      // Update existing translation
      const updatedTranslations = [...subjectData.translations];
      updatedTranslations[existingIndex] = { ...currentTranslation };

      setSubjectData({
        ...subjectData,
        translations: updatedTranslations,
      });
    } else {
      // Add new translation
      setSubjectData({
        ...subjectData,
        translations: [...subjectData.translations, { ...currentTranslation }],
      });
    }

    // Reset form and switch to details tab
    setCurrentTranslation({
      languageCode: "",
      name: "",
      description: "",
    });

    setActiveTab("details");
    toast.success("Translation added successfully");
  };

  const handleCreateSubject = async () => {
    if (subjectData.translations.length === 0) {
      toast.error("Please add at least one translation");
      return;
    }

    const promise = sendApiRequest("/subjects", {
      method: "post",
      payload: {
        translations: subjectData.translations.map((x) => ({
          ...x,
          subjectId: 0,
        })),
        teachers: subjectData.teachers.map((x) => x.id),
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to create subject",
          );
      }),
      {
        loading: "Creating subject...",
        success: "Subject created successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;
    router.push("/predmeti");
  };

  const handleTeacherSelection = (selectedTeachers: Teacher[]) => {
    setSubjectData({
      ...subjectData,
      teachers: selectedTeachers,
    });
  };

  if (loading) {
    return <FullPageLoadingIndicator />;
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Create Subject</h1>
          <p className="text-muted-foreground">
            Add a new subject to the curriculum
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="translation">Add Translation</TabsTrigger>
            <TabsTrigger value="teachers">Assign Teachers</TabsTrigger>
            {subjectData.translations.map((translation) => (
              <TabsTrigger
                key={translation.languageCode}
                value={translation.languageCode}
              >
                {languages.find((l) => l.code === translation.languageCode)
                  ?.fullName || translation.languageCode}
              </TabsTrigger>
            ))}
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
                    {subjectData.translations.length > 0
                      ? subjectData.translations.find(
                          (t) => t.languageCode === "en",
                        )?.name || subjectData.translations[0].name
                      : "New Subject"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {subjectData.translations.map((translation) => (
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

                <div className="flex flex-wrap gap-2">
                  {subjectData.teachers.length > 0 ? (
                    subjectData.teachers.map((teacher) => {
                      const teacherName =
                        teacher.name || "Teacher " + teacher.id;
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

                <div className="flex justify-between pt-4">
                  <div>
                    {subjectData.translations.length === 0 && (
                      <p className="text-sm text-amber-500">
                        Please add at least one translation
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleCreateSubject}
                    disabled={subjectData.translations.length === 0}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Create Subject
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translation" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Translation</CardTitle>
                <CardDescription>
                  Create a translation for the subject
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language" className="mb-2">
                    Language
                  </Label>

                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={currentTranslation.languageCode}
                      onChange={(e) =>
                        setCurrentTranslation({
                          ...currentTranslation,
                          languageCode: e.target.value,
                        })
                      }
                    >
                      <option value="">Select language</option>
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Subject Name</Label>
                  <Input
                    id="name"
                    value={currentTranslation.name}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g., Mathematics"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentTranslation.description}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        description: e.target.value,
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
                      !currentTranslation.languageCode ||
                      !currentTranslation.name
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
                <CardTitle>Assign Teachers</CardTitle>
                <CardDescription>
                  Select teachers who will teach this subject
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TeacherSelector
                  teachers={teachers}
                  selectedTeachers={subjectData.teachers}
                  onChange={handleTeacherSelection}
                />

                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("details")}>
                    Save Teacher Assignments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {subjectData.translations.map((translation) => (
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
                    View or edit the translation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`name-${translation.languageCode}`}>
                      Subject Name
                    </Label>
                    <Input
                      id={`name-${translation.languageCode}`}
                      value={translation.name}
                      onChange={(e) => {
                        const updatedTranslations =
                          subjectData.translations.map((t) =>
                            t.languageCode === translation.languageCode
                              ? { ...t, name: e.target.value }
                              : t,
                          );
                        setSubjectData({
                          ...subjectData,
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
                      value={translation.description}
                      onChange={(e) => {
                        const updatedTranslations =
                          subjectData.translations.map((t) =>
                            t.languageCode === translation.languageCode
                              ? { ...t, description: e.target.value }
                              : t,
                          );
                        setSubjectData({
                          ...subjectData,
                          translations: updatedTranslations,
                        });
                      }}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
