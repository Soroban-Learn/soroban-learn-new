export interface ExerciseListItem {
  title: string;
  is_completed: boolean;
  id?: string;
  step_validation?: {
    type: string;
  };
  steps?: {
    instructions: {
      type: string;
      input: string;
    }[];
  }[];
  description?: string;
}

export interface ValidateExerciseParams {
  input: string;
  type: string;
  exerciseId: string;
}
