"use client";
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
import { format } from "date-fns";
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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import sendApiRequest from "@/api-dsl/send-api-request";

type Award = Schema<"AdminFullAwardResponseDto">;
type AwardTranslation =
  Schema<"AdminAwardTranslationResponseDtoTranslationWrapper">;

export default function NewAwardPage() {
  const router = useRouter();
  const languages = useLanguageStore((x) => x.languages);
  const [activeTab, setActiveTab] = useState("details");

  const [awardData, setAwardData] = useState<Omit<Award, "id">>({
    image: "",
    translations: [],
    dayOfAward: "",
    externalLink: "",
  });

  const [currentTranslation, setCurrentTranslation] =
    useState<AwardTranslation>({
      languageCode: "sr_lt",
      value: {
        student: "",
        competition: "",
        description: "",
        title: "",
      },
    });

  async function handleCreateAward() {
    if (!awardData.dayOfAward) {
      toast.error("Molimo izaberite datum");
      return;
    }

    if (!awardData.image) {
      toast.error("Molimo izaberite sliku");
      return;
    }

    if (awardData.translations.length === 0) {
      toast.error("Molimo dodajte bar jedan prevod");
      return;
    }

    const promise = sendApiRequest("/awards", {
      method: "post",
      payload: {
        dayOfAward: awardData.dayOfAward,
        image: awardData.image,
        translations: awardData.translations.map((x) => ({
          awardId: 0,
          languageCode: x.languageCode,
          ...x.value,
        })),
        externalLink: awardData.externalLink,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno kreiranje nagrade",
          );
      }),
      {
        loading: "Kreiranje nagrade...",
        success: "Nagrada je uspešno kreirana",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    router.push("/nagrade");
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

    setAwardData({
      ...awardData,
      image: imageBase64,
    });
  }

  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    setAwardData((x) => ({
      ...x,
      dayOfAward: date ? format(date, "yyyy-MM-dd") : "",
    }));
  }, [date]);

  async function handleAddTranslation() {
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
    const existingIndex = awardData.translations.findIndex(
      (t) => t.languageCode === currentTranslation.languageCode,
    );

    if (existingIndex !== -1) {
      // Update existing translation
      const updatedTranslations = [...awardData.translations];
      updatedTranslations[existingIndex] = { ...currentTranslation };

      setAwardData({
        ...awardData,
        translations: updatedTranslations,
      });
    } else {
      // Add new translation
      setAwardData({
        ...awardData,
        translations: [...awardData.translations, { ...currentTranslation }],
      });
    }

    // Reset form and switch to details tab
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
    toast.success("Prevod je uspešno dodat");
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
          <h1 className="text-3xl font-bold tracking-tight">Kreiraj nagradu</h1>
          <p className="text-muted-foreground">Dodaj novu nagradu u sistem</p>
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
            {awardData.translations.map((translation) => (
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
                      {awardData.image ? (
                        <Image
                          src={awardData.image || "/placeholder.svg"}
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
                            value={awardData.externalLink ?? ""}
                            onChange={(e) =>
                              setAwardData({
                                ...awardData,
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
                    {awardData.translations.length > 0 ? (
                      awardData.translations.map((translation) => (
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
                    {!awardData.dayOfAward && (
                      <p className="text-sm text-amber-500">
                        Molimo unesite datum
                      </p>
                    )}
                    {!awardData.image && (
                      <p className="text-sm text-amber-500">
                        Molimo dodajte sliku
                      </p>
                    )}
                    {awardData.translations.length === 0 && (
                      <p className="text-sm text-amber-500">
                        Molimo dodajte bar jedan prevod
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleCreateAward}
                    disabled={
                      !awardData.dayOfAward ||
                      !awardData.image ||
                      awardData.translations.length === 0
                    }
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Kreiraj nagradu
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
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Naziv</Label>
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

          {awardData.translations.map((translation) => (
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
                      Naziv
                    </Label>
                    <Input
                      id={`title-${translation.languageCode}`}
                      value={translation.value.title}
                      onChange={(e) => {
                        const updatedTranslations = awardData.translations.map(
                          (t) =>
                            t.languageCode === translation.languageCode
                              ? {
                                  ...t,
                                  value: { ...t.value, title: e.target.value },
                                }
                              : t,
                        );
                        setAwardData({
                          ...awardData,
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
                        const updatedTranslations = awardData.translations.map(
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
                        setAwardData({
                          ...awardData,
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
                        const updatedTranslations = awardData.translations.map(
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
                        setAwardData({
                          ...awardData,
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
                        const updatedTranslations = awardData.translations.map(
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
                        setAwardData({
                          ...awardData,
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
