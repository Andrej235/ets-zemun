import { createContext } from "react";

export type Language = "sr-lat" | "sr-cyr";
const LanguageContext = createContext<Language>("sr-cyr");
export default LanguageContext;
