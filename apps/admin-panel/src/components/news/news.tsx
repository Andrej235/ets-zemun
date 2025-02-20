import { useQuill } from "react-quilljs";
//@ts-expect-error CSS
import "quill/dist/quill.snow.css";
import "./news.scss";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Toolbar from "quill/modules/toolbar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";
import NewsPreview from "./news-preview";

export default function News() {
  const { quillRef, quill } = useQuill();

  const compressImage = async (file: File, quality = 1) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );

    // Turn Blob into File
    return new File([blob!], file.name, {
      type: blob!.type,
    });
  };

  useEffect(() => {
    if (!quill) return;

    const draft = localStorage.getItem("draft");
    if (draft) quill.root.innerHTML = draft;

    const insertToEditor = (url: string) => {
      const range = quill.getSelection();
      if (!range) return;
      quill.insertEmbed(range.index, "image", url);
    };

    const addImage = async (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(await compressImage(file, 0.5));
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        insertToEditor(imageDataUrl);
      };
    };

    const toolbar = quill.getModule("toolbar") as Toolbar;
    toolbar.addHandler("image", (x) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = () => {
        const file = input.files![0];
        addImage(file);
      };
      console.log(x);
    });

    quill.on("text-change", () => {
      if (quill) localStorage.setItem("draft", quill.root.innerHTML);
    });
  }, [quill]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSave() {
    if (!quill) return;

    const root = quill.root;
    const images = root.querySelectorAll("img");
    const imageSources: {
      source: string;
      id: number;
    }[] = [];

    images.forEach((image, i) => {
      const src = image.getAttribute("src");
      if (src)
        imageSources.push({
          id: i + 1,
          source: src,
        });
      image.setAttribute("src", "");
      image.id = "image_" + (i + 1);
    });

    console.log(quill.root.innerHTML, imageSources);
    localStorage.removeItem("draft");
    setIsModalOpen(false);
  }

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  return (
    <div className="w-full h-max p-20 flex flex-col gap-20">
      <div className="w-full h-max flex gap-10">
        <div className="w-full flex flex-col gap-3">
          <Input
            placeholder="Naslov"
            className="pt-5 pb-5 h-10"
            onChange={(x) => setTitle(x.target.value)}
          />
          <Textarea
            placeholder="Kratak opis"
            onChange={(x) => setDescription(x.target.value)}
          />
          <Input
            type="file"
            onChange={async (x) => {
              const file = x.target.files?.[0];
              if (!file) return;

              const compressedImage = await compressImage(file, 0.5);
              const reader = new FileReader();
              reader.readAsDataURL(compressedImage);
              reader.onload = () => {
                const imageDataUrl = reader.result as string;
                setPreviewImage(imageDataUrl);
              };
            }}
          />
          <DatePicker date={date} setDate={setDate} />
        </div>

        <NewsPreview
          date={date ?? new Date()}
          title={title}
          description={description}
          image={previewImage ?? ""}
        />
      </div>

      <div className="w-full h-[100vh]">
        <div ref={quillRef} />

        <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
          <PopoverTrigger>Sacuvaj</PopoverTrigger>
          <PopoverContent className="flex flex-col justify-center gap-3 p-12 min-w-max rounded-2xl">
            <h1 className="w-max font-bold text-3xl">
              Da li ste sigurni da zelite da sacuvate promene?
            </h1>
            <h2 className="w-max text-2xl text-muted-foreground">
              Ova akcija je nepovratna
            </h2>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Odustani
              </Button>
              <Button onClick={handleSave}>Sacuvaj</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

