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
