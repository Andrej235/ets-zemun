import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import i18n from "@/i18n";
import compressImage from "@/lib/compress-image";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
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
import { Textarea } from "../ui/textarea";
import fullAwardLoader from "./full-award-loader";

export default function FullAward() {
  const loaderData = useLoader<typeof fullAwardLoader>();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const [image, setImage] = useState<string>("");
  const changedImage = useRef(false);
  const isWaitingForResponse = useRef(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const competitionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const studentRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loaderData.then((x) => x.code === "200" && setImage(x.content.image));
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

  async function handleSave() {
    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const loadedAward = await loaderData;
    if (loadedAward.code !== "200") return;

    const title =
      (titleRef.current?.value?.trim() ?? "") || loadedAward.content.title;
    const competition =
      (competitionRef.current?.value?.trim() ?? "") ||
      loadedAward.content.competition;
    const date =
      (dateRef.current?.value?.trim() ?? "") || loadedAward.content.dayOfAward;
    const link =
      (linkRef.current?.value?.trim() ?? "") ||
      loadedAward.content.externalLink;
    const student =
      (studentRef.current?.value?.trim() ?? "") || loadedAward.content.student;
    const description =
      (descriptionRef.current?.value?.trim() ?? "") ||
      loadedAward.content.description;

    if (
      link !== loadedAward.content.externalLink ||
      date !== loadedAward.content.dayOfAward ||
      changedImage.current
    ) {
      const response = await sendAPIRequest("/award", {
        method: "put",
        payload: {
          id: loadedAward.content.id,
          dayOfAward: date,
          externalLink: link,
          image,
          teacherId: null,
        },
      });

      if (response.code !== "204") alert(response);
    }

    if (
      title !== loadedAward.content.title ||
      competition !== loadedAward.content.competition ||
      student !== loadedAward.content.student ||
      description !== loadedAward.content.description
    ) {
      const createTranslation =
        loadedAward.content.title.length < 1 &&
        loadedAward.content.competition.length < 1 &&
        loadedAward.content.student.length < 1 &&
        (!loadedAward.content.description ||
          loadedAward.content.description.length < 1);
      const response = await sendAPIRequest("/award/translation", {
        method: createTranslation ? "post" : "put",
        payload: {
          awardId: loadedAward.content.id,
          languageCode: i18n.language,
          title,
          competition,
          student,
          description,
        },
      });

      if (response.code !== "201" && response.code !== "204") alert(response);

      if (createTranslation) revalidate();
    }

    isWaitingForResponse.current = false;
  }

  async function handleDelete(award: Schema<"AwardResponseDto">) {
    const response = await sendAPIRequest("/award/{id}", {
      method: "delete",
      parameters: {
        id: award.id,
      },
    });

    if (response.code !== "204") alert(response);
    navigate("/nagrade");
  }

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.code !== "200") return null;
        const award = data.content;

        return (
          <div className="flex flex-col">
            <div className="flex p-8">
              <div className="flex flex-col gap-4 w-3/5 h-max">
                <div className="flex gap-4">
                  <Input
                    ref={titleRef}
                    className="text-2xl min-h-max h-16 px-4"
                    defaultValue={award.title}
                    placeholder="Naslov*"
                  />

                  <Input
                    ref={competitionRef}
                    className="text-2xl min-h-max h-16 px-4"
                    defaultValue={award.competition}
                    placeholder="Takmicenje*"
                  />
                </div>

                <div className="flex gap-4">
                  <Input
                    ref={dateRef}
                    className="text-2xl min-h-max h-16 px-4"
                    defaultValue={award.dayOfAward}
                    placeholder="Datum osvojavanja*"
                  />

                  <Input
                    ref={linkRef}
                    className="text-2xl min-h-max h-16 px-4"
                    defaultValue={award.externalLink ?? ""}
                    placeholder="Link takmicenja"
                  />
                </div>

                <Input
                  ref={studentRef}
                  className="text-2xl min-h-max h-16 px-4"
                  defaultValue={award.student}
                  placeholder="Ime studenta*"
                />

                <Textarea
                  ref={descriptionRef}
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
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] ?? null)
                  }
                />
              </div>
            </div>

            <div className="flex gap-8 self-center mt-16">
              <Button className="py-4 h-16 w-64 text-xl" onClick={handleSave}>
                Sacuvaj promene
              </Button>

              <AlertDialog>
                <AlertDialogTrigger className="h-16 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 py-4 w-64">
                  Obriši
                </AlertDialogTrigger>

                <AlertDialogContent className="min-w-max">
                  <AlertDialogHeader className="flex flex-col min-w-max">
                    <AlertDialogTitle className="text-4xl">
                      Da li ste sigurni da želite da obrišete ovog nastavnika?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-2xl text-muted-foreground text-center">
                      Ova akcija je{" "}
                      <span className="text-red-500 font-bold">nepovratna</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-2xl h-16 w-32 mr-4">
                      Odustani
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 text-foreground hover:bg-red-900 text-2xl h-16 w-32"
                      onClick={() => handleDelete(award)}
                    >
                      Obrisi
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        );
      }}
    </Async>
  );
}

