import useCodeEditor from "./useCodeEditor";

export default function CodeEditor({ value, onChange, extensions }) {
  const ref = useCodeEditor({ value, onChange, extensions });

  return <div ref={ref} />;
}
