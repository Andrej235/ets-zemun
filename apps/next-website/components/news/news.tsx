import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import NewsPreview from "@/components/news-preview/news-preview";
import "../news-preview/news-preview.scss";
import "./news.scss";

export default async function News({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const { isOk, response } = await sendApiRequestSSR("/news", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
      limit: -1,
    },
  });

  if (!isOk) throw new Error("Failed to fetch news");

  return (
    <div className="news-page-container" data-search-key="novosti">
      <div className="articles-container">
        {response!.items.map((data) => (
          <NewsPreview key={data.id} news={data} />
        ))}
      </div>
    </div>
  );
}
