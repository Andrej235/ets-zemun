"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { SubjectsList } from "@/components/subjects-list";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Loader2,
  Pencil,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Subject = Schema<"AdminSubjectResponseDto">;
type CurriculumSubject = Schema<"ProfileSubjectResponseDto"> & {
  type: "general" | "vocational";
};

export default function CurriculumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: profileId } = use(params);

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedyear, setSelectedyear] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [curriculum, setCurriculum] =
    useState<Schema<"EducationalProfileResponseDto"> | null>(null);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const formSchema = z.object({
    subjectId: z.string().min(1, "Subject is required"),
    year: z.coerce.number().int().min(1, "Year level is required"),
    perWeek: z.coerce
      .number()
      .int()
      .min(1, "Hours per week is required")
      .max(20, "Cannot exceed 20 hours per week"),
    type: z.enum(["general", "vocational"] as const),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectId: "",
      year: 1,
      perWeek: 3,
      type: "general",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curriculumData = await sendApiRequest("/profile/{id}", {
          method: "get",
          parameters: {
            id: +profileId,
            languageCode: "sr_lt",
          },
        });
        const subjectsData = await sendApiRequest("/subject/admin", {
          method: "get",
          parameters: {
            limit: -1,
          },
        });

        if (!curriculumData.isOk) notFound();

        setCurriculum(curriculumData.response!);
        setAllSubjects(subjectsData.response!);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load curriculum data");
      }
    };

    fetchData();
  }, [profileId]);

  const handleOpenDialog = (year: number) => {
    setSelectedyear(year);
    form.setValue("year", year);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  async function refreshData() {
    const updatedCurriculum = await sendApiRequest("/profile/{id}", {
      method: "get",
      parameters: {
        id: +profileId,
        languageCode: "sr_lt",
      },
    });
    setCurriculum(updatedCurriculum.response!);
  }

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const promise = sendApiRequest("/profile/add-subject", {
      method: "patch",
      payload: {
        perWeek: values.perWeek,
        subjectId: +values.subjectId,
        profileId: +profileId,
        year: values.year,
        type: values.type === "general" ? "General" : "Vocational",
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to add subject to curriculum",
          );
      }),
      {
        loading: "Adding subject to curriculum...",
        success: "Subject added to curriculum successfully",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    setIsSubmitting(false);
    if (!response.isOk) return;

    handleCloseDialog();
    router.refresh();
    refreshData();
  }

  if (loading || !curriculum) {
    return (
      <div className="container mx-auto py-10">Loading curriculum data...</div>
    );
  }

  const subjectMap = new Map<number, Subject>();
  allSubjects.forEach((subject) => {
    subjectMap.set(subject.id, subject);
  });

  const curriculumSubjects: CurriculumSubject[] = [
    ...(curriculum?.generalSubjects?.map((x) => ({
      ...x,
      type: "general" as const,
    })) ?? []),
    ...(curriculum?.vocationalSubjects?.map((x) => ({
      ...x,
      type: "vocational" as const,
    })) ?? []),
  ];

  const subjectsByYear = new Map<number, CurriculumSubject[]>();
  curriculumSubjects.forEach((subject) => {
    if (!subjectsByYear.has(subject.year)) {
      subjectsByYear.set(subject.year, []);
    }
    subjectsByYear.get(subject.year)!.push(subject);
  });

  const years = Array.from(subjectsByYear.keys()).sort((a, b) => a - b);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/obrazovni-profili">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Curriculums
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{curriculum.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/obrazovni-profili/${curriculum.id}/edit`}>
            <Button size="sm" variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Curriculum
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Years Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-3xl font-bold">{subjectsByYear.size}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-3xl font-bold">
                {curriculumSubjects.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={years.length > 0 ? years[0].toString() : "overview"}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {years.map((year) => (
            <TabsTrigger key={year} value={year.toString()}>
              Year {year}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Overview</CardTitle>
              <CardDescription>
                Summary of subjects across all years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {years.length > 0 ? (
                  years.map((year) => (
                    <div key={year} className="border-b pb-4 last:border-0">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-medium">Year {year}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-blue-200 bg-blue-50 text-blue-700"
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {subjectsByYear
                              .get(year)
                              ?.reduce((a, b) => a + b.perWeek, 0)}{" "}
                            classes/week
                          </Badge>
                          <Badge variant="outline">
                            {subjectsByYear.get(year)!.length} subjects
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {subjectsByYear.get(year)!.map((subject) => {
                          const subjectDetails = subjectMap.get(
                            subject.subjectId,
                          );
                          return (
                            <div
                              key={`${subject.subjectId}-${subject.year}`}
                              className="flex items-center justify-between rounded-md bg-muted/50 p-2"
                            >
                              <div className="truncate">
                                <span className="font-medium">
                                  {subjectDetails?.name || "Unknown Subject"}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-2 whitespace-nowrap"
                              >
                                {subject.perWeek} classes
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No Subjects Added
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Start adding subjects to this curriculum
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => handleOpenDialog(1)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Subject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {years.map((year) => (
          <TabsContent key={year} value={year.toString()}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Year {year} Subjects</CardTitle>
                  <CardDescription>
                    {subjectsByYear.get(year)!.length} subjects,{" "}
                    {subjectsByYear
                      .get(year)
                      ?.reduce((a, b) => a + b.perWeek, 0)}{" "}
                    total hours per week
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  className="gap-1"
                  onClick={() => handleOpenDialog(year)}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Subject
                </Button>
              </CardHeader>
              <CardContent>
                <SubjectsList
                  profileId={curriculum.id}
                  curriculumSubjects={subjectsByYear.get(year)!}
                  subjectMap={subjectMap}
                  year={year}
                  refresh={refreshData}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Add Subject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Subject to Year {selectedyear}</DialogTitle>
            <DialogDescription>
              Add a new subject to this curriculum. Fill in all the required
              information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allSubjects.length > 0 ? (
                          allSubjects.map((subject) => (
                            <SelectItem
                              key={subject.id}
                              value={subject.id.toString()}
                            >
                              {subject.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            No available subjects
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a subject to add to this curriculum
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Level</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      The year level this subject belongs to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="perWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Per Week</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of hours per week allocated to this subject
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="vocational">Vocational</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Categorize this subject as general or vocational
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || allSubjects.length === 0}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Subject
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
