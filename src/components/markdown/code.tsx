import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import { type FC, useCallback, useState } from "react";

export const Code: FC<CodeProps> = ({
  inline,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback(() => {
    if (children && typeof children[0] === "string") {
      navigator.clipboard.writeText(children[0]);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [children]);

  if (inline === true) {
    return (
      <code className="bg-gray rounded-md px-2 py-1 text-sm">
        {children}
      </code>
    );
  } else {
    return (
      <div className="relative pb-2">
        <div className="bg-gray rounded-md my-6 p-[10px] flex items-center justify-between">
          <code className="break-normal whitespace-pre-wrap">{children}</code>
          <div onClick={() => copyText()} className="cursor-pointer	">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffffff"
                d="M448 384H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V320c0 35.3-28.7 64-64 64zM64 128h96v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V416h48v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"
              />
            </svg>
          </div>
        </div>
        {copied && (
          <span className="text-green-500 text-sm ml-2 absolute right-0 bottom-0">
            Copied to clipboard
          </span>
        )}
      </div>
    );
  }
}

