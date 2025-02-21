import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import useLazyLoad from "@/hooks/use-lazy-load";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import fullNewsArticleLoader from "./full-news-article-loader";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { useNavigate } from "react-router";

export default function FullNewsArticle() {
  const loaderData = useLoader<typeof fullNewsArticleLoader>();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  async function handleDelete(id: number) {
    const response = await sendAPIRequest("/news/{id}", {
      method: "delete",
      parameters: {
        id,
      },
    });

    if (response.code !== "No Content") return;

    navigate("/vesti");
  }

  useLazyLoad(
    loaderData.then((x) => (x.code === "OK" ? x.content.images : null)),
    (x) => {
      if (!containerRef.current) return;

      x.forEach((image) => {
        const imageRef = containerRef.current!.querySelector(
          `img#image-${image.id}`
        );

        imageRef?.setAttribute("src", image.image);
      });
    }
  );

  return (
    <Async await={loaderData}>
      {(news) => {
        if (news.code !== "OK") return null;

        return (
          <div className="max-w-full h-max flex flex-col gap-8 justify-center items-center">
            <div className="flex gap-4">
              <Button
                variant={"secondary"}
                className="w-48 h-12 rounded-md cursor-pointer"
                onClick={() => navigate("promeni")}
              >
                Promeni
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-32 h-12 rounded-md cursor-pointer"
                  >
                    Obriši
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                      Da li ste sigurni da zelite da obrisete ovu vest{" "}
                      <strong>zauvek</strong>?
                    </AlertDialogTitle>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="gap-4">
                    <AlertDialogCancel className="text-white text-xl font-bold p-6">
                      Ne
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 text-white text-xl font-bold p-6"
                      onClick={() => handleDelete(news.content.id)}
                    >
                      Da
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div
              className="border-2 rounded-4xl p-8"
              ref={containerRef}
              dangerouslySetInnerHTML={{
                __html: news.content.markup,
              }}
            />
          </div>
        );
      }}
    </Async>
  );
}

