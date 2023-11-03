import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorState } from "@codemirror/state";
import { rust } from "@codemirror/lang-rust";
import { ViewPlugin, Decoration, EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { RangeSet } from "@codemirror/rangeset";
import { useCodeMirror } from "@uiw/react-codemirror";

import {
  ideCodeState,
  ideEditRulesState,
  LineNumbersState,
  BlockedRangesState,
} from "@/utils/recoilState";

let editor = null;

interface IDEProps {
  isDisabled: boolean;
}

function IDE({ isDisabled }: IDEProps) {
  const [ideCode, setIdeCode] = useRecoilState(ideCodeState);
  const [editRules, setEditRules] = useRecoilState(ideEditRulesState);
  const [lineNumbers, setLineNumbers] = useRecoilState(LineNumbersState);

  const [blockedRanges, setBlockedRanges] = useRecoilState(BlockedRangesState);

  const FontSizeTheme = EditorView.theme({
    "&": {
      fontSize: "12pt",
    },
  });

  const FontSizeThemeExtension = [FontSizeTheme];

  const onChange = React.useCallback(
    (value: string | ((currVal: string) => string), viewUpdate: any) => {
      setIdeCode(value);
    },
    []
  );

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

  const [editorState, setEditorState] = useState();
  const [editorView, setEditorView] = useState();

  const readOnlyTransactionFilter = () => {
    return EditorState.transactionFilter.of((tr) => {
      return [];
    });
  };

  readOnlyTransactionFilter();

  const onCreateEditor = (view: any, state: any) => {
    setEditorState(state);
    setEditorView(view);
  };

  return (
    <div className="bg-[#232323] rounded-tl-lg rounded-bl-lg p-6 h-full max-h-[60vh]">
      <CodeMirror
        value={ideCode}
        className="rounded-tl-lg rounded-bl-lg h-full"
        height="100%"
        maxHeight="100%"
        theme="dark"
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
        editable={isDisabled}
      />
    </div>
  );
}

export default IDE;
