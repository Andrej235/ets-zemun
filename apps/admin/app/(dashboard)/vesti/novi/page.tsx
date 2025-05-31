"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import RichTextEditor from "@/components/rich-text-editor";
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
import { ArrowLeft, Globe, Plus, Save, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type News = Schema<"AdminNewsResponseDto">;
type NewsTranslation =
  Schema<"AdminNewsTranslationResponseDtoTranslationWrapper">;

export default function CreateNewsPage() {
  const router = useRouter();
  const languages = useLanguageStore((state) => state.languages);
  const [activeTab, setActiveTab] = useState("details");

  const [newsData, setNewsData] = useState<Omit<News, "id">>({
    previewImage: "/placeholder.svg",
    date: new Date().toISOString().split("T")[0],
    isApproved: false,
    translations: [],
  });

  const [currentTranslation, setCurrentTranslation] = useState<NewsTranslation>(
    {
      languageCode: "sr",
      value: {
        title: "",
        description: "",
        markup: "",
      },
    },
  );

  const handleAddTranslation = () => {
    if (
      !currentTranslation.languageCode ||
      !currentTranslation.value.title ||
      !currentTranslation.value.description
    ) {
      toast.error("Popunite sva obavezna polja");
      return;
    }

    // Check if translation for this language already exists
    const existingIndex = newsData.translations.findIndex(
      (t) => t.languageCode === currentTranslation.languageCode,
    );

    if (existingIndex !== -1) {
      // Update existing translation
      const updatedTranslations = [...newsData.translations];
      updatedTranslations[existingIndex] = { ...currentTranslation };

      setNewsData({
        ...newsData,
        translations: updatedTranslations,
      });
    } else {
      // Add new translation
      setNewsData({
        ...newsData,
        translations: [...newsData.translations, { ...currentTranslation }],
      });
    }

    // Reset form and switch to details tab
    setCurrentTranslation({
      languageCode: "",
      value: {
        title: "",
        description: "",
        markup: "",
      },
    });

    setActiveTab("details");
    toast.success("Prevod je uspešno dodat");
  };

  const handleCreateNews = async () => {
    if (newsData.translations.length === 0) {
      toast.error("Dodajte bar jedan prevod");
      return;
    }

    const promise = sendApiRequest("/news", {
      method: "post",
      payload: {
        date: newsData.date,
        previewImage: newsData.previewImage,
        translations: newsData.translations.map((t) => ({
          languageCode: t.languageCode,
          newsId: 0,
          title: t.value.title,
          description: t.value.description,
          markup: t.value.markup,
        })),
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno kreiranje vesti",
          );
      }),
      {
        loading: "Kreiranje vesti...",
        success: "Vest je uspešno kreirana",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;
    router.push("/vesti");
  };

  async function handleSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!newsData) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file, 0.2);
    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressed);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    setNewsData({
      ...newsData,
      previewImage: imageBase64,
    });
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/vesti")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kreiraj vest</h1>
          <p className="text-muted-foreground">Dodajte novu vest na sajt</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Detalji</TabsTrigger>
          <TabsTrigger value="translation">Dodaj prevod</TabsTrigger>
          {newsData.translations.map((translation) => (
            <TabsTrigger
              key={translation.languageCode}
              value={translation.languageCode}
            >
              {languages.find((l) => l.code === translation.languageCode)
                ?.fullName || translation.languageCode}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalji vesti</CardTitle>
              <CardDescription>Osnovne informacije o vesti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Datum objave</Label>
                <Input
                  id="date"
                  type="date"
                  value={newsData.date}
                  onChange={(e) =>
                    setNewsData({ ...newsData, date: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="preview-image">Naslovna slika</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border bg-muted">
                    {newsData.previewImage ? (
                      <Image
                        src={newsData.previewImage || "/placeholder.svg"}
                        alt="Naslovna slika"
                        className="h-full w-full object-cover"
                        fill
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="relative"
                    onClick={(e) =>
                      (e.target as HTMLButtonElement)
                        .querySelector("input")
                        ?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Dodaj sliku
                    <Input
                      type="file"
                      className="pointer-events-none absolute size-full opacity-0"
                      onChange={handleSelectImage}
                    />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  {newsData.translations.length === 0 && (
                    <p className="text-sm text-amber-500">
                      Dodajte bar jedan prevod
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleCreateNews}
                  disabled={newsData.translations.length === 0}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Kreiraj vest
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dodaj prevod</CardTitle>
              <CardDescription>Kreirajte prevod za ovu vest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Jezik</Label>
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
                    <option value="">Izaberite jezik</option>
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="title">Naslov</Label>
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
                />
              </div>
              <div>
                <Label htmlFor="description">Opis</Label>
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
                />
              </div>
              <div>
                <Label htmlFor="markup">Sadržaj</Label>
                <RichTextEditor
                  onChange={(x) =>
                    setCurrentTranslation({
                      ...currentTranslation,
                      value: {
                        ...currentTranslation.value,
                        markup: x,
                      },
                    })
                  }
                  value={currentTranslation.value.markup}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleAddTranslation}
                  disabled={
                    !currentTranslation.languageCode ||
                    !currentTranslation.value.title ||
                    !currentTranslation.value.description
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj prevod
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {newsData.translations.map((translation) => (
          <TabsContent
            key={translation.languageCode}
            value={translation.languageCode}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {languages.find((l) => l.code === translation.languageCode)
                    ?.fullName || translation.languageCode}{" "}
                  prevod
                </CardTitle>
                <CardDescription>
                  Pogledajte ili izmenite prevod
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`title-${translation.languageCode}`}>
                    Naslov
                  </Label>
                  <Input
                    id={`title-${translation.languageCode}`}
                    value={translation.value.title}
                    onChange={(e) => {
                      const updatedTranslations = newsData.translations.map(
                        (t) =>
                          t.languageCode === translation.languageCode
                            ? {
                                ...t,
                                value: { ...t.value, title: e.target.value },
                              }
                            : t,
                      );
                      setNewsData({
                        ...newsData,
                        translations: updatedTranslations,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${translation.languageCode}`}>
                    Opis
                  </Label>
                  <Textarea
                    id={`description-${translation.languageCode}`}
                    value={translation.value.description}
                    onChange={(e) => {
                      const updatedTranslations = newsData.translations.map(
                        (t) =>
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
                      setNewsData({
                        ...newsData,
                        translations: updatedTranslations,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`markup-${translation.languageCode}`}>
                    Sadržaj
                  </Label>
                  <RichTextEditor
                    value={translation.value.markup}
                    onChange={(e) => {
                      const updatedTranslations = newsData.translations.map(
                        (t) =>
                          t.languageCode === translation.languageCode
                            ? {
                                ...t,
                                value: { ...t.value, markup: e },
                              }
                            : t,
                      );
                      setNewsData({
                        ...newsData,
                        translations: updatedTranslations,
                      });
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
