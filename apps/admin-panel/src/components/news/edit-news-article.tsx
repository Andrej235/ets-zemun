import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import NewsPreview from "@/components/news/news-preview";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import compressImage from "@/lib/compress-image";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import editNewsArticleLoader from "./edit-news-article-loader";
import { PreviewData } from "./new-news-article";
import { recursivelyLazyLoad } from "@/hooks/use-lazy-load";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    handlePreviewDataChange(() => ({
      ...preview,
      date: new Date(preview.date),
    }));
  }, [preview]);

  function handleSave() {
    console.log("save");
  }

  useEffect(() => {
    if (!quill) return;

    quill.root.innerHTML = news.markup;

    recursivelyLazyLoad(news.images, (images) => {
      images.forEach((image) => {
        const imageRef = quill.root.querySelector(`img#image-${image.id}`);

        imageRef?.setAttribute("src", image.image);
      });
    });
  }, [quill, news]);

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

