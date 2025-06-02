import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import localeToLangCode from "@/lib/locale-to-lang-code";
import "./full-news-article.scss";

export default async function FullNewsArticle({
  params,
}: {
  params: Promise<{ newsId: number; locale: string }>;
}) {
  const { newsId, locale } = await params;

  const { isOk, response } = await sendApiRequestSSR(
    "/news/{id}",
    {
      method: "get",
      parameters: {
        id: newsId,
        languageCode: localeToLangCode(locale),
      },
    },
    86400
  );

  if (!isOk) throw new Error("Failed to fetch news");

  return (
    <div className="article-container">
      <div
        dangerouslySetInnerHTML={{
          __html: response!.markup,
        }}
      />
    </div>
  );
}
