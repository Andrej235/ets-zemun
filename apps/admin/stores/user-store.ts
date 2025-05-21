import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { create } from "zustand";

type UserStore = {
  isLoading: boolean;
  user: Schema<"UserResponseDto"> | null;
  setUser: (user: Schema<"UserResponseDto"> | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  isLoading: true,
  user: null,
  setUser: (user: Schema<"UserResponseDto"> | null) =>
    set({ user, isLoading: false }),
}));
