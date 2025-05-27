"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import {
  AlertDialog,
  AlertDialogAction,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Globe, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Language = Schema<"LanguageResponseDto">;

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLanguage, setNewLanguage] = useState<Language>({
    code: "",
    fullName: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await sendApiRequest("/languages", {
          method: "get",
        });
        setLanguages(data.response!);
      } catch {
        toast.error("Neuspešno učitavanje jezika");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleCreateLanguage = async () => {
    if (!newLanguage.code || !newLanguage.fullName) {
      toast.error("Popunite sva polja");
      return;
    }

    const promise = sendApiRequest("/languages", {
      method: "post",
      payload: {
        code: newLanguage.code,
        fullName: newLanguage.fullName,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno dodavanje jezika",
          );
      }),
      {
        loading: "Dodavanje jezika...",
        success: "Jezik je uspešno dodat",
        error: (x) => (x as Error).message,
      },
    );

    const language = await promise;

    if (!language.isOk) return;

    setLanguages([...languages, language.response!]);
    setNewLanguage({ code: "", fullName: "" });
    setDialogOpen(false);
  };

  const handleDeleteLanguage = async (code: string) => {
    const promise = sendApiRequest("/languages/{code}", {
      method: "delete",
      parameters: {
        code,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno brisanje jezika",
          );
      }),
      {
        loading: "Brisanje jezika...",
        success: "Jezik je uspešno obrisan",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    setLanguages(languages.filter((lang) => lang.code !== code));
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jezici</h1>
          <p className="text-muted-foreground">
            Upravljajte jezicima za sajt škole
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Dodaj jezik
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj novi jezik</DialogTitle>
              <DialogDescription>
                Dodajte novi jezik za prevode na sajtu
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Kod jezika</Label>
                <Input
                  id="code"
                  placeholder="en"
                  value={newLanguage.code}
                  onChange={(e) =>
                    setNewLanguage({ ...newLanguage, code: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Koristite standardne kodove jezika (npr. en, fr, de)
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Naziv jezika</Label>
                <Input
                  id="name"
                  placeholder="Engleski"
                  value={newLanguage.fullName}
                  onChange={(e) =>
                    setNewLanguage({ ...newLanguage, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Otkaži
              </Button>
              <Button onClick={handleCreateLanguage}>Dodaj jezik</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      ) : languages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Globe className="mb-4 h-10 w-10 text-muted-foreground" />
            <CardTitle className="mb-2">Nema pronađenih jezika</CardTitle>
            <CardDescription>
              Dodajte prvi jezik da biste započeli sa prevodima
            </CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Dodaj jezik
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dodaj novi jezik</DialogTitle>
                  <DialogDescription>
                    Dodajte novi jezik za prevode na sajtu
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Kod jezika</Label>
                    <Input
                      id="code"
                      placeholder="en"
                      value={newLanguage.code}
                      onChange={(e) =>
                        setNewLanguage({ ...newLanguage, code: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Koristite standardne kodove jezika (npr. en, fr, de)
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Naziv jezika</Label>
                    <Input
                      id="name"
                      placeholder="Engleski"
                      value={newLanguage.fullName}
                      onChange={(e) =>
                        setNewLanguage({
                          ...newLanguage,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Otkaži
                  </Button>
                  <Button onClick={handleCreateLanguage}>Dodaj jezik</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Dostupni jezici</CardTitle>
              <CardDescription>
                Jezici dostupni za prevod sadržaja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kod jezika</TableHead>
                    <TableHead>Naziv jezika</TableHead>
                    <TableHead className="text-right">Akcije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((language) => (
                    <TableRow key={language.code}>
                      <TableCell className="font-medium">
                        {language.code}
                      </TableCell>
                      <TableCell>{language.fullName}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Obriši jezik</AlertDialogTitle>
                              <AlertDialogDescription>
                                Da li ste sigurni da želite da obrišete jezik
                                &quot;{language.fullName}&quot; ({language.code}
                                ) i sve njegove prevode? Ova akcija je
                                nepovratna.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Otkaži</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteLanguage(language.code)
                                }
                                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                              >
                                Obriši
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
