import type { FileStructureNode, LessonContent, ExerciseListItem } from "@/types";
import { atom } from "recoil";

export const currentLessonState = atom<LessonContent>({
  key: "currentLessonState",
  default: [] as LessonContent, // Explicitly cast the default value to an empty array of LessonContent
});

export const currentExerciseState = atom<ExerciseListItem>({
  key: "currentExerciseState",
  default: {} as ExerciseListItem, 
});


export const ideCodeState = atom<string>({
  key: "ideCodeStateKey",
  default: "",
});

export const consoleCodeState = atom<
  { successMessage: string; input: string }[]
>({
  key: "consoleCodeStateKey",
  default: [],
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
  default: "ide",
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
      id: "1",
      title: "main",
      type: "folder",
      children: [
        {
          id: "1_1",
          title: "Lib.rs",
          type: "file",
        },
      ],
    },
    {
      id: "2",
      title: "another folder",
      type: "folder",
    },
  ],
});
