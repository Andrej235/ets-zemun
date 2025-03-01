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
import { useNavigate, useRevalidator } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Subjects() {
  const loaderData = useLoader<typeof subjectsLoader>();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

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
        return x.code === "200" ? x.content.items : [];
      })
    );
  }, [loaderData]);

  function handlePrevClick() {
    if (isLoadingData.current) return;
    isLoadingData.current = true;

    const response = sendAPIRequest("/subject", {
      method: "get",
      parameters: {
        limit: 10,
        offset: 10 * (pageCount - 1),
        languageCode: i18n.language,
      },
    }).then((x) => {
      isLoadingData.current = false;
      return x.code === "200" ? x.content.items : [];
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
        limit: 10,
        offset: 10 * (pageCount + 1),
        languageCode: i18n.language,
      },
    }).then((x) => {
      isLoadingData.current = false;
      return x.code === "200" ? x.content.items : [];
    });

    setCurrentPage(response);
    setPageCount(pageCount + 1);
  }

  async function handleUpdate(
    subject: Schema<"SimpleSubjectResponseDto">,
    newName: string,
    newDesc: string
  ) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/subject/translation", {
      method: "put",
      payload: {
        name: newName,
        description: newDesc,
        subjectId: subject.id,
        languageCode: i18n.language,
      },
    });

    isWaitingForResponse.current = false;
    if (response.code !== "204") alert(response);
    else alert("Uspesno izmenjen predmet");
  }

  async function handleDelete(subject: Schema<"SimpleSubjectResponseDto">) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/subject/{id}", {
      method: "delete",
      parameters: {
        id: subject.id,
      },
    });

    isWaitingForResponse.current = false;
    if (response.code !== "204") alert(response);
    else revalidate();
  }

  const [isCreationPopoverOpen, setIsCreationPopoverOpen] = useState(false);
  const isWaitingForResponse = useRef(false);
  async function handleCreate(name: string, desc: string) {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/subject", {
      method: "post",
      payload: {
        name: name,
        description: desc,
        languageCode: i18n.language,
      },
    });

    isWaitingForResponse.current = false;
    if (response.code === "201") {
      setIsCreationPopoverOpen(false);
      revalidate();
    } else alert(response);
  }

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow className="flex">
          <TableCell className="flex-1/5 text-3xl font-bold text-start mr-8">
            Ime
          </TableCell>
          <TableCell className="flex-4/5 text-3xl font-bold text-start">
            Opis
          </TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentPage && (
          <Async await={currentPage}>
            {(page) =>
              page.map((subject) => (
                <TableRow key={subject.id} className="flex items-center">
                  <TableCell className="flex-1/5 min-w-1/5 mr-8">
                    <Input
                      defaultValue={subject.name}
                      className="text-lg min-h-16"
                    />
                  </TableCell>

                  <TableCell className="flex-4/5 mr-8">
                    <Textarea
                      defaultValue={subject.description}
                      className="text-lg min-h-16"
                    />
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

                      <AlertDialogContent className="min-w-max gap-12">
                        <AlertDialogTitle className="text-2xl min-w-max">
                          Da li ste sigurni da zelite da obrisete ovaj predmet?
                        </AlertDialogTitle>

                        <AlertDialogFooter className="gap-4">
                          <AlertDialogCancel className="min-w-32 h-16 text-xl">
                            Otkazi
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="min-w-32 h-16 text-xl"
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
          <TableCell colSpan={3} className="w-full flex justify-center">
            <Popover
              open={isCreationPopoverOpen}
              onOpenChange={setIsCreationPopoverOpen}
            >
              <PopoverTrigger className="min-w-96 min-h-12 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                Dodaj predmet
              </PopoverTrigger>

              <PopoverContent className="flex flex-col gap-4 p-8 min-w-max">
                <h1>Dodaj predmet</h1>
                <Input
                  className="min-w-96 min-h-12 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                  placeholder="Ime predmeta"
                />
                <Textarea
                  className="min-w-96 min-h-12 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                  placeholder="Opis predmeta"
                />
                <Button
                  className="min-w-96 min-h-16 border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const name = (
                      target.previousSibling
                        ?.previousSibling as HTMLInputElement
                    )?.value?.trim();
                    const desc = (
                      target.previousSibling as HTMLInputElement
                    )?.value?.trim();

                    if (name && desc) handleCreate(name, desc);
                  }}
                >
                  Sacuvaj
                </Button>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={3} className="w-full flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePrevClick}
                disabled={pageCount === 0}
                className="min-w-12 min-h-12 p-2"
              >
                <ChevronLeft className="min-w-full min-h-full" />
              </Button>

              <p className="text-xl">Page count: {pageCount + 1}</p>
              {currentPage && (
                <Async await={currentPage}>
                  {(x) => (
                    <Button
                      onClick={handleNextClick}
                      disabled={(x?.length ?? 0) === 0}
                      className="min-w-12 min-h-12 p-2"
                    >
                      <ChevronRight className="min-w-full min-h-full" />
                    </Button>
                  )}
                </Async>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

