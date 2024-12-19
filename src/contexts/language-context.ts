import { createContext } from "react";

export type Language = "sr-lat" | "sr-cyr";
export default createContext<Language>("sr-cyr");
