"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
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
import { Calendar, Globe, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Qualification = Schema<"AdminQualificationResponseDto">;
type QualificationTranslation =
  Schema<"AdminQualificationTranslationResponseDtoTranslationWrapper">;
type Language = Schema<"LanguageResponseDto">;

type QualificationFormProps = {
  teacherId: number;
  qualification?: Qualification;
  languages: Language[];
  onSuccess: (qualification: Qualification) => void;
  onCancel: () => void;
};

export function QualificationForm({
  teacherId,
  qualification,
  languages,
  onSuccess,
  onCancel,
}: QualificationFormProps) {
  const isEditing = !!qualification;
  const [activeTab, setActiveTab] = useState("details");

  const [qualificationData, setQualificationData] = useState<
    Omit<Qualification, "id"> | (Qualification & { id: number })
  >(
    qualification || {
      teacherId,
      dateObtained: new Date().toISOString().split("T")[0],
      translations: [],
    },
  );

  const [currentTranslation, setCurrentTranslation] = useState<
    Omit<QualificationTranslation, "qualificationId">
  >({
    languageCode: "",
    value: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    // Set default language to English if available
    const englishLang = languages.find((l) => l.code === "en");
    if (englishLang && !isEditing) {
      setCurrentTranslation((prev) => ({
        ...prev,
        languageCode: englishLang.code,
      }));
    }
  }, [languages, isEditing]);

  const handleAddTranslation = () => {
    if (!currentTranslation.languageCode || !currentTranslation.value.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if translation for this language already exists
    const existingIndex = qualificationData.translations.findIndex(
      (t) => t.languageCode === currentTranslation.languageCode,
    );

    if (existingIndex !== -1) {
      // Update existing translation
      const updatedTranslations = [...qualificationData.translations];
      updatedTranslations[existingIndex] = { ...currentTranslation };

      setQualificationData({
        ...qualificationData,
        translations: updatedTranslations,
      });
    } else {
      // Add new translation
      setQualificationData({
        ...qualificationData,
        translations: [
          ...qualificationData.translations,
          { ...currentTranslation },
        ],
      });
    }

    // Reset form and switch to details tab
    setCurrentTranslation({
      languageCode: "",
      value: {
        name: "",
        description: "",
      },
    });

    setActiveTab("details");
    toast.success("Translation added successfully");
  };

  const handleSave = async () => {
    if (qualificationData.translations.length === 0) {
      toast.error("Please add at least one translation");
      return;
    }

    if (isEditing && "id" in qualificationData) {
      const promise = sendApiRequest(`/qualification`, {
        method: "put",
        payload: {
          id: qualificationData.id,
          dateObtained: qualificationData.dateObtained,
          translations: qualificationData.translations.map((x) => ({
            qualificationId: qualificationData.id,
            languageCode: x.languageCode,
            name: x.value.name,
            description: x.value.description,
          })),
        },
      });

      toast.promise(
        promise.then((response) => {
          if (!response.isOk)
            throw new Error(
              response.error?.message ?? "Failed to update qualification",
            );
        }),
        {
          loading: "Updating qualification...",
          success: "Qualification updated successfully",
          error: "Failed to update qualification",
        },
      );

      const { isOk } = await promise;
      if (isOk) onSuccess(qualificationData as Qualification);

      return;
    }

    const promise = sendApiRequest("/qualification", {
      method: "post",
      payload: {
        dateObtained: qualificationData.dateObtained,
        teacherId: teacherId,
        translations: qualificationData.translations.map((x) => ({
          qualificationId: 0,
          languageCode: x.languageCode,
          name: x.value.name,
          description: x.value.description,
        })),
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to create qualification",
          );
      }),
      {
        loading: "Adding qualification...",
        success: "Qualification added successfully",
        error: "Failed to add qualification",
      },
    );

    const { isOk } = await promise;
    if (isOk) onSuccess(qualificationData as Qualification);
  };

  const availableLanguages = languages.filter(
    (lang) =>
      !qualificationData.translations.some((t) => t.languageCode === lang.code),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Qualification" : "Add Qualification"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update qualification details and translations"
            : "Add a new qualification for this teacher"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="translation">Add Translation</TabsTrigger>
            {qualificationData.translations.map((translation) => (
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
            <div>
              <Label htmlFor="date-obtained">Date Obtained</Label>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date-obtained"
                  type="date"
                  value={
                    qualificationData.dateObtained.toString().split("T")[0]
                  }
                  onChange={(e) =>
                    setQualificationData({
                      ...qualificationData,
                      dateObtained: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Translations</h3>
              <div className="flex flex-wrap gap-2">
                {qualificationData.translations.length > 0 ? (
                  qualificationData.translations.map((translation) => (
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

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={qualificationData.translations.length === 0}
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update" : "Save"} Qualification
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="translation" className="mt-4 space-y-4">
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
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="name">Qualification Name</Label>
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
                placeholder="e.g., PhD in Mathematics"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentTranslation.value.description}
                onChange={(e) =>
                  setCurrentTranslation({
                    ...currentTranslation,
                    value: {
                      ...currentTranslation.value,
                      description: e.target.value,
                    },
                  })
                }
                placeholder="Describe the qualification..."
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleAddTranslation}
                disabled={
                  !currentTranslation.languageCode ||
                  !currentTranslation.value.name
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Translation
              </Button>
            </div>
          </TabsContent>

          {qualificationData.translations.map((translation) => (
            <TabsContent
              key={translation.languageCode}
              value={translation.languageCode}
              className="mt-4 space-y-4"
            >
              <div>
                <Label htmlFor={`name-${translation.languageCode}`}>
                  Qualification Name
                </Label>
                <Input
                  id={`name-${translation.languageCode}`}
                  value={translation.value.name}
                  onChange={(e) => {
                    const updatedTranslations =
                      qualificationData.translations.map((t) =>
                        t.languageCode === translation.languageCode
                          ? {
                              ...t,
                              value: { ...t.value, name: e.target.value },
                            }
                          : t,
                      );
                    setQualificationData({
                      ...qualificationData,
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
                    const updatedTranslations =
                      qualificationData.translations.map((t) =>
                        t.languageCode === translation.languageCode
                          ? {
                              ...t,
                              value: {
                                ...t.value,
                                description: e.target.value,
                              },
                            }
                          : t,
                      );
                    setQualificationData({
                      ...qualificationData,
                      translations: updatedTranslations,
                    });
                  }}
                  rows={4}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
