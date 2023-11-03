import { atom } from "recoil";

export const authModalState = atom<boolean>({
  key: "authModalStateKey",
  default: false,
});
