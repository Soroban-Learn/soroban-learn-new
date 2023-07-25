import type { FileStructureNode, LessonContent } from "@/types";
import { atom } from "recoil";

export const currentLessonState = atom<LessonContent>({
  key: "currentLessonState",
  default: {
    title: "",
    steps: [],
  },
});

export const ideCodeState = atom<string>({
  key: "ideCodeStateKey",
  default: "",
});

export const LineNumbersState = atom<number[]>({
  key: "LineNumbersStateKey",
  default: [],
});

export const BlockedRangesState = atom<number[]>({
  key: "BlockedRangesStateKey",
  default: [],
});

export const currentStepState = atom<number>({
  key: "currentStepStateKey",
  default: 0,
});

export const currentErrorState = atom<string>({
  key: "currentErrorStateKey",
  default: "",
});

export const hasErrorState = atom<boolean>({
  key: "hasErrorStateKey",
  default: false,
});

export const stepTypeState = atom<string>({
  key: "stepTypeStateKey",
  default: "terminal",
});

export const selectedFileIdState = atom<string>({
  key: "selectedFileIdStateKey",
  default: "",
});

// TO DO: Fetch file structure from api
export const fileStructureState = atom<FileStructureNode[]>({
  key: "fileStructureStateKey",
  default: [
    {
      id: '1',
      title: 'main',
      type: 'folder',
      children: [
        {
          id: '1_1',
          title: "Lib.rs",
          type: "file",
        },
        {
          id: '1_2',
          title: "Test.rs",
          type: "file",
        },
        {
          id: '1_3',
          title: "Another.rs",
          type: "file",
        },
        {
          id: '1_4',
          title: "This title is too long.rs",
          type: "file",
        },
      ],
    },
    {
      id: '2',
      title: "another folder",
      type: "folder",
    }
  ],
});
