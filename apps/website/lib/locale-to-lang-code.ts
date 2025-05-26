export default function localeToLangCode(locale: string): string {
  switch (locale) {
    case "srb":
      return "sr_cr";
    case "lat":
      return "sr_lt";
    case "eng":
      return "en";
    default:
      return locale;
  }
}
