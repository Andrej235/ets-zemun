import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { getLocale } from "next-intl/server";
import "./full-news-article.scss";

export default async function FullNewsArticle({
  params,
}: {
  params: Promise<{ newsId: number }>;
}) {
  const locale = await getLocale();
  const { newsId } = await params;

  const { isOk, response } = await sendApiRequestSSR("/news/{id}", {
    method: "get",
    parameters: {
      id: newsId,
      languageCode: locale === "srl" ? "sr_lt" : locale,
    },
  });

  if (!isOk) throw new Error("Failed to fetch news");

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: response!.markup,
      }}
    />
  );
}
