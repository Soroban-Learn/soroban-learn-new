import React, { useState } from "react";

export function H2(props: { children: any }) {
  return <h2 className="text-5xl font-semibold mb-6">{props.children}</h2>;
}

export function H3(props: { children: any }) {
  return <h3 className="text-lg leading-loose">{props.children}</h3>;
}

export function H4(props: { children: any }) {
  return (
    <h4 className="text-2xl font-bold leading-loose mt-4 mb-2">
      {props.children}
    </h4>
  );
}

export function P(props: { children: any }) {
  return <p className="text-base leading-snug my-2">{props.children}</p>;
}

export function A(props: { href?: string | undefined; children: any }) {
  return (
    <a href={props.href} className="underline" target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

export function Code({
  children,
  inline = false,
}: {
  children: any;
  inline?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    if (typeof children[0] === "string") {
      navigator.clipboard.writeText(children);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (inline === true) {
    return (
      <code className="bg-[#282828] rounded-md px-2 py-1 text-sm">
        {children}
      </code>
    );
  } else {
    interface Child {
      child: string;
      index: number;
    }

    return (
      <div className="relative pb-2">
        <div className="bg-[#282828] rounded-md my-6 p-[10px] flex items-center justify-between">
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
