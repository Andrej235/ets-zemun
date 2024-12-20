import LanguageContext from "@contexts/language-context";
import { useContext } from "react";

export default function useLanguagePack(...packs: string[][]): string[] {
  const lang = useContext(LanguageContext);
  return packs[lang === "sr-cyr" ? 0 : 1];
}
