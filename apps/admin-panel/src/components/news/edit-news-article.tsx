import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import NewsPreview from "@/components/news/news-preview";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import compressImage from "@/lib/compress-image";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useCallback, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import editNewsArticleLoader from "./edit-news-article-loader";
import { PreviewData } from "./new-news-article";
import { recursivelyLazyLoad } from "@/hooks/use-lazy-load";
import Toolbar from "quill/modules/toolbar";
import { useNavigate } from "react-router";
import sendAPIRequest from "@shared/api-dsl/send-api-request";

export default function EditNewsArticle() {
  const loaderData = useLoader<typeof editNewsArticleLoader>();

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.preview.code !== "OK" || data.full.code !== "OK") return null;

        return (
          <Editor preview={data.preview.content} full={data.full.content} />
        );
      }}
    </Async>
  );
}

type EditorProps = {
  readonly preview: Schema<"NewsPreviewResponseDto">;
  readonly full: Schema<"NewsResponseDto">;
};

function Editor({ preview, full: news }: EditorProps) {
  const { quillRef, quill } = useQuill();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData>({
    title: "",
    description: "",
    previewImage: "",
    date: new Date(),
  });

  const handlePreviewDataChange = useCallback(
    (callback: (prev: PreviewData) => PreviewData) => {
      setPreviewData((prev) => {
        const newData = callback(prev);

        const drafts = localStorage.getItem("editor-previews");
        const draftsData = drafts ? JSON.parse(drafts) : {};
        draftsData[news.id] = newData;
        localStorage.setItem("editor-previews", JSON.stringify(draftsData));

        return newData;
      });
    },
    [news.id]
  );

  useEffect(() => {
    const drafts = localStorage.getItem("editor-previews");
    const draftData = drafts ? JSON.parse(drafts)[preview.id] : null;

    if (!draftData) {
      handlePreviewDataChange(() => ({
        ...preview,
        date: new Date(preview.date),
      }));
    } else {
      draftData.date = new Date(draftData.date);
      setPreviewData(draftData);
    }
  }, [preview, handlePreviewDataChange]);

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

    const newsPayload: Schema<"UpdateNewsRequestDto"> = {
      id: news.id,
      date: previewData.date.toISOString().replace(/[:.]/g, "").split("T")[0],
      previewImage: previewData.previewImage,
      images: imageSources.map((x) => ({
        id: x.id,
        image: x.source,
      })),
    };

    const newsResponse = await sendAPIRequest("/news", {
      method: "put",
      payload: newsPayload,
    });

    if (newsResponse.code !== "No Content") return;

    const translationPayload: Schema<"UpdateNewsTranslationRequestDto"> = {
      id: news.id,
      title: previewData.title,
      description: previewData.description,
      languageCode: "sr_lt",
      markup: root.innerHTML,
    };

    const translationResponse = await sendAPIRequest("/news/translation", {
      method: "put",
      payload: translationPayload,
    });

    if (translationResponse.code !== "No Content") return;

    const previews = localStorage.getItem("editor-previews");
    const previewsData = previews ? JSON.parse(previews) : {};
    delete previewsData[news.id];
    localStorage.setItem("editor-previews", JSON.stringify(previewsData));

    const drafts = localStorage.getItem("editor-drafts");
    const draftsData = drafts ? JSON.parse(drafts) : {};
    delete draftsData[news.id];
    localStorage.setItem("editor-drafts", JSON.stringify(draftsData));

    setIsModalOpen(false);
    navigate("/vesti");
  }

  useEffect(() => {
    if (!quill) return;

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
      const drafts = localStorage.getItem("editor-drafts");
      if (!drafts) {
        localStorage.setItem(
          "editor-drafts",
          JSON.stringify({
            [news.id]: quill.root.innerHTML,
          })
        );
        return;
      }

      const draftsData = JSON.parse(drafts);
      draftsData[news.id] = quill.root.innerHTML;
      localStorage.setItem("editor-drafts", JSON.stringify(draftsData));
    });

    const drafts = localStorage.getItem("editor-drafts");
    const draftData = drafts ? JSON.parse(drafts)[news.id] : null;

    if (!draftData) {
      quill.root.innerHTML = news.markup;

      recursivelyLazyLoad(news.images, (images) => {
        images.forEach((image) => {
          const imageRef = quill.root.querySelector(`img#image-${image.id}`);
          imageRef?.setAttribute("src", image.image);
        });
      });
    } else {
      quill.root.innerHTML = draftData;
    }
  }, [quill, news]);

  const [isInDraftMode, setIsInDraftMode] = useState(false);
  useEffect(() => {
    const drafts = localStorage.getItem("editor-drafts");
    if (!drafts) return;

    const draftsData = JSON.parse(drafts);
    if (draftsData[news.id]) setIsInDraftMode(true);
  }, [news.id]);

  return (
    <div className="w-full h-max p-20 flex flex-col gap-16">
      {isInDraftMode && (
        <div className="w-full h-max p-6 text-accent-foreground flex gap-4 items-center">
          <p>
            Trenutno menjate radnu verziju ovog clanka, ako zelite da odbacite
            stare promene kliknite na dugme odbaci
          </p>

          <Button
            onClick={() => {
              localStorage.removeItem("editor-drafts");
              localStorage.removeItem("editor-previews");
              navigate(0);
            }}
            variant={"destructive"}
          >
            Odbaci
          </Button>
        </div>
      )}

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
          }}
          disabledLink
        />
      </div>

      <div className="w-full min-h-[100vh]">
        <div ref={quillRef} />

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

