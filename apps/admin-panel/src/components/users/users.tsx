import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { APIResponse } from "@shared/api-dsl/types/endpoints/response-parser";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";
import userLoader from "./users-loader";

export default function Users() {
  const loaderData = useLoader<typeof userLoader>();
  const [currentPage, setCurrentPage] = useState<Promise<
    Schema<"FullUserResponseDto">[]
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

    const response = sendAPIRequest("/auth/user/all", {
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

    const response = sendAPIRequest("/auth/user/all", {
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

  const [roleChanges, setRoleChanges] = useState<
    {
      id: string;
      userName: string;
      oldRole: string;
      newRole: string;
      change: () => Promise<APIResponse<"/auth/change-role", "put">>;
    }[]
  >([]);

  function handleChangeRole(role: string, user: Schema<"FullUserResponseDto">) {
    const curr = roleChanges.find((x) => x.id === user.id);
    const newChange = () =>
      sendAPIRequest(`/auth/change-role`, {
        method: "put",
        payload: {
          userId: user.id,
          role,
        },
      });

    if (!curr)
      setRoleChanges((x) => {
        x.push({
          id: user.id,
          userName: user.username,
          oldRole: user.role[0],
          newRole: role,
          change: newChange,
        });
        return [...x];
      });
    else
      setRoleChanges((x) => {
        curr.change = newChange;
        return [...x];
      });
  }

  async function handleSaveClick() {
    const responses = await Promise.all(roleChanges.map((x) => x.change()));

    for (const response of responses) {
      if (response.code !== "No Content") {
        console.log(response);
        alert(response);
      }
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <b>Name</b>
          </TableCell>

          <TableCell>
            <b>Email</b>
          </TableCell>

          <TableCell>
            <b>Role</b>
          </TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentPage && (
          <Async await={currentPage}>
            {(page) =>
              page?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>

                  <TableCell
                    className={
                      user.emailConfirmed ? "text-green-600" : "text-red-600"
                    }
                  >
                    {user.email}
                  </TableCell>

                  <TableCell>
                    <Select
                      defaultValue={user.role[0]}
                      onValueChange={(e) => handleChangeRole(e, user)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Izaberite role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Mod">Mod</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            }
          </Async>
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger>Sacuvaj promene</AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Da li ste sigurni da zelite da sacuvate sve promene?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    {roleChanges.map((x) => (
                      <span
                        key={x.id}
                        className="text-xl flex w-max h-max items-center justify-center"
                      >
                        <span className="mr-2 pr-2 border-r-2 border-accent">
                          {x.userName}
                        </span>

                        <span className="text-xl flex h-max w-max items-center gap-2">
                          {x.oldRole || "none"} <MoveRight /> {x.newRole}
                        </span>
                      </span>
                    ))}
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Odustani</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSaveClick}>
                    Sacuvaj
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>

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

