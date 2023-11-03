import type { User } from "@/types";
import { atom } from "recoil";

export const tokenStateKey = "tokenStateKey";

export const tokenState = atom<string>({
  key: tokenStateKey,
  default: "",
});

export const userState = atom<User | null>({
  key: "userStateKey",
  default: null,
});
