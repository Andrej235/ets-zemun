import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
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
                  <TableCell>{user.role}</TableCell>
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

