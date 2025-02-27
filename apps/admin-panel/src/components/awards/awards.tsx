import useLoader from "@/better-router/use-loader";
import awardsLoader from "./awards-loader";
import LazyAwaitedList from "../lazy-loaded-list/lazy-awaited-list";
import AwardsCard from "./awards-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import i18n from "@/i18n";
import compressImage from "@/lib/compress-image";
import { useRevalidator } from "react-router";

export function Awards() {
  const loaderData = useLoader<typeof awardsLoader>();
  const { revalidate } = useRevalidator();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const competitionNameRef = useRef<HTMLInputElement>(null);
  const studentNameRef = useRef<HTMLInputElement>(null);
  const competitionLinkRef = useRef<HTMLInputElement>(null);
  const awardDateRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  async function handleCreate() {
    const title = titleRef.current?.value?.trim();
    const description = descriptionRef.current?.value?.trim() ?? null;
    const competitionName = competitionNameRef.current?.value?.trim();
    const studentName = studentNameRef.current?.value?.trim();
    const competitionLink = competitionLinkRef.current?.value?.trim() ?? null;
    const awardDate = awardDateRef.current?.value?.trim();
    const image = imageRef.current?.files?.[0];

    if (!title || !competitionName || !studentName || !awardDate || !image)
      return;

    const compressed = await compressImage(image);
    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressed);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    const response = await sendAPIRequest("/award", {
      method: "post",
      payload: {
        image: imageBase64,
        externalLink: competitionLink,
        dayOfAward: awardDate,
        translation: {
          languageCode: i18n.language,
          awardId: -1,
          title,
          description,
          competition: competitionName,
          student: studentName,
        },
      },
    });

    if (response.code !== "Created") return;
    revalidate();
  }

  return (
    <div className="awards-list pt-16!">
      <LazyAwaitedList data={loaderData} success="OK">
        {(x) => <AwardsCard award={x} key={x.id} />}
      </LazyAwaitedList>

      <AlertDialog>
        <AlertDialogTrigger className="fixed bottom-16 right-16 w-24 h-24 rounded-full bg-accent grid place-items-center hover:bg-accent/90 border-2 border-transparent hover:border-slate-700 transition-colors">
          <Plus className="w-12 h-12" />
        </AlertDialogTrigger>

        <AlertDialogContent className="min-w-3/4 min-h-3/4 grid-rows-[max-content_1fr] gap-16 p-12">
          <AlertDialogHeader className="flex items-center">
            <AlertDialogTitle className="text-5xl">
              Dodaj nagradu
            </AlertDialogTitle>
            <AlertDialogDescription className="text-3xl">
              Unesi podatke o novo-osvojenoj nagradi
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4">
            <Input
              ref={titleRef}
              className="text-2xl min-h-max h-16 px-4"
              placeholder="Naslov*"
            />

            <Textarea
              ref={descriptionRef}
              className="text-2xl min-h-max h-48 px-4"
              placeholder="Opis"
            />

            <Input
              ref={competitionNameRef}
              className="text-2xl min-h-max h-16 px-4"
              placeholder="Ime takmicenja*"
            />

            <Input
              ref={studentNameRef}
              className="text-2xl min-h-max h-16 px-4"
              placeholder="Ime ucenika koji je osvojio nagradu*"
            />

            <Input
              ref={competitionLinkRef}
              className="text-2xl min-h-max h-16 px-4"
              placeholder="Link takmicenja"
            />

            <Input
              ref={awardDateRef}
              className="text-2xl min-h-max h-16 px-4"
              placeholder="Datum osvojavanja*"
            />

            <div className="flex gap-4 items-center">
              <p className="text-2xl">Slika:</p>

              <Input
                ref={imageRef}
                className="text-2xl min-h-max h-16 px-4 py-3"
                placeholder="Slika"
                type="file"
              />
            </div>

            <div className="flex gap-8 justify-center mt-8">
              <AlertDialogCancel className="text-2xl h-16 w-64">
                Odustani
              </AlertDialogCancel>

              <AlertDialogAction
                className="text-2xl h-16 w-64"
                onClick={handleCreate}
              >
                Dodaj
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

