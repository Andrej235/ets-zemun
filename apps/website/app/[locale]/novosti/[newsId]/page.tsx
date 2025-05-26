import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import FullNewsArticle from "@/components/full-news-article/full-news-article";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import localeToLangCode from "@/lib/locale-to-lang-code";
import { Metadata } from "next";

export const dynamicParams = true;
export const dynamic = "auto";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; newsId: number }>;
}): Promise<Metadata> {
  const { locale, newsId } = await params;
  const newsArticleResponse = await sendApiRequestSSR("/news/{id}/preview", {
    method: "get",
    parameters: {
      id: newsId,
      languageCode: localeToLangCode(locale),
    },
  });

  if (!newsArticleResponse.isOk) {
    throw new Error("Failed to fetch news article metadata");
  }

  const news = newsArticleResponse.response!;

  return {
    title: news.title,
    description: news.description.slice(0, 160),
    openGraph: {
      title: news.title,
      description: news.description.slice(0, 160),
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/novosti/${newsId}`,
      locale,
      type: "article",
      images: [
        {
          url: news.previewImage,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description.slice(0, 160),
      images: [news.previewImage],
    },
    alternates: generateAlternateUrls(locale, `novosti/${newsId}`),
  };
}

export default FullNewsArticle;
