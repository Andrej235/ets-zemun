"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { SubjectSelector } from "@/components/subject-selector";
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
import compressImage from "@/lib/compress-image";
import { useLanguageStore } from "@/stores/language-store";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Mail,
  Plus,
  Save,
  Upload,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Subject = Schema<"AdminSubjectResponseDto">;
type TeacherSubject = Schema<"SimpleSubjectResponseDto">;
type Teacher = Schema<"AdminFullTeacherResponseDto">;
type TeacherTranslation =
  Schema<"AdminFullTeacherTranslationResponseDtoTranslationWrapper">;

export default function CreateTeacherPage() {
  const router = useRouter();
  const languages = useLanguageStore((x) => x.languages);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  const [teacherData, setTeacherData] = useState<Omit<Teacher, "id">>({
    email: "",
    image: "/placeholder.svg",
    translations: [],
    qualifications: [],
    subjects: [],
  });

  const [currentTranslation, setCurrentTranslation] = useState<
    Omit<TeacherTranslation, "teacherId">
  >({
    languageCode: "sr_lt",
    value: {
      name: "",
      title: "",
      bio: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjects = await sendApiRequest("/subject/admin", {
          method: "get",
          parameters: {
            limit: -1,
          },
        });

        setSubjects(subjects.response!);
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTranslation = () => {
    if (
      !currentTranslation.languageCode ||
      !currentTranslation.value.name ||
      !currentTranslation.value.title
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if translation for this language already exists
    const existingIndex = teacherData.translations.findIndex(
      (t) => t.languageCode === currentTranslation.languageCode,
    );

    if (existingIndex !== -1) {
      // Update existing translation
      const updatedTranslations = [...teacherData.translations];
      updatedTranslations[existingIndex] = { ...currentTranslation };

      setTeacherData({
        ...teacherData,
        translations: updatedTranslations,
      });
    } else {
      // Add new translation
      setTeacherData({
        ...teacherData,
        translations: [...teacherData.translations, { ...currentTranslation }],
      });
    }

    // Reset form and switch to details tab
    setCurrentTranslation({
      languageCode: "",
      value: {
        name: "",
        title: "",
        bio: "",
      },
    });

    setActiveTab("details");
    toast.success("Translation added successfully");
  };

  const handleCreateTeacher = async () => {
    if (!teacherData.email) {
      toast.error("Please enter an email address");
      return;
    }

    if (teacherData.translations.length === 0) {
      toast.error("Please add at least one translation");
      return;
    }

    const promise = sendApiRequest("/teacher", {
      method: "post",
      payload: {
        email: teacherData.email,
        image: teacherData.image,
        translations: teacherData.translations.map((x) => ({
          teacherId: 0,
          languageCode: x.languageCode,
          ...x.value,
        })),
        qualifications: teacherData.qualifications,
        subjects: teacherData.subjects,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to create teacher",
          );
      }),
      {
        loading: "Creating teacher...",
        success: "Teacher created successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;
    router.push("/nastavnici");
  };

  const handleSubjectSelection = (selectedSubjects: TeacherSubject[]) => {
    setTeacherData({
      ...teacherData,
      subjects: selectedSubjects,
    });
  };

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

    setTeacherData({
      ...teacherData,
      image: imageBase64,
    });
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/nastavnici")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Teacher</h1>
          <p className="text-muted-foreground">
            Add a new teacher to the system
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
            <TabsTrigger value="subjects">Assign Subjects</TabsTrigger>
            {teacherData.translations.map((translation) => (
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
                <CardTitle>Teacher Details</CardTitle>
                <CardDescription>
                  Basic information about the teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-col items-center md:w-1/3">
                    <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full bg-muted">
                      {teacherData.image ? (
                        <Image
                          src={teacherData.image || "/placeholder.svg"}
                          alt="Teacher"
                          className="h-full w-full object-cover"
                          fill
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Users className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(e) =>
                        (e.target as HTMLButtonElement)
                          .querySelector("input")
                          ?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                      <Input
                        type="file"
                        className="pointer-events-none absolute size-full opacity-0"
                        onChange={handleSelectImage}
                      />
                    </Button>
                  </div>

                  <div className="space-y-4 md:w-2/3">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={teacherData.email}
                          onChange={(e) =>
                            setTeacherData({
                              ...teacherData,
                              email: e.target.value,
                            })
                          }
                          placeholder="teacher@school.edu"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-2 text-sm font-medium">Translations</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacherData.translations.length > 0 ? (
                      teacherData.translations.map((translation) => (
                        <div
                          key={translation.languageCode}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          <Globe className="mr-1 h-3 w-3" />
                          {languages.find(
                            (l) => l.code === translation.languageCode,
                          )?.fullName || translation.languageCode}
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-amber-500">
                        Please add at least one translation
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">
                    Assigned Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {teacherData.subjects.length > 0 ? (
                      teacherData.subjects.map((subject) => (
                        <div
                          key={subject.id}
                          className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {subject.name}
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No subjects assigned
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <div>
                    {!teacherData.email && (
                      <p className="text-sm text-amber-500">
                        Please enter an email address
                      </p>
                    )}
                    {teacherData.translations.length === 0 && (
                      <p className="text-sm text-amber-500">
                        Please add at least one translation
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleCreateTeacher}
                    disabled={
                      !teacherData.email ||
                      teacherData.translations.length === 0
                    }
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Create Teacher
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
                  Create a translation for the teacher&apos;s information
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
                  <Label htmlFor="name">Teacher Name</Label>
                  <Input
                    id="name"
                    value={currentTranslation.value.name}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        value: {
                          ...currentTranslation.value,
                          name: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={currentTranslation.value.title}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        value: {
                          ...currentTranslation.value,
                          title: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Mathematics Professor"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={currentTranslation.value.bio}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        value: {
                          ...currentTranslation.value,
                          bio: e.target.value,
                        },
                      })
                    }
                    placeholder="Teacher's biography and background..."
                    rows={6}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddTranslation}
                    disabled={
                      !currentTranslation.languageCode ||
                      !currentTranslation.value.name ||
                      !currentTranslation.value.title
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Translation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assign Subjects</CardTitle>
                <CardDescription>
                  Select subjects that this teacher will teach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SubjectSelector
                  subjects={subjects}
                  selectedSubjects={teacherData.subjects}
                  onChange={handleSubjectSelection}
                />

                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("details")}>
                    Save Subject Assignments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {teacherData.translations.map((translation) => (
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
                      Teacher Name
                    </Label>
                    <Input
                      id={`name-${translation.languageCode}`}
                      value={translation.value.name}
                      onChange={(e) => {
                        const updatedTranslations =
                          teacherData.translations.map((t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: { ...t.value, name: e.target.value },
                                }
                              : t,
                          );
                        setTeacherData({
                          ...teacherData,
                          translations: updatedTranslations,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`title-${translation.languageCode}`}>
                      Title
                    </Label>
                    <Input
                      id={`title-${translation.languageCode}`}
                      value={translation.value.title}
                      onChange={(e) => {
                        const updatedTranslations =
                          teacherData.translations.map((t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: { ...t.value, title: e.target.value },
                                }
                              : t,
                          );
                        setTeacherData({
                          ...teacherData,
                          translations: updatedTranslations,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`bio-${translation.languageCode}`}>
                      Biography
                    </Label>
                    <Textarea
                      id={`bio-${translation.languageCode}`}
                      value={translation.value.bio}
                      onChange={(e) => {
                        const updatedTranslations =
                          teacherData.translations.map((t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: { ...t.value, bio: e.target.value },
                                }
                              : t,
                          );
                        setTeacherData({
                          ...teacherData,
                          translations: updatedTranslations,
                        });
                      }}
                      rows={6}
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
