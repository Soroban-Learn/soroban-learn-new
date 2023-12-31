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

export type LessonContent = {
  title: string;
  description: string;
  steps: {
    instructions: {
      type: string;
      input: string;
    }[];
  }[];
}[];

type Exercise = {
  id: string;
  title: string;
  completed: boolean;
};
export interface LessonItem {
  id: string;
  index: number;
  title: string;
  totalExercises: number;
  completed_exercises: number;
  is_complete: boolean;
  exercises: Exercise[];
}
