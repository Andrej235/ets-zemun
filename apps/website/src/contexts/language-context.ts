import { createContext } from "react";

export const localLanguages = ["sr-lat", "sr-cyr"] as const;
const LanguageContext = createContext<string>("sr-cyr");
export default LanguageContext;

