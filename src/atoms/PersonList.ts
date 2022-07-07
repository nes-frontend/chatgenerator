import { atom } from "recoil";

export const personListState = atom<string[]>({
  key: "personList",
  default: [],
});
