import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Awards from "@/components/awards/awards";
import { getLocale } from "next-intl/server";

export default async function Page() {
  const locale = await getLocale();

  const { isOk, response } = await sendApiRequestSSR("/awards", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
    },
  });

  if (!isOk) throw new Error("Failed to fetch awards");

  return <Awards awards={response!.items} />;
}
