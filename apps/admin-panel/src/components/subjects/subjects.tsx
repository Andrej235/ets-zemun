import useLoader from "@/better-router/use-loader";
import { Button } from "@/components/ui/button";
import { TableFooter } from "@/components/ui/table";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  ShowerHead,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import subjectsLoader from "./subjects-loader";
import Async from "@/better-router/async";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import i18n from "@/i18n";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function Subjects() {
  const loaderData = useLoader<typeof subjectsLoader>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<Promise<
    Schema<"SimpleSubjectResponseDto">[]
  > | null>(null);
  const isLoadingData = useRef(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (isLoadingData.current) return;
    isLoadingData.current = true;

    setCurrentPage(
      loaderData.then((x) => {
        isLoadingData.current = false;
        return x.code === "OK" ? x.content.items : [];
      })
    );
  }, [loaderData]);

  function handlePrevClick() {
    if (isLoadingData.current) return;
    isLoadingData.current = true;

    const response = sendAPIRequest("/subject", {
      method: "get",
      parameters: {
        limit: 15,
        offset: 15 * (pageCount - 1),
      },
    }).then((x) => {
      isLoadingData.current = false;
      return x.code === "OK" ? x.content.items : [];
    });

    setCurrentPage(response);
    setPageCount(pageCount - 1);
  }

  function handleNextClick() {
    if (isLoadingData.current) return;
    isLoadingData.current = true;

    const response = sendAPIRequest("/subject", {
      method: "get",
      parameters: {
        limit: 15,
        offset: 15 * (pageCount + 1),
      },
    }).then((x) => {
      isLoadingData.current = false;
      return x.code === "OK" ? x.content.items : [];
    });

    setCurrentPage(response);
    setPageCount(pageCount + 1);
  }

  async function handleUpdate(
    subject: Schema<"SimpleSubjectResponseDto">,
    newName: string,
    newDesc: string
  ) {
    const response = await sendAPIRequest("/subject/translation", {
      method: "put",
      payload: {
        name: newName,
        description: newDesc,
        subjectId: subject.id,
        languageCode: i18n.language,
      },
    });

    if (response.code !== "No Content") alert(response);
  }

  async function handleDelete(subject: Schema<"SimpleSubjectResponseDto">) {
    const response = await sendAPIRequest("/subject/{id}", {
      method: "delete",
      parameters: {
        id: subject.id,
      },
    });

    if (response.code !== "No Content") alert(response);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="flex">
          <TableCell className="flex-1/5">Ime</TableCell>
          <TableCell className="flex-4/5">Opis</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentPage && (
          <Async await={currentPage}>
            {(page) =>
              page.map((subject) => (
                <TableRow key={subject.id} className="flex items-center">
                  <TableCell className="flex-1/5">
                    <Input defaultValue={subject.name} />
                  </TableCell>

                  <TableCell className="flex-4/5">
                    <Textarea defaultValue={subject.description} />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      className="group min-h-20 min-w-20 p-4"
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        const name = (
                          target.parentElement?.parentElement?.firstChild
                            ?.firstChild as HTMLInputElement
                        ).value;

                        const desc = (
                          target.parentElement?.previousSibling
                            ?.firstChild as HTMLInputElement
                        ).value;

                        handleUpdate(subject, name, desc);
                      }}
                    >
                      <Save className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                    </Button>
                  </TableCell>

                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground group min-h-20 min-w-20 p-4">
                        <Trash2 className="min-w-full min-h-full group-hover:animate-spin group-hover:text-red-600 transition-colors" />
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogTitle>
                          Da li ste sigurni da zelite da obrisete ovaj predmet?
                        </AlertDialogTitle>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Otkazi</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(subject)}
                          >
                            Obrisi
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      className="group min-h-20 min-w-20 p-4"
                      onClick={() => navigate(`/predmeti/${subject.id}`)}
                    >
                      <ShowerHead className="min-w-full min-h-full group-hover:animate-spin group-hover:text-green-600 transition-colors" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </Async>
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <div className="flex items-center gap-2">
              <Button onClick={handlePrevClick}>
                <ChevronLeft />
              </Button>

              <b>Page count: {pageCount}</b>

              <Button onClick={handleNextClick}>
                <ChevronRight />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

