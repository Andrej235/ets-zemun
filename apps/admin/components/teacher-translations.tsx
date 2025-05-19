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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Teacher = Schema<"AdminFullTeacherResponseDto">;
type TeacherTranslation =
  Schema<"AdminFullTeacherTranslationResponseDtoTranslationWrapper">;
type Language = Schema<"LanguageResponseDto">;

type TeacherTranslationsProps = {
  teacher: Teacher;
  languages: Language[];
  onChangeTranslations: (newTranslations: TeacherTranslation[]) => void;
};

const translationSchema = z.object({
  languageCode: z.string().min(1, "Language is required"),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Biography is required"),
});

type TranslationFormValues = z.infer<typeof translationSchema>;

export function TeacherTranslations({
  teacher,
  languages,
  onChangeTranslations,
}: TeacherTranslationsProps) {
  const router = useRouter();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTranslation, setCurrentTranslation] =
    useState<TeacherTranslation | null>(null);

  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      languageCode: "",
      name: "",
      title: "",
      bio: "",
    },
  });

  const editForm = useForm<TranslationFormValues>({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      languageCode: "",
      name: "",
      title: "",
      bio: "",
    },
  });

  const handleAddTranslation = async (values: TranslationFormValues) => {
    setIsSubmitting(true);
    const promise = sendApiRequest("/teacher/translation", {
      method: "post",
      payload: {
        teacherId: teacher.id,
        languageCode: values.languageCode,
        name: values.name,
        title: values.title,
        bio: values.bio,
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
        error: "Failed to add translation",
      },
    );

    const response = await promise;
    setIsSubmitting(false);
    if (!response.isOk) return;

    onChangeTranslations([
      ...teacher.translations,
      {
        languageCode: values.languageCode,
        value: {
          name: values.name,
          title: values.title,
          bio: values.bio,
        },
      },
    ]);

    setIsAddDialogOpen(false);
    form.reset();
    router.refresh();
  };

  const handleEditTranslation = async (values: TranslationFormValues) => {
    if (!currentTranslation) return;

    setIsSubmitting(true);
    const promise = sendApiRequest("/teacher/translation", {
      method: "put",
      payload: {
        teacherId: teacher.id,
        languageCode: values.languageCode,
        name: values.name,
        title: values.title,
        bio: values.bio,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to edit translation",
          );
      }),
      {
        loading: "Editing translation...",
        success: "Translation edited successfully",
        error: "Failed to edit translation",
      },
    );

    const response = await promise;
    setIsSubmitting(false);
    if (!response.isOk) return;

    const newTranslations = [...teacher.translations];
    const idx = newTranslations.findIndex(
      (x) => x.languageCode === currentTranslation.languageCode,
    );
    newTranslations[idx] = {
      languageCode: values.languageCode,
      value: {
        name: values.name,
        title: values.title,
        bio: values.bio,
      },
    };
    onChangeTranslations(newTranslations);

    setIsEditDialogOpen(false);
    editForm.reset();
    router.refresh();
  };

  const handleDeleteTranslation = async () => {
    if (!currentTranslation) return;

    setIsSubmitting(true);
    const promise = sendApiRequest(
      "/teacher/{teacherId}/translation/{languageCode}",
      {
        method: "delete",
        parameters: {
          teacherId: teacher.id,
          languageCode: currentTranslation.languageCode,
        },
      },
    );

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to delete translation",
          );
      }),
      {
        loading: "Deleting translation...",
        success: "Translation deleted successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    setIsSubmitting(false);
    setCurrentTranslation(null);

    if (!response.isOk) throw new Error(response.error?.message);

    onChangeTranslations(
      teacher.translations.filter(
        (x) => x.languageCode !== currentTranslation.languageCode,
      ),
    );

    setIsDeleteDialogOpen(false);
    router.refresh();
  };

  const openEditDialog = (translation: TeacherTranslation) => {
    setCurrentTranslation(translation);
    editForm.reset({
      languageCode: translation.languageCode,
      name: translation.value.name,
      title: translation.value.title,
      bio: translation.value.bio,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (translation: TeacherTranslation) => {
    setCurrentTranslation(translation);
    setIsDeleteDialogOpen(true);
  };

  // Get available languages (those that don't have translations yet)
  const availableLanguages = languages.filter(
    (lang) => !teacher.translations.some((t) => t.languageCode === lang.code),
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Teacher Translations</CardTitle>
            <CardDescription>
              Manage translations for this teacher&apos;s information
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            disabled={availableLanguages.length === 0}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Translation
          </Button>
        </CardHeader>
        <CardContent>
          {teacher.translations && teacher.translations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Language</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.translations.map((translation) => {
                  const language = languages.find(
                    (l) => l.code === translation.languageCode,
                  );
                  return (
                    <TableRow key={translation.languageCode}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {language?.fullName || translation.languageCode}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{translation.value.name}</TableCell>
                      <TableCell>{translation.value.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(translation)}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(translation)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Globe className="h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">
                No translations available
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add translations to make this teacher&apos;s information
                available in different languages.
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-4"
                disabled={availableLanguages.length === 0}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Translation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Translation Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Translation</DialogTitle>
            <DialogDescription>
              Add a new translation for this teacher&apos;s information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddTranslation)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="languageCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableLanguages.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {language.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the language for this translation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teacher's name in selected language"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the teacher&apos;s name in the selected language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teacher's title in selected language"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the teacher&apos;s title in the selected language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Teacher's biography in selected language"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the teacher&apos;s biography in the selected
                      language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Translation
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Translation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Translation</DialogTitle>
            <DialogDescription>
              Edit the translation for{" "}
              {languages.find(
                (l) => l.code === currentTranslation?.languageCode,
              )?.fullName || currentTranslation?.languageCode}
              .
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditTranslation)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teacher's name in selected language"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the teacher&apos;s name in the selected language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teacher's title in selected language"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the teacher&apos;s title in the selected language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Teacher's biography in selected language"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the teacher&apos;s biography in the selected
                      language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Translation
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Translation Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the translation for{" "}
              {languages.find(
                (l) => l.code === currentTranslation?.languageCode,
              )?.fullName || currentTranslation?.languageCode}
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTranslation}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
