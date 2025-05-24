import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Awards from "@/components/awards/awards";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  const { isOk, response } = await sendApiRequestSSR("/awards", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
      limit: -1,
    },
  });

  if (!isOk) throw new Error("Failed to fetch awards");

  return <Awards awards={response!.items} />;
}
