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
        const data = await sendApiRequest("/language", {
          method: "get",
        });
        setLanguages(data.response!);
      } catch {
        toast.error("Failed to load languages");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleCreateLanguage = async () => {
    if (!newLanguage.code || !newLanguage.fullName) {
      toast.error("Please fill in all fields");
      return;
    }

    const promise = sendApiRequest("/language", {
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
            response.error?.message ?? "Failed to create language",
          );
      }),
      {
        loading: "Creating language...",
        success: "Language created successfully",
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
    const promise = sendApiRequest("/language/{code}", {
      method: "delete",
      parameters: {
        code,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to delete language",
          );
      }),
      {
        loading: "Deleting language...",
        success: "Language deleted successfully",
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
          <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
          <p className="text-muted-foreground">
            Manage languages for the school website
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
              <DialogDescription>
                Add a new language for translations on the website
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Language Code</Label>
                <Input
                  id="code"
                  placeholder="en"
                  value={newLanguage.code}
                  onChange={(e) =>
                    setNewLanguage({ ...newLanguage, code: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Use standard language codes (e.g., en, fr, de)
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Language Name</Label>
                <Input
                  id="name"
                  placeholder="English"
                  value={newLanguage.fullName}
                  onChange={(e) =>
                    setNewLanguage({ ...newLanguage, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateLanguage}>Add Language</Button>
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
            <CardTitle className="mb-2">No languages found</CardTitle>
            <CardDescription>
              Add your first language to get started with translations
            </CardDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Language
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Language</DialogTitle>
                  <DialogDescription>
                    Add a new language for translations on the website
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Language Code</Label>
                    <Input
                      id="code"
                      placeholder="en"
                      value={newLanguage.code}
                      onChange={(e) =>
                        setNewLanguage({ ...newLanguage, code: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Use standard language codes (e.g., en, fr, de)
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Language Name</Label>
                    <Input
                      id="name"
                      placeholder="English"
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
                    Cancel
                  </Button>
                  <Button onClick={handleCreateLanguage}>Add Language</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Available Languages</CardTitle>
              <CardDescription>
                Languages available for content translation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language Code</TableHead>
                    <TableHead>Language Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                              <AlertDialogTitle>
                                Delete Language
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the language
                                &quot;{language.fullName}&quot; ({language.code}
                                ) and all of it&apos;s translations? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteLanguage(language.code)
                                }
                                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                              >
                                Delete
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
