"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import ApprovalStatusBadge from "@/components/approval-status-badge";
import RichTextEditor from "@/components/rich-text-editor";
import { TranslationStatusBadge } from "@/components/translation-status-badge";
import {
  AlertDialog,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import compressImage from "@/lib/compress-image";
import getTranslationStatus from "@/lib/get-translation-status";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/stores/language-store";
import {
  ArrowLeft,
  CheckCircle,
  Globe,
  Plus,
  Save,
  Upload,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type News = Schema<"AdminNewsResponseDto">;
export default function NewsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: newsId } = use(params);
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const languages = useLanguageStore((x) => x.languages);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [newTranslation, setNewTranslation] = useState<{
    languageCode: string;
    title: string;
    description: string;
    markup: string;
  }>({
    languageCode: "",
    title: "",
    description: "",
    markup: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await sendApiRequest("/news/admin/{id}", {
          method: "get",
          parameters: {
            id: +newsId,
          },
        });

        if (newsData.isOk) {
          setNews(newsData.response!);
        } else {
          toast.error("Vest nije pronađena");
          router.push("/vesti");
        }
      } catch {
        toast.error("Neuspešno učitavanje podataka");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newsId, router]);

  const handleApprove = async (id: number) => {
    const promise = sendApiRequest("/news/approve/{id}", {
      method: "put",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno odobravanje vesti",
          );
      }),
      {
        loading: "Odobravanje vesti...",
        success: "Vest je uspešno odobrena",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;

    setNews((x) => x && { ...x, isApproved: true });
  };

  const handleUnapprove = async (id: number) => {
    const promise = sendApiRequest("/news/disapprove/{id}", {
      method: "put",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno povlačenje odobrenja vesti",
          );
      }),
      {
        loading: "Povlačenje odobrenja vesti...",
        success: "Vest je uspešno povučena",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;

    setNews((x) => x && { ...x, isApproved: false });
  };

  const handleAddTranslation = async () => {
    if (!news || !newTranslation.languageCode) return;

    const promise = sendApiRequest("/news/translation", {
      method: "post",
      payload: {
        newsId: news.id,
        ...newTranslation,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno dodavanje prevoda",
          );
      }),
      {
        loading: "Dodavanje prevoda...",
        success: "Prevod je uspešno dodat",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;
    setNews((prev) => ({
      ...prev!,
      translations: [
        ...prev!.translations,
        {
          languageCode: newTranslation.languageCode,
          value: newTranslation,
        },
      ],
    }));

    setNewTranslation({
      languageCode: "",
      title: "",
      description: "",
      markup: "",
    });
  };

  async function handleSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!news) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file, 0.2);
    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressed);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    setNews({
      ...news,
      previewImage: imageBase64,
    });
  }

  const handleSave = async () => {
    if (!news) return;

    const promise = sendApiRequest("/news", {
      method: "put",
      payload: {
        id: news.id,
        date: news.date,
        previewImage: news.previewImage,
        translations: news.translations.map((x) => ({
          title: x.value.title,
          description: x.value.description,
          markup: x.value.markup,
          languageCode: x.languageCode,
          id: news.id,
        })),
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(response.error?.message ?? "Neuspešno čuvanje vesti");
      }),
      {
        loading: "Čuvanje vesti...",
        success: "Vest je uspešno sačuvana",
        error: (x) => (x as Error).message,
      },
    );

    if (!(await promise).isOk) return;
    router.push("/vesti");
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  const translationStatus = getTranslationStatus(
    news.translations.map((t) => t.languageCode),
    languages.map((l) => l.code),
  );
  const availableLanguages = languages.filter(
    (lang) => !news.translations.some((t) => t.languageCode === lang.code),
  );

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
          <h1 className="text-3xl font-bold tracking-tight">Izmena vesti</h1>
          <p className="text-muted-foreground">
            Izmenite detalje vesti i prevode
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {Object.entries(translationStatus).map(([lang, status]) => (
            <TranslationStatusBadge
              key={lang}
              language={lang}
              status={status}
            />
          ))}
        </div>
        <ApprovalStatusBadge isApproved={news.isApproved} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Detalji</TabsTrigger>
          {news.translations.map((translation) => (
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
            Dodaj prevod
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalji vesti</CardTitle>
              <CardDescription>Osnovne informacije o vesti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="date">Datum objave</Label>
                  <Input
                    id="date"
                    type="date"
                    value={news.date}
                    onChange={(e) => setNews({ ...news, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status odobrenja</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <ApprovalStatusBadge isApproved={news.isApproved} />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "flex items-center gap-1",
                            news.isApproved
                              ? "text-destructive"
                              : "text-green-600",
                          )}
                        >
                          {news.isApproved ? (
                            <>
                              <XCircle className="h-4 w-4" />
                              Povuci odobrenje
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Odobri
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {news.isApproved ? "Povuci odobrenje" : "Odobri"}{" "}
                            vest
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription asChild>
                          {news.isApproved ? (
                            <p>
                              Da li ste sigurni da želite da povučete odobrenje
                              za ovu vest? Vest neće biti prikazana na sajtu.
                            </p>
                          ) : (
                            <p>
                              Da li ste sigurni da želite da odobrite ovu vest?
                              Vest će biti prikazana na sajtu.
                            </p>
                          )}
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel asChild>
                            <Button variant="outline">Otkaži</Button>
                          </AlertDialogCancel>
                          <AlertDialogCancel
                            onClick={() =>
                              news.isApproved
                                ? handleUnapprove(news.id)
                                : handleApprove(news.id)
                            }
                            className={
                              news.isApproved
                                ? "bg-destructive! text-white hover:bg-destructive/90"
                                : "bg-primary! text-white hover:bg-green-700"
                            }
                          >
                            Potvrdi
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="preview-image">Naslovna slika</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                    <Image
                      src={news.previewImage || "/placeholder.svg"}
                      alt="Naslovna slika"
                      fill
                      className="object-cover"
                    />
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
                    Promeni sliku
                    <Input
                      type="file"
                      className="pointer-events-none absolute size-full opacity-0"
                      onChange={handleSelectImage}
                    />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Sačuvaj izmene
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {news.translations.map((translation) => (
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
                <CardDescription>Izmenite detalje prevoda</CardDescription>
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
                      const updatedTranslations = news.translations.map((t) =>
                        t.languageCode === translation.languageCode
                          ? {
                              ...t,
                              value: { ...t.value, title: e.target.value },
                            }
                          : t,
                      );
                      setNews({ ...news, translations: updatedTranslations });
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
                      const updatedTranslations = news.translations.map((t) =>
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
                      setNews({ ...news, translations: updatedTranslations });
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
                      const updatedTranslations = news.translations.map((t) =>
                        t.languageCode === translation.languageCode
                          ? {
                              ...t,
                              value: { ...t.value, markup: e },
                            }
                          : t,
                      );
                      setNews({ ...news, translations: updatedTranslations });
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="add-translation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dodaj novi prevod</CardTitle>
              <CardDescription>
                Kreirajte prevod na drugom jeziku
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Jezik</Label>
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
                    <option value="">Izaberite jezik</option>
                    {availableLanguages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="new-title">Naslov</Label>
                <Input
                  id="new-title"
                  value={newTranslation.title}
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-description">Opis</Label>
                <Textarea
                  id="new-description"
                  value={newTranslation.description}
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-markup">Sadržaj</Label>
                <RichTextEditor
                  value={newTranslation.markup}
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      markup: e,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleAddTranslation}
                  disabled={
                    !newTranslation.languageCode ||
                    !newTranslation.title ||
                    !newTranslation.description
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj prevod
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
