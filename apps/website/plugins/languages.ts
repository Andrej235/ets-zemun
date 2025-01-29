const localTranslatorLanguageOptions = ["sr-lat", "sr-cyr"] as const;

export default function getLanguageOptions(
  libreTranslatorLanguageOptions: string[] = []
) {
  return [...localTranslatorLanguageOptions, ...libreTranslatorLanguageOptions];
}

