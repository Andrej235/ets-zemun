import NewsPreview from "@/components/news/news-preview";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import JoditEditor from "jodit-react";
import "jodit/es2021/jodit.min.css";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export type PreviewData = {
  title: string;
  description: string;
  previewImage: string;
  date: Date;
};

export default function NewNewsArticle() {
  const { i18n } = useTranslation();

  const [previewData, setPreviewData] = useState<PreviewData>({
    title: "",
    description: "",
    previewImage: "",
    date: new Date(),
  });

  const navigate = useNavigate();
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");

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
    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imageBitmap, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
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
    const drafts = localStorage.getItem(`editor-drafts-${i18n.language}`);
    const draftData = drafts ? JSON.parse(drafts)["new-article"] : null;

    if (!draftData) {
      setValue("");
    } else {
      setValue(draftData);
    }
  }, [i18n.language]);

  function debounce(
    func: (arg: string) => void,
    wait: number
  ): (arg: string) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (arg: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(arg), wait);
    };
  }

  const updateDraft = debounce((editorValue: string) => {
    const drafts = localStorage.getItem(`editor-drafts-${i18n.language}`);
    if (!drafts) {
      localStorage.setItem(
        `editor-drafts-${i18n.language}`,
        JSON.stringify({
          "new-article": editorValue,
        })
      );
      return;
    }

    const draftsData = JSON.parse(drafts);
    draftsData["new-article"] = editorValue;
    localStorage.setItem(
      `editor-drafts-${i18n.language}`,
      JSON.stringify(draftsData)
    );
  }, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSave() {
    const root = editorContainerRef.current?.querySelector(
      ".jodit-wysiwyg"
    ) as HTMLElement;

    if (!root) {
      alert("Greska prilikom cuvanja");
      return;
    }

    const payload: Schema<"CreateNewsRequestDto"> = {
      date: previewData.date.toISOString().replace(/[:.]/g, "").split("T")[0],
      previewImage: previewData.previewImage,
      images: [],
      translation: {
        languageCode: i18n.language,
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

    if (response.code !== "204") return;

    localStorage.removeItem("draft");
    localStorage.removeItem("preview");
    localStorage.removeItem(`editor-drafts-${i18n.language}`);
    setIsModalOpen(false);
    navigate("/vesti");
  }

  return (
    <div className="w-full h-max p-20 flex flex-col gap-20">
      <div className="w-full h-max flex gap-10 ">
        <div className="flex flex-col gap-3 flex-1/2">
          <Input
            placeholder="Naslov"
            className="h-max text-2xl p-6"
            onChange={(x) =>
              handlePreviewDataChange((prev) => ({
                ...prev,
                title: x.target.value,
              }))
            }
            value={previewData.title}
          />
          <Textarea
            className="h-full text-2xl p-6"
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
            className="h-max text-2xl p-6"
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
            isApproved: true,
          }}
          disabledLink
        />
      </div>

      <div className="w-full min-h-[100vh]">
        <div ref={editorContainerRef}>
          <JoditEditor
            config={{
              theme: "dark",
              uploader: {
                imagesExtensions: ["jpg", "png", "jpeg", "gif"],
                insertImageAsBase64URI: true,
              },
            }}
            value={value}
            onChange={(x) => {
              updateDraft(x);
            }}
          />
        </div>

        <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
          <PopoverTrigger
            className={
              "fixed bottom-12 right-12 text-2xl p-6 rounded-2xl bg-secondary text-secondary-foreground shadow-sm hover:bg-sky-900 transition-colors cursor-pointer"
            }
          >
            Sacuvaj
          </PopoverTrigger>
          <PopoverContent className="flex flex-col justify-center gap-3 p-12 min-w-max rounded-2xl">
            <h1 className="w-max font-bold text-3xl">
              Da li ste sigurni da zelite da sacuvate promene?
            </h1>
            <h2 className="w-max text-2xl text-muted-foreground">
              Ova akcija je nepovratna
            </h2>

            <div className="flex justify-end gap-6">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="text-xl h-max p-4 cursor-pointer"
              >
                Odustani
              </Button>
              <Button
                variant="default"
                className="text-xl h-max p-4 cursor-pointer"
                onClick={handleSave}
              >
                Sacuvaj
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

