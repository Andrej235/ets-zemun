import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useRef, useState } from "react";
import { useRevalidator } from "react-router";
import Icon from "../icon/icon";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import languageLoader from "./language-loader";

export default function Languages() {
  const loaderData = useLoader<typeof languageLoader>();
  const waitingForRequest = useRef(false);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { revalidate } = useRevalidator();

  async function hangleCreate() {
    if (waitingForRequest.current) return;
    waitingForRequest.current = true;

    if (!codeInputRef.current || !nameInputRef.current) return;

    const response = await sendAPIRequest("/language", {
      method: "post",
      payload: {
        code: codeInputRef.current.value.trim(),
        fullName: nameInputRef.current.value.trim(),
      },
    });

    if (response.code !== "Created") return;

    codeInputRef.current.value = "";
    nameInputRef.current.value = "";
    setIsCreateOpen(false);
    revalidate();
    waitingForRequest.current = false;
  }

  async function handleUpdate(
    updatedLanguage: Schema<"UpdateLanguageRequestDto">
  ) {
    if (waitingForRequest.current) return;
    waitingForRequest.current = true;

    const response = await sendAPIRequest("/language", {
      method: "put",
      payload: updatedLanguage,
    });

    if (response.code !== "No Content") return;

    revalidate();
    waitingForRequest.current = false;
  }

  async function handleDelete(code: string) {
    if (waitingForRequest.current) return;
    waitingForRequest.current = true;

    const response = await sendAPIRequest("/language/{code}", {
      method: "delete",
      parameters: {
        code,
      },
    });

    if (response.code !== "No Content") return;
    revalidate();
    waitingForRequest.current = false;
  }

  return (
    <div className="p-10">
      <Async await={loaderData}>
        {(data) => {
          if (data.code !== "OK") return null;

          return (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.content.map((x) => (
                  <TableRow key={x.code}>
                    <TableCell>{x.code}</TableCell>
                    <TableCell>{x.fullName}</TableCell>

                    <TableCell className="max-w-max">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Icon name="pencil" />
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Promeni podatke o jeziku:
                            </AlertDialogTitle>

                            <AlertDialogDescription className="flex flex-col gap-2">
                              <Input placeholder="Code" defaultValue={x.code} />
                              <Input
                                placeholder="Name"
                                defaultValue={x.fullName}
                              />
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Zatvori</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => {
                                const inputs = (e.target as HTMLElement)
                                  .parentElement?.previousElementSibling
                                  ?.children[1].children;

                                const code = (
                                  inputs?.[0] as HTMLInputElement
                                ).value.trim();

                                const name = (
                                  inputs?.[1] as HTMLInputElement
                                ).value.trim();

                                if (!code || !name) return;
                                if (
                                  code === x.code &&
                                  name === x.fullName.trim()
                                )
                                  return;

                                handleUpdate({
                                  oldCode: x.code,
                                  newCode: code,
                                  fullName: name,
                                });
                              }}
                            >
                              Sacuvaj
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>

                    <TableCell className="max-w-max">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Icon name="trash" className="text-red-500! w-1" />
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Da li ste sigurni da zelite da obrisete ovaj
                              jezik?
                            </AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Zatvori</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(x.code)}
                            >
                              Obrisi
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Popover open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                      <PopoverTrigger>Napravi nov jezik</PopoverTrigger>

                      <PopoverContent>
                        <div className="flex flex-col gap-12">
                          <div className="flex gap-4">
                            <Input ref={codeInputRef} placeholder="Code" />
                            <Input ref={nameInputRef} placeholder="Name" />
                          </div>

                          <Button onClick={hangleCreate}>Napravi</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          );
        }}
      </Async>
    </div>
  );
}

