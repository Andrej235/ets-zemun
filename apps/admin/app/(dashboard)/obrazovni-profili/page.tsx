"use client";

import sendApiRequest from "@/api-dsl/send-api-request";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { Button } from "@/components/ui/button";
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
  Eye,
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

  // Fetch curriculums on component mount
  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        setIsLoading(true);
        const data = await sendApiRequest("/profile", {
          method: "get",
        });
        setCurriculums(data.response!);
      } catch (error) {
        console.error("Failed to fetch curriculums:", error);
        toast.error("Failed to load curriculums");
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
    const promise = sendApiRequest(`/profile/{id}`, {
      method: "delete",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Failed to delete curriculum",
          );
      }),
      {
        loading: "Deleting curriculum...",
        success: "Curriculum deleted successfully",
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
            <h1 className="text-3xl font-bold">Education Profiles</h1>
            <p className="text-muted-foreground">
              Manage curriculum profiles and their subjects
            </p>
          </div>
          <Link href="/obrazovni-profili/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Curriculum
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search curriculums..."
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
                <TableHead>Name</TableHead>
                <TableHead>Years Covered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                              <span className="sr-only">Open menu</span>
                              {isDeleting === curriculum.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/obrazovni-profili/${curriculum.id}`,
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/obrazovni-profili/${curriculum.id}/edit`,
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(curriculum.id)}
                              disabled={isDeleting === curriculum.id}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
                          No results found for &quot;{searchQuery}&quot;
                        </p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear search
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          No curriculums found
                        </p>
                        <Link href="/obrazovni-profili/create">
                          <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Curriculum
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
    </div>
  );
}
