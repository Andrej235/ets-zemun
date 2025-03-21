import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import NewsPreview from "@/components/news/news-preview";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recursivelyLazyLoad } from "@/hooks/use-lazy-load";
import compressImage from "@/lib/compress-image";
import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import JoditEditor from "jodit-react";
import "jodit/es2021/jodit.min.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import editNewsArticleLoader from "./edit-news-article-loader";
import { PreviewData } from "./new-news-article";

type EditNewsArticleProps = {
  readonly createTranslation?: boolean;
};

export default function EditNewsArticle({
  createTranslation,
}: EditNewsArticleProps) {
  const loaderData = useLoader<typeof editNewsArticleLoader>();

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.preview.code !== "200" || data.full.code !== "200")
          return null;

        return (
          <Editor
            preview={data.preview.content}
            full={data.full.content}
            createTranslation={createTranslation}
          />
        );
      }}
    </Async>
  );
}

type EditorProps = {
  readonly preview: Schema<"NewsPreviewResponseDto">;
  readonly full: Schema<"NewsResponseDto">;
  readonly createTranslation?: boolean;
};

function Editor({ preview, full: news, createTranslation }: EditorProps) {
  const navigate = useNavigate();
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const { i18n } = useTranslation();

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

        const drafts = localStorage.getItem(`editor-previews-${i18n.language}`);
        const draftsData = drafts ? JSON.parse(drafts) : {};
        draftsData[news.id] = newData;
        localStorage.setItem(
          `editor-previews-${i18n.language}`,
          JSON.stringify(draftsData)
        );

        return newData;
      });
    },
    [news.id, i18n.language]
  );

  useEffect(() => {
    const drafts = localStorage.getItem(`editor-previews-${i18n.language}`);
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
  }, [preview, handlePreviewDataChange, i18n.language]);

  const [value, setValue] = useState<string>("");
  useEffect(() => {
    const editorRoot =
      editorContainerRef.current?.querySelector(".jodit-wysiwyg");
    if (!editorRoot) return;

    const drafts = localStorage.getItem(`editor-drafts-${i18n.language}`);
    const draftData = drafts ? JSON.parse(drafts)[news.id] : null;

    if (!draftData) {
      setValue(news.markup);
      recursivelyLazyLoad(news.images, (images) => {
        images.forEach((image) => {
          const imageRef = editorRoot.querySelector(`img#image-${image.id}`);
          imageRef?.setAttribute("src", image.image);
        });
      });
    } else {
      setValue(draftData);
    }
  }, [news, i18n.language]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const updateDraft = debounce((editorValue: string) => {
    const drafts = localStorage.getItem(`editor-drafts-${i18n.language}`);
    if (!drafts) {
      localStorage.setItem(
        `editor-drafts-${i18n.language}`,
        JSON.stringify({
          [news.id]: editorValue,
        })
      );
      return;
    }

    const draftsData = JSON.parse(drafts);
    draftsData[news.id] = editorValue;
    localStorage.setItem(
      `editor-drafts-${i18n.language}`,
      JSON.stringify(draftsData)
    );
  }, 300);

  const [isInDraftMode, setIsInDraftMode] = useState(false);
  useEffect(() => {
    const drafts = localStorage.getItem(`editor-drafts-${i18n.language}`);
    if (!drafts) return;

    const draftsData = JSON.parse(drafts);
    if (draftsData[news.id]) setIsInDraftMode(true);
  }, [news.id, i18n.language]);

  async function handleSave() {
    const root = editorContainerRef.current?.querySelector(
      ".jodit-wysiwyg"
    ) as HTMLElement;

    if (!root) {
      alert("Greska prilikom cuvanja");
      return;
    }

    const images = root.querySelectorAll("img");
    const imageSources: {
      source: string;
      id: number;
    }[] = [];

    images.forEach((image, i) => {
      const src = image.getAttribute("src");
      if (src) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        ctx?.drawImage(image, 0, 0, image.width, image.height);

        const compressedSrc = canvas.toDataURL("image/jpeg", 0.25); // Compress to 25% quality
        imageSources.push({
          id: i + 1,
          source: compressedSrc,
        });

        image.setAttribute("src", "");
        image.id = `image-${i + 1}`;

        image.src = src;
      }
    });

    if (!createTranslation) {
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

      if (newsResponse.code !== "204") return;
    }

    const translationPayload:
      | Schema<"UpdateNewsTranslationRequestDto">
      | Schema<"CreateNewsTranslationRequestDto"> = {
      id: news.id,
      newsId: news.id,
      title: previewData.title,
      description: previewData.description,
      languageCode: i18n.language,
      markup: root.innerHTML,
    };

    const translationResponse = await sendAPIRequest("/news/translation", {
      method: createTranslation ? "post" : "put",
      payload: translationPayload as never,
    });

    if (translationResponse.code !== "204") return;

    const previews = localStorage.getItem(`editor-previews-${i18n.language}`);
    const previewsData = previews ? JSON.parse(previews) : {};
    delete previewsData[news.id];
    localStorage.setItem(
      `editor-previews-${i18n.language}`,
      JSON.stringify(previewsData)
    );

    const drafts = localStorage.getItem(`editor-drafts-${i18n.language}`);
    const draftsData = drafts ? JSON.parse(drafts) : {};
    delete draftsData[news.id];
    localStorage.setItem(
      `editor-drafts-${i18n.language}`,
      JSON.stringify(draftsData)
    );

    setIsModalOpen(false);
    navigate("/vesti");
  }

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
              const previews = localStorage.getItem(
                `editor-previews-${i18n.language}`
              );
              const previewsData = previews ? JSON.parse(previews) : {};
              delete previewsData[news.id];
              localStorage.setItem(
                `editor-previews-${i18n.language}`,
                JSON.stringify(previewsData)
              );

              const drafts = localStorage.getItem(
                `editor-drafts-${i18n.language}`
              );
              const draftsData = drafts ? JSON.parse(drafts) : {};
              delete draftsData[news.id];
              localStorage.setItem(
                `editor-drafts-${i18n.language}`,
                JSON.stringify(draftsData)
              );
              navigate(-1);
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

