import React, { useCallback, useState, useEffect, useMemo } from "react";

// Components
import Tabs, { type Tab } from '@/components/common/Tabs';
import Editor from "./Editor";

interface IDEFile {
  title: string;
  key: string;
  code?: string;
}

interface IDEProps {
  isDisabled: boolean;
  defaultFiles: IDEFile[];
}

function IDE({ isDisabled, defaultFiles }: IDEProps) {
  const [files, setFiles] = useState<IDEFile[]>([]);
  const [activeTabKey, setActiveTabKey] = useState('');
  const [activeEditorCode, setActiveEditorCode] = useState<string>('');

  const removeTab = useCallback((key: string) => {
    const newFiles = files.filter((file: Tab) => file.key !== key);
    setActiveEditorCode('');
    setFiles(newFiles);
    setActiveTabKey(newFiles[0]?.key);
    setActiveEditorCode(newFiles[0]?.code || '');
  }, [files]);

  const changeTab = useCallback((key: string) => {
    if (key === activeTabKey) return;
    const file = files.find((file) => file.key === key);
    const newFiles = files.map((file) => {
      if (file.key === activeTabKey) {
        return {
          ...file,
          code: activeEditorCode,
        }
      }
      return file;
    }, []);

    setFiles(newFiles);
    setActiveEditorCode(file?.code || '');
    setActiveTabKey(key);
  }, [activeTabKey, activeEditorCode, files]);

  useEffect(() => {
    if (defaultFiles?.length) {
      setActiveTabKey(defaultFiles[0]?.key);
    }
  }, [defaultFiles]);

  useEffect(() => {
    setFiles(defaultFiles);
    setActiveEditorCode('');
  }, [defaultFiles]);

  return (
    <div className="h-full flex flex-col">
      <Tabs
        tabs={files}
        activeTabKey={activeTabKey}
        setActiveTabKey={changeTab}
        onTabClose={removeTab}
      />
      <div className="bg-[#232323] h-full max-h-[60vh] p-6">
        <Editor
          isDisabled={isDisabled}
          code={activeEditorCode}
          setCode={setActiveEditorCode}
        />
      </div>
    </div>
  );
}

export default IDE;
