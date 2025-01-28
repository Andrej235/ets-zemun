import LanguageContext from "@contexts/language-context";
import { useContext } from "react";

export default function useLanguage() {
  return useContext(LanguageContext);
}
