"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import compressImage from "@/lib/compress-image";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/stores/language-store";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  ExternalLink,
  Globe,
  LucideCalendar,
  Save,
  Upload,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Award = Schema<"AdminFullAwardResponseDto">;
type AwardTranslation =
  Schema<"AdminAwardTranslationResponseDtoTranslationWrapper">;

export default function EditAwardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const languages = useLanguageStore((x) => x.languages);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [award, setAward] = useState<Award | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [currentTranslation, setCurrentTranslation] =
    useState<AwardTranslation>({
      languageCode: "",
      value: {
        student: "",
        competition: "",
        description: "",
        title: "",
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendApiRequest("/awards/admin/{id}", {
          method: "get",
          parameters: { id: +id },
        });
        if (response.isOk) {
          setAward(response.response!);
          setDate(
            response.response!.dayOfAward
              ? parseISO(response.response!.dayOfAward)
              : null,
          );
        } else {
          toast.error("Nagrada nije pronađena");
          router.push("/nagrade");
        }
      } catch {
        toast.error("Neuspešno učitavanje nagrade");
        router.push("/nagrade");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  useEffect(() => {
    setAward((x) =>
      !x || !date ? x : { ...x, dayOfAward: format(date, "yyyy-MM-dd") },
    );
  }, [date]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!award) return null;

  async function handleUpdateAward() {
    if (!award) return;

    if (!award.dayOfAward) {
      toast.error("Molimo izaberite datum");
      return;
    }
    if (!award.image) {
      toast.error("Molimo izaberite sliku");
      return;
    }
    if (award.translations.length === 0) {
      toast.error("Molimo dodajte bar jedan prevod");
      return;
    }

    const promise = sendApiRequest("/awards", {
      method: "put",
      payload: {
        id: award.id,
        dayOfAward: award.dayOfAward,
        image: award.image,
        translations: award.translations.map((x) => ({
          awardId: award.id,
          languageCode: x.languageCode,
          ...x.value,
        })),
        externalLink: award.externalLink,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno ažuriranje nagrade",
          );
      }),
      {
        loading: "Ažuriranje nagrade...",
        success: "Nagrada je uspešno ažurirana",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;
    router.push("/nagrade");
  }

  async function handleSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!award) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const compressed = await compressImage(file, 0.2);
    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressed);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    setAward({
      ...award,
      image: imageBase64,
    });
  }

  async function handleAddTranslation() {
    if (!award) return;

    if (
      !currentTranslation.languageCode ||
      !currentTranslation.value.competition ||
      !currentTranslation.value.title ||
      !currentTranslation.value.student
    ) {
      toast.error("Molimo popunite sva obavezna polja");
      return;
    }

    // Check if translation for this language already exists
    const existingIndex = award.translations.findIndex(
      (t) => t.languageCode === currentTranslation.languageCode,
    );

    if (existingIndex !== -1) {
      // Update existing translation
      const updatedTranslations = [...award.translations];
      updatedTranslations[existingIndex] = { ...currentTranslation };

      setAward({
        ...award,
        translations: updatedTranslations,
      });

      toast.success("Prevod je uspešno dodat");
    } else {
      const promise = sendApiRequest("/awards/translation", {
        method: "post",
        payload: {
          awardId: award.id,
          languageCode: currentTranslation.languageCode,
          ...currentTranslation.value,
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

      const response = await promise;
      if (!response.isOk) return;

      // Add new translation
      setAward({
        ...award,
        translations: [...award.translations, { ...currentTranslation }],
      });
    }

    setCurrentTranslation({
      languageCode: "",
      value: {
        competition: "",
        title: "",
        description: "",
        student: "",
      },
    });

    setActiveTab("details");
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/nagrade")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Izmena nagrade</h1>
          <p className="text-muted-foreground">
            {award.translations[0]?.value.title || "Nagrada bez naslova"}
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
            <TabsTrigger value="details">Detalji</TabsTrigger>
            <TabsTrigger value="translation">Dodaj prevod</TabsTrigger>
            {award.translations.map((translation) => (
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
                <CardTitle>Detalji nagrade</CardTitle>
                <CardDescription>Osnovne informacije o nagradi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-12 md:flex-row">
                  <div className="flex flex-col items-center md:w-1/3">
                    <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full bg-muted">
                      {award.image ? (
                        <Image
                          src={award.image || "/placeholder.svg"}
                          alt="nagrada"
                          className="h-full w-full object-cover"
                          fill
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Award className="h-16 w-16 text-muted-foreground" />
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
                      Dodaj fotografiju
                      <Input
                        type="file"
                        className="pointer-events-none absolute size-full opacity-0"
                        onChange={handleSelectImage}
                      />
                    </Button>
                  </div>

                  <div className="flex max-w-128 flex-1 flex-col gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="link" className="mb-2">
                          Eksterni link
                        </Label>
                        <div className="flex items-center">
                          <ExternalLink className="mr-2 size-6 text-muted-foreground" />
                          <Input
                            id="link"
                            value={award.externalLink ?? ""}
                            onChange={(e) =>
                              setAward({
                                ...award,
                                externalLink: e.target.value || null,
                              })
                            }
                            placeholder="takmicenje.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <div>
                        <Label htmlFor="date" className="mb-2">
                          Datum
                        </Label>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <LucideCalendar
                                className="mr-2 h-4 w-4"
                                id="date"
                              />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Izaberite datum</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date ?? undefined}
                              onSelect={(x) => setDate(x ?? null)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="mb-2 text-sm font-medium">Prevodi</h3>
                  <div className="flex flex-wrap gap-2">
                    {award.translations.length > 0 ? (
                      award.translations.map((translation) => (
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
                        Molimo dodajte bar jedan prevod
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <div>
                    {!award.dayOfAward && (
                      <p className="text-sm text-amber-500">
                        Molimo unesite datum
                      </p>
                    )}
                    {!award.image && (
                      <p className="text-sm text-amber-500">
                        Molimo dodajte sliku
                      </p>
                    )}
                    {award.translations.length === 0 && (
                      <p className="text-sm text-amber-500">
                        Molimo dodajte bar jedan prevod
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleUpdateAward}
                    disabled={
                      !award.dayOfAward ||
                      !award.image ||
                      award.translations.length === 0
                    }
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Sačuvaj izmene
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translation" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dodaj prevod</CardTitle>
                <CardDescription>
                  Kreirajte prevod informacija o nagradi
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
                      value={currentTranslation.languageCode}
                      onChange={(e) =>
                        setCurrentTranslation({
                          ...currentTranslation,
                          languageCode: e.target.value,
                        })
                      }
                    >
                      <option value="">Izaberite jezik</option>
                      {languages
                        .filter(
                          (lang) =>
                            !award.translations.some(
                              (t) => t.languageCode === lang.code,
                            ) || lang.code === currentTranslation.languageCode,
                        )
                        .map((lang) => (
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
                    placeholder="npr. Zlatna medalja iz matematike"
                  />
                </div>

                <div>
                  <Label htmlFor="studentName">Ime učenika</Label>
                  <Input
                    id="studentName"
                    value={currentTranslation.value.student}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        value: {
                          ...currentTranslation.value,
                          student: e.target.value,
                        },
                      })
                    }
                    placeholder="npr. Jovan Jovanović"
                  />
                </div>

                <div>
                  <Label htmlFor="competition">Takmičenje</Label>
                  <Input
                    id="competition"
                    value={currentTranslation.value.competition}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        value: {
                          ...currentTranslation.value,
                          competition: e.target.value,
                        },
                      })
                    }
                    placeholder="npr. Matematička olimpijada"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Opis</Label>
                  <Textarea
                    id="description"
                    value={currentTranslation.value.description ?? ""}
                    onChange={(e) =>
                      setCurrentTranslation({
                        ...currentTranslation,
                        value: {
                          ...currentTranslation.value,
                          description: e.target.value || null,
                        },
                      })
                    }
                    placeholder="Opis nagrade..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleAddTranslation}
                    disabled={
                      !currentTranslation.languageCode ||
                      !currentTranslation.value.competition ||
                      !currentTranslation.value.title ||
                      !currentTranslation.value.student
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj prevod
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {award.translations.map((translation) => (
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
                    prevod
                  </CardTitle>
                  <CardDescription>Pregled ili izmena prevoda</CardDescription>
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
                        const updatedTranslations = award.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: { ...t.value, title: e.target.value },
                                }
                              : t,
                        );
                        setAward({
                          ...award,
                          translations: updatedTranslations,
                        });
                      }}
                      placeholder="npr. Zlatna medalja iz matematike"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`studentName-${translation.languageCode}`}>
                      Ime učenika
                    </Label>
                    <Input
                      id={`studentName-${translation.languageCode}`}
                      value={translation.value.student}
                      onChange={(e) => {
                        const updatedTranslations = award.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: {
                                    ...t.value,
                                    student: e.target.value,
                                  },
                                }
                              : t,
                        );
                        setAward({
                          ...award,
                          translations: updatedTranslations,
                        });
                      }}
                      placeholder="npr. Jovan Jovanović"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`competition-${translation.languageCode}`}>
                      Takmičenje
                    </Label>
                    <Input
                      id={`competition-${translation.languageCode}`}
                      value={translation.value.competition}
                      onChange={(e) => {
                        const updatedTranslations = award.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: {
                                    ...t.value,
                                    competition: e.target.value,
                                  },
                                }
                              : t,
                        );
                        setAward({
                          ...award,
                          translations: updatedTranslations,
                        });
                      }}
                      placeholder="npr. Matematička olimpijada"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`description-${translation.languageCode}`}>
                      Opis
                    </Label>
                    <Textarea
                      id={`description-${translation.languageCode}`}
                      value={translation.value.description ?? ""}
                      onChange={(e) => {
                        const updatedTranslations = award.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: {
                                    ...t.value,
                                    description: e.target.value || null,
                                  },
                                }
                              : t,
                        );
                        setAward({
                          ...award,
                          translations: updatedTranslations,
                        });
                      }}
                      placeholder="Opis nagrade..."
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
