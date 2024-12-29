import { createContext } from "react";
import { Language } from "src/types/utility/language";

export const languages = [
  "sr-lat",
  "sr-cyr",
  "en",
  "ca",
  "bn",
  "bg",
  "zh",
] as const;
const LanguageContext = createContext<Language>("sr-cyr");
export default LanguageContext;
