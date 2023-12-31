import type { FC } from "react";
import type { ExerciseListItem } from "@/types";
import ReactMarkdown from "react-markdown";

// Components
import { H2, H3, H4, P, Code, A } from "@/components/markdown";

export interface DescriptionProps {
  lessonContent: ExerciseListItem;
}

const Description: FC<DescriptionProps> = ({ lessonContent }) => (
  <>
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
      {(lessonContent && lessonContent.description) || ""}
    </ReactMarkdown>
  </>
);

export default Description;
