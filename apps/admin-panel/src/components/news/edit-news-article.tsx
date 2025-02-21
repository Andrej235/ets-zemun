import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import NewsPreview from "@/components/news/news-preview";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useLazyLoad from "@/hooks/use-lazy-load";
import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { useEffect, useRef, useState } from "react";
import editNewsArticleLoader from "./edit-news-article-loader";
import { PreviewData } from "./new-news-article";
import compressImage from "@/lib/compress-image";

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
  const containerRef = useRef<HTMLDivElement>(null);
  useLazyLoad(Promise.resolve(news.images), (x) => {
    if (!containerRef.current) return;

    x.forEach((image) => {
      const imageRef = containerRef.current!.querySelector(
        `img#image-${image.id}`
      );

      imageRef?.setAttribute("src", image.image);
    });
  });

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

      <div
        className="border-2 rounded-4xl p-8"
        ref={containerRef}
        dangerouslySetInnerHTML={{
          __html: news.markup,
        }}
      />
    </div>
  );
}

