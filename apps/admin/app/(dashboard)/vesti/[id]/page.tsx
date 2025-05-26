"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import ApprovalStatusBadge from "@/components/approval-status-badge";
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
          toast.error("News article not found");
          router.push("/vesti");
        }
      } catch {
        toast.error("Failed to load data");
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
            response.error?.message ?? "Failed to approve news article",
          );
      }),
      {
        loading: "Approving news article...",
        success: "News article approved successfully",
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
            response.error?.message ?? "Failed to unapprove news article",
          );
      }),
      {
        loading: "Unapproving news article...",
        success: "News article unapproved successfully",
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
            response.error?.message ?? "Failed to add translation",
          );
      }),
      {
        loading: "Adding translation...",
        success: "Translation added successfully",
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
          throw new Error(response.error?.message ?? "Failed to save news");
      }),
      {
        loading: "Saving news article...",
        success: "News article saved successfully",
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
          <h1 className="text-3xl font-bold tracking-tight">
            Edit News Article
          </h1>
          <p className="text-muted-foreground">
            Edit news article details and translations
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
          <TabsTrigger value="details">Details</TabsTrigger>
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
            Add Translation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>News Details</CardTitle>
              <CardDescription>
                Basic information about the news article
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="date">Publication Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={news.date}
                    onChange={(e) => setNews({ ...news, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Approval Status</Label>
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
                              Unapprove
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {news.isApproved ? "Unapprove" : "Approve"} News
                            Article
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription asChild>
                          {news.isApproved ? (
                            <p>
                              Are you sure you want to unapprove this news
                              article? This will remove it from the public
                              website.
                            </p>
                          ) : (
                            <p>
                              Are you sure you want to approve this news
                              article? This will make it visible on the public
                              website.
                            </p>
                          )}
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel asChild>
                            <Button variant="outline">Cancel</Button>
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
                            Confirm
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="preview-image">Preview Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                    <Image
                      src={news.previewImage || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
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
                  Translation
                </CardTitle>
                <CardDescription>Edit the translation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`title-${translation.languageCode}`}>
                    Title
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
                    Description
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
                    Content
                  </Label>
                  <Textarea
                    id={`markup-${translation.languageCode}`}
                    value={translation.value.markup}
                    rows={10}
                    onChange={(e) => {
                      const updatedTranslations = news.translations.map((t) =>
                        t.languageCode === translation.languageCode
                          ? {
                              ...t,
                              value: { ...t.value, markup: e.target.value },
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
                <Label htmlFor="new-title">Title</Label>
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
                <Label htmlFor="new-description">Description</Label>
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
                <Label htmlFor="new-markup">Content</Label>
                <Textarea
                  id="new-markup"
                  value={newTranslation.markup}
                  rows={10}
                  onChange={(e) =>
                    setNewTranslation({
                      ...newTranslation,
                      markup: e.target.value,
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
                  Add Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
