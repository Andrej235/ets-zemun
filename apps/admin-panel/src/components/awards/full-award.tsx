import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import compressImage from "@/lib/compress-image";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import fullAwardLoader from "./full-award-loader";
import { Textarea } from "../ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function FullAward() {
  const loaderData = useLoader<typeof fullAwardLoader>();

  const [image, setImage] = useState<string>("");
  const changedImage = useRef(false);
  useEffect(() => {
    loaderData.then((x) => x.code === "OK" && setImage(x.content.image));
  }, [loaderData]);

  async function handleImageChange(file: File | null) {
    if (!file) return;

    const compressed = compressImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(await compressed);
    reader.onload = () => {
      setImage(reader.result as string);
      changedImage.current = true;
    };
  }

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.code !== "OK") return null;
        const award = data.content;

        return (
          <div className="flex p-8">
            <div className="flex flex-col gap-4 w-3/5 h-max">
              <div className="flex gap-4">
                <Input
                  className="text-2xl min-h-max h-16 px-4"
                  defaultValue={award.title}
                  placeholder="Naslov*"
                />

                <Input
                  className="text-2xl min-h-max h-16 px-4"
                  defaultValue={award.competition}
                  placeholder="Takmicenje*"
                />
              </div>

              <div className="flex gap-4">
                <Input
                  className="text-2xl min-h-max h-16 px-4"
                  defaultValue={award.dayOfAward}
                  placeholder="Datum osvojavanja*"
                />

                <Input
                  className="text-2xl min-h-max h-16 px-4"
                  defaultValue={award.externalLink ?? ""}
                  placeholder="Link takmicenja"
                />
              </div>

              <div className="flex gap-4">
                <Input
                  className="text-2xl min-h-max h-16 px-4"
                  defaultValue={award.student}
                  placeholder="Ime studenta*"
                />

                <AlertDialog>
                  <AlertDialogTrigger className="min-w-max">
                    {award.teacher ? award.teacher.name : "Izaberi nastavnika"}
                  </AlertDialogTrigger>

                  <AlertDialogContent className="min-w-3/4 min-h-3/4 grid-rows-[max-content_1fr] gap-16 p-12">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-5xl text-center">Dodaj nastavnika</AlertDialogTitle>
                      <AlertDialogDescription className="text-3xl text-center">
                        Izaberi nastavnika koji je delom zasluzan za ovu nagradu
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <Textarea
                className="text-2xl min-h-max h-64 px-4"
                defaultValue={award.description ?? ""}
                placeholder="Opis*"
              />
            </div>

            <div className="relative w-2/5 flex justify-center">
              <img
                src={image}
                alt={award.title}
                className="absolute max-w-full max-h-full"
              />
              <Input
                type="file"
                className="absolute w-full h-full opacity-0"
                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
        );
      }}
    </Async>
  );
}

