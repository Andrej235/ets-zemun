import LanguageContext from "@contexts/language-context";
import { useContext } from "react";

export default function useLanguagePack<T>(...packs: T[]): T {
  const lang = useContext(LanguageContext);
  return packs[lang === "sr-cyr" ? 0 : 1];
}
