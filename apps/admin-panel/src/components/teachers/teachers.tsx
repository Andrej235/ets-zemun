import useLoader from "@/better-router/use-loader";
import teachersLoader from "./teachers-loader";
import LazyAwaitedList from "../lazy-loaded-list/lazy-awaited-list";
import { Button } from "../ui/button";
import { useNavigate, useRevalidator } from "react-router";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import i18n from "@/i18n";
import compressImage from "@/lib/compress-image";

export default function Teachers() {
  const loaderData = useLoader<typeof teachersLoader>();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  async function handleCreate(
    name: string,
    title: string,
    email: string,
    bio: string,
    image: File
  ) {
    const compressedImage = await compressImage(image);
    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedImage);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    const response = await sendAPIRequest("/teacher", {
      method: "post",
      payload: {
        email,
        image: imageBase64,
        translation: {
          teacherId: -1,
          languageCode: i18n.language,
          name,
          bio,
          title,
        },
      },
    });

    if (response.code !== "Created") alert(response);
    else revalidate();
  }

  return (
    <div className="flex min-w-full min-h-full justify-center">
      <div className="h-full w-2/3 max-h-full grid grid-cols-3 grid-flow-row gap-8 p-8 rounded-lg">
        <LazyAwaitedList data={loaderData} success="OK">
          {(x) => (
            <Button
              key={x.id}
              variant="ghost"
              className="flex flex-col gap-2 border-2 border-muted w-full h-[40rem] p-6"
              onClick={() => navigate(`/nastavnici/${x.id}`)}
            >
              <img
                src={x.image}
                alt={x.name}
                className="w-max h-max max-w-full max-h-full object-cover text-background/0"
              />
              <h2 className="text-center text-2xl">{x.name}</h2>
            </Button>
          )}
        </LazyAwaitedList>
      </div>

      <AlertDialog>
        <AlertDialogTrigger className="fixed bottom-16 right-16 w-24 h-24 rounded-full bg-accent grid place-items-center hover:bg-accent/90 border-2 border-transparent hover:border-slate-700 transition-colors">
          <Plus className="w-12 h-12" />
        </AlertDialogTrigger>

        <AlertDialogContent className="min-w-3/4 min-h-3/4 grid-rows-[max-content_1fr] gap-16 p-12">
          <AlertDialogHeader className="flex items-center">
            <AlertDialogTitle className="text-5xl">
              Novi nastavnik
            </AlertDialogTitle>
            <AlertDialogDescription className="text-3xl">
              Unesite podatke novog nastavnika
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Ime nastavnika"
              className="text-2xl min-h-max h-16 px-4"
              name="name"
              autoComplete="off"
            />

            <Input
              placeholder="Pozicija"
              className="text-2xl min-h-max h-16 px-4"
              name="title"
              autoComplete="off"
            />

            <Input
              placeholder="Email nastavnika"
              className="text-2xl min-h-max h-16 px-4"
              name="email"
              autoComplete="off"
            />

            <Textarea
              placeholder="Opis nastavnika (bio)"
              className="text-2xl min-h-96 px-4"
              name="bio"
              autoComplete="off"
            />

            <Input
              placeholder="Slika nastavnika"
              className="text-2xl min-h-max h-16 py-3"
              type="file"
              name="image"
              autoComplete="off"
            />

            <Button
              className="text-2xl h-16"
              onClick={(e) => {
                const container = (e.target as HTMLElement).parentElement;
                if (!container) return;

                const name = (
                  container.querySelector(
                    'input[name="name"]'
                  ) as HTMLInputElement
                )?.value.trim();

                const title = (
                  container.querySelector(
                    'input[name="title"]'
                  ) as HTMLInputElement
                )?.value.trim();

                const email = (
                  container.querySelector(
                    'input[name="email"]'
                  ) as HTMLInputElement
                )?.value.trim();

                const bio = (
                  container.querySelector(
                    'textarea[name="bio"]'
                  ) as HTMLInputElement
                )?.value.trim();

                const image = (
                  container.querySelector(
                    'input[name="image"]'
                  ) as HTMLInputElement
                )?.files?.[0];

                if (!name || !title || !email || !bio || !image) return;
                handleCreate(name, title, email, bio, image);
              }}
            >
              Dodaj nastavnika
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

