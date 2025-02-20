import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Toolbar from "quill/modules/toolbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import NewsPreview from "@/components/news/news-preview";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";

type PreviewData = {
  title: string;
  description: string;
  previewImage: string;
  date: Date;
};

export default function NewNewsArticle() {
  const { quillRef, quill } = useQuill();

  const [previewData, setPreviewData] = useState<PreviewData>({
    title: "",
    description: "",
    previewImage: "",
    date: new Date(),
  });

  function handlePreviewDataChange(
    callback: (prev: PreviewData) => PreviewData
  ) {
    setPreviewData((prev) => {
      const newData = callback(prev);
      localStorage.setItem("preview", JSON.stringify(newData));
      return newData;
    });
  }

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
    const preview = localStorage.getItem("preview");
    if (!preview) return;

    const loadedData = JSON.parse(preview) as PreviewData;
    loadedData.date = new Date(loadedData.date);
    setPreviewData(loadedData);
  }, []);

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
    toolbar.addHandler("image", () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = () => {
        const file = input.files![0];
        addImage(file);
      };
    });

    quill.on("text-change", () => {
      if (quill) localStorage.setItem("draft", quill.root.innerHTML);
    });
  }, [quill]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSave() {
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
      image.id = `image-${i + 1}`;
    });

    const payload: Schema<"CreateNewsRequestDto"> = {
      date: previewData.date.toISOString().replace(/[:.]/g, "").split("T")[0],
      previewImage: previewData.previewImage,
      images: imageSources.map((x) => ({
        id: x.id,
        image: x.source,
      })),
      translation: {
        languageCode: "sr_lt",
        newsId: -1,
        title: previewData.title,
        description: previewData.description,
        markup: root.innerHTML,
      },
    };

    const response = await sendAPIRequest("/news", {
      method: "post",
      payload,
    });

    if (response.code !== "No Content") return;

    //* localStorage.removeItem("draft");
    //* localStorage.removeItem("preview");
    setIsModalOpen(false);
  }

  return (
    <div className="w-full h-max p-20 flex flex-col gap-20">
      <div className="w-full h-max flex gap-10">
        <div className="w-full flex flex-col gap-3">
          <Input
            placeholder="Naslov"
            className="pt-5 pb-5 h-10"
            onChange={(x) =>
              handlePreviewDataChange((prev) => ({
                ...prev,
                title: x.target.value,
              }))
            }
            value={previewData.title}
          />
          <Textarea
            placeholder="Kratak opis"
            onChange={(x) =>
              handlePreviewDataChange((prev) => ({
                ...prev,
                description: x.target.value,
              }))
            }
            value={previewData.description}
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
                handlePreviewDataChange((prev) => ({
                  ...prev,
                  previewImage: imageDataUrl,
                }));
              };
            }}
          />
          <DatePicker
            date={previewData.date}
            setDate={(x) =>
              handlePreviewDataChange((prev) => ({
                ...prev,
                date: x ?? new Date(),
              }))
            }
          />
        </div>

        <NewsPreview
          news={{
            ...previewData,
            id: -1,
            date: previewData.date.toDateString(),
          }}
          disabledLink
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

