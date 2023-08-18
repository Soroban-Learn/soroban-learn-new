import type { FC } from "react";
import type { LessonContent } from "@/types";
import ReactMarkdown from "react-markdown";

// Components
import { H2, H3, H4, P, Code, A } from "@/components/markdown";

export interface DescriptionProps {
  lessonContent: LessonContent;
  currentStep: number;
}

const Description: FC<DescriptionProps> = ({ lessonContent, currentStep }) => (
  <>
    <h3 className="text-lg leading-loose">
      {lessonContent && lessonContent[currentStep].title}
    </h3>
    <ReactMarkdown
      components={{
        p: P,
        h2: H2,
        code: Code,
        h3: H3,
        h4: H4,
        a: A,
      }}
    >
      {lessonContent && lessonContent[currentStep].description}
    </ReactMarkdown>
  </>
);

export default Description;
