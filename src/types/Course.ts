import { StaticImageData } from 'next/image';

export interface ICourse {
  title: string;
  dependency: string;
  image: StaticImageData;
  estimate: string;
  level: string;
  description: string;
  isActive: boolean;
  progress: number;
}
