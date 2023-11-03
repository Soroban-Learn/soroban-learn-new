import { atom } from "recoil";

const currentStepState = atom({
  key: "currentStepStateKey",
  default: 0,
});

const currentErrorState = atom({
  key: "currentErrorStateKey",
  default: "",
});

const hasErrorState = atom({
  key: "hasErrorStateKey",
  default: false,
});

export interface Instruction {
  type: string;
  input: string;
  output: string;
}

export interface Step {
  stepTitle: string;
  stepContent: string;
  stepType: string;
  instructions: Instruction[];
}

export interface LessonContent {
  title: string;
  steps: Step[];
}

const currentLessonState = atom<LessonContent>({
  key: "currentLessonState",
  default: {
    title: "",
    steps: [],
  },
});

const ideCodeState = atom({
  key: "ideCodeStateKey",
  default: "",
});

const ideEditRulesState = atom({
  key: "ideEditRulesStateKey",
  default: [],
});

const LineNumbersState = atom({
  key: "LineNumbersStateKey",
  default: [],
});

const BlockedRangesState = atom({
  key: "BlockedRangesStateKey",
  default: [],
});

export {
  currentStepState,
  currentErrorState,
  hasErrorState,
  currentLessonState,
  ideCodeState,
  ideEditRulesState,
  LineNumbersState,
  BlockedRangesState,
};
