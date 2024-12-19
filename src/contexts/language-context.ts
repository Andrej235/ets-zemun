import { createContext } from "react";

export type Language = "sr-lat" | "sr-cir";
export default createContext<Language>("sr-cir");
