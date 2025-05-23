import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Teachers from "@/components/teachers/teachers";
import { getLocale } from "next-intl/server";

export default async function Page() {
  const locale = await getLocale();

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
