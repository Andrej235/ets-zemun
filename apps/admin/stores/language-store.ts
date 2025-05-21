import { create } from "zustand";

type LanguageStore = {
  languages: { code: string; fullName: string }[];
  setLanguages: (languages: { code: string; fullName: string }[]) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  languages: [],
  setLanguages: (languages) => set({ languages }),
}));
