import type { FileStructureNode } from "@/types";
import React, { useCallback, useMemo, useState, useEffect } from "react";

// Components
import Tabs from '@/components/common/Tabs';
import Editor from "./Editor";

// Hooks
import { usePrevious } from "@/hooks";

interface FileNode extends FileStructureNode {
  code?: string;
}

interface IDEProps {
  isDisabled: boolean;
  defaultFiles: FileStructureNode[];
  activeEditorCode: string;
  activeFileId: string;
  setActiveFileId: (id: string) => void;
  setActiveEditorCode: (value: string) => void;
}

function IDE({
  isDisabled,
  defaultFiles,
  activeEditorCode,
  activeFileId,
  setActiveFileId,
  setActiveEditorCode,
}: IDEProps) {
  const [files, setFiles] = useState<FileNode[]>([]);

  const previousFileId = usePrevious(activeFileId);

  const removeTab = useCallback((key: string) => {
    const newFiles = files.filter((file: FileNode) => file.id !== key);
    setActiveEditorCode('');
    setFiles(newFiles);
    setActiveFileId(newFiles[0]?.id);
  }, [files, setActiveFileId, setActiveEditorCode]);

  const changeTab = useCallback((key: string) => {
    if (key === activeFileId) return;
    setActiveFileId(key);
  }, [activeFileId, setActiveFileId]);

  const tabs = useMemo(() => {
    return files.map((file) => ({
      ...file,
      key: file.id,
    }))
  }, [files]);

  useEffect(() => {
    if (defaultFiles?.length) {
      setActiveFileId(defaultFiles[0]?.id);
    }
  }, [defaultFiles, setActiveFileId]);

  useEffect(() => {
    setFiles(defaultFiles);
    setActiveEditorCode('');
  }, [defaultFiles, setActiveEditorCode]);

  useEffect(() => {
    // Save current code state and load new on selected file change
    if (previousFileId && previousFileId !== activeFileId) {
      const file = files.find((file) => file.id === activeFileId);
      const newFiles = files.map((file) => {
        if (file.id === previousFileId) {
          return {
            ...file,
            code: activeEditorCode,
          }
        }
        return file;
      }, []);
      setFiles(newFiles);
      setActiveEditorCode(file?.code || '');
    }
  }, [
    files,
    activeFileId,
    previousFileId,
    activeEditorCode,
    setActiveEditorCode,
  ]);

  return (
    <div className="h-full flex flex-col">
      <Tabs
        tabs={tabs}
        activeTabKey={activeFileId}
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
