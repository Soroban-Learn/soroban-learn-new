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
}[];

type Exercise = {
  id: number;
  title: string;
  completed: boolean;
}
export interface LessonItem {
  index: number;
  title: string;
  totalExercises: number;
  completedExercises: number;
  isCompleted: boolean;
  exercises: Exercise[];
}