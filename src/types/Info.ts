import { LessonItem } from './Lesson';

export interface IInfo {
  id: string;
  description: string;
  completed_lessons: number;
  current_lesson_id: string;
  title: string;
  lessons: LessonItem[];
}
