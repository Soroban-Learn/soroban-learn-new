import { useEffect } from "react";
import onUpdate from "./onUpdate";
import useCodeMirror from "./useCodeMirror";
import { Extension } from "typescript";
import { EditorView } from "@codemirror/view";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  extensions: Extension[];
}

export default function useCodeEditor({
  value,
  onChange,
  extensions,
}: CodeEditorProps) {
  const { ref, view } = useCodeMirror([onUpdate(onChange), ...extensions]);

  useEffect(() => {
    if (view) {
      const editorValue = (view as EditorView).state.doc.toString();

      if (value !== editorValue) {
        (view as EditorView).dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || "",
          },
        });
      }
    }
  }, [value, view]);

  return ref;
}
