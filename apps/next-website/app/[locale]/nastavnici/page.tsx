import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Teachers from "@/components/teachers/teachers";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  const { isOk, response } = await sendApiRequestSSR("/teachers", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
      limit: -1,
    },
  });

  if (!isOk) throw new Error("Failed to fetch teachers");

  return <Teachers teachers={response!.items} />;
}
