import { createContext } from "react";

const SetLanguageContext = createContext<(language: string) => void>(() => {});
export default SetLanguageContext;

