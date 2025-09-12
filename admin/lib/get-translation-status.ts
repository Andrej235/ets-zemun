import { TranslationStatus } from "@/components/translation-status-badge";

export default function getTranslationStatus(
  existingTranslation: string[],
  allLanguages: string[],
): {
  [key: string]: TranslationStatus;
} {
  return allLanguages.reduce(
    (acc, lang) => {
      acc[lang] = existingTranslation.includes(lang) ? "complete" : "missing";
      return acc;
    },
    {} as Record<string, TranslationStatus>,
  );
}
