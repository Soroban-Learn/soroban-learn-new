import React, { type FC, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { githubDarkInit } from "@uiw/codemirror-theme-github";

import CodeMirror from "@uiw/react-codemirror";
import { EditorState } from "@codemirror/state";
import { rust } from "@codemirror/lang-rust";
import { EditorView } from "@codemirror/view";

import {
  LineNumbersState,
  BlockedRangesState,
  currentErrorState,
} from "@/store";

const theme = githubDarkInit({
  settings: {
    gutterBackground: "#232323",
    gutterForeground: "#fff",
    gutterBorder: "#232323",
    background: "#232323",
    lineHighlight: "#232323",
  },
});

interface EditorProps {
  isDisabled: boolean;
  code: string;
  setCode: (code: string) => void;
}

const Editor: FC<EditorProps> = ({ isDisabled, code, setCode }) => {
  const [blockedRanges] = useRecoilState(BlockedRangesState);
  const [lineNumbers] = useRecoilState(LineNumbersState);
  const [exerciseError] = useRecoilState(currentErrorState);

  const [, setEditorState] = useState();
  const [, setEditorView] = useState();

  const FontSizeTheme = EditorView.theme({
    "&": {
      fontSize: "12pt",
    },
  });

  const FontSizeThemeExtension = [FontSizeTheme];

  const getReadOnlyRanges = (targetState: {
    doc: {
      line: (arg0: number) => { (): any; new (): any; from: any; to: any };
    };
  }) => {
    const ranges: { from: any; to: any }[] = [];

    lineNumbers.forEach((line) => {
      ranges.push({
        from: targetState.doc.line(line + 1).from,
        to: targetState.doc.line(line + 1).to,
      });
    });

    return ranges;
  };

  const readOnlyTransactionFilter = () => {
    return EditorState.transactionFilter.of((tr) => {
      return [];
    });
  };

  readOnlyTransactionFilter();

  const onChange = useCallback(
    (value: string) => {
      setCode(value);
    },
    [setCode]
  );

  const onCreateEditor = (view: any, state: any) => {
    setEditorState(state);
    setEditorView(view);
  };

  return (
    <div className="relative h-full">
      <CodeMirror
        value={code}
        className="rounded-tl-lg rounded-bl-lg h-full ide-editor"
        height="100%"
        maxHeight="100%"
        theme={theme}
        extensions={[
          EditorView.lineWrapping,
          FontSizeThemeExtension,
          rust(),
          EditorState.changeFilter.of((tr) => {
            const ranges = blockedRanges;
            return ranges;
          }),
        ]}
        onChange={onChange}
        onCreateEditor={onCreateEditor}
        editable={!isDisabled}
      />

      {exerciseError ? (
        <div className="bg-black bg-opacity-70 rounded-lg absolute bottom-0 p-11">
          <div className="text-center text-white text-4xl font-semibold">
            Oops!
          </div>
          <div className="text-center text-white text-lg font-normal">
            {exerciseError}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Editor;
