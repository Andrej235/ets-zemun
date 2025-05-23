import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import "./full-news-article.scss";

export default async function FullNewsArticle({
  params,
}: {
  params: Promise<{ newsId: number; locale: string }>;
}) {
  const { newsId, locale } = await params;

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
