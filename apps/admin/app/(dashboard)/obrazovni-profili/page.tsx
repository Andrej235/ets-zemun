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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Loader2,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Curriculum = Schema<"SimpleEducationalProfileResponseDto">;

export default function CurriculumPage() {
  const router = useRouter();
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch curriculums on component mount
  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        setIsLoading(true);
        const data = await sendApiRequest("/profiles", {
          method: "get",
        });
        setCurriculums(data.response!);
      } catch (error) {
        console.error("Failed to fetch curriculums:", error);
        toast.error("Neuspešno učitavanje obrazovnih profila");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurriculums();
  }, []);

  // Filter curriculums based on search query
  const filteredCurriculums = curriculums.filter((curriculum) =>
    curriculum.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    const promise = sendApiRequest(`/profiles/{id}`, {
      method: "delete",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno brisanje profila",
          );
      }),
      {
        loading: "Brisanje profila...",
        success: "Profil je uspešno obrisan",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) return;

    setCurriculums(curriculums.filter((curriculum) => curriculum.id !== id));
    setIsDeleting(null);
  };

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Obrazovni profili</h1>
            <p className="text-muted-foreground">
              Upravljajte obrazovnim profilima i njihovim predmetima
            </p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Dodaj novi profil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj novi obrazovni profil</DialogTitle>
                <DialogDescription>
                  Unesite naziv novog obrazovnog profila.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const name = formData.get("name") as string;
                  if (!name.trim()) {
                    toast.error("Naziv profila je obavezan");
                    return;
                  }
                  const promise = sendApiRequest("/profiles", {
                    method: "post",
                    payload: {
                      name,
                      generalSubjects: [],
                      vocationalSubjects: [],
                    },
                  });
                  toast.promise(
                    promise.then((response) => {
                      if (!response.isOk)
                        throw new Error(
                          response.error?.message ??
                            "Neuspešno kreiranje profila",
                        );
                    }),
                    {
                      loading: "Kreiranje profila...",
                      success: "Profil je uspešno kreiran",
                      error: (x) => (x as Error).message,
                    },
                  );
                  const response = await promise;
                  if (!response.isOk) return;

                  setCurriculums((prev) => [...prev, response.response!]);
                  form.reset();
                  setIsCreating(false);
                }}
              >
                <Input
                  name="name"
                  placeholder="Naziv profila"
                  autoFocus
                  required
                />
                <div className="mt-4 flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Otkaži
                    </Button>
                  </DialogClose>
                  <Button type="submit">Dodaj</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 flex items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pretraži profile..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">ID</TableHead>
                <TableHead>Naziv</TableHead>
                <TableHead>Broj godina</TableHead>
                <TableHead className="text-right">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell>
                      <Skeleton className="h-5 w-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredCurriculums.length > 0 ? (
                <AnimatePresence>
                  {filteredCurriculums.map((curriculum) => (
                    <motion.tr
                      key={curriculum.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-b"
                    >
                      <TableCell className="font-medium">
                        {curriculum.id}
                      </TableCell>
                      <TableCell>{curriculum.name}</TableCell>
                      <TableCell>{curriculum.yearsCount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Otvori meni</span>
                              {isDeleting === curriculum.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcije</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/obrazovni-profili/${curriculum.id}`,
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Izmeni
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              disabled={isDeleting === curriculum.id}
                              onClick={() => setIsDeleting(curriculum.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Obriši
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    {searchQuery ? (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          Nema rezultata za &quot;{searchQuery}&quot;
                        </p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setSearchQuery("")}
                        >
                          Očisti pretragu
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          Nema obrazovnih profila
                        </p>
                        <Link href="/obrazovni-profili/create">
                          <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Dodaj profil
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {isDeleting && (
        <AlertDialog
          open={!!isDeleting}
          onOpenChange={() => setIsDeleting(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Da li ste sigurni da želite da obrišete ovaj profil?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Ova akcija je nepovratna. Profil i svi povezani podaci će biti
                trajno obrisani.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Otkaži</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDelete(isDeleting)}
              >
                Obriši
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
