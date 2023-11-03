"use client";
import type { FileStructureNode } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// Components
import IDE from "@/components/IDE";
import Terminal from "@/components/terminal";
import Header from "@/components/Header";
import Sidebar from "@/containers/exercise/Sidebar";

// Queries
import { useGetExercise } from "@/api/queries";

// Store
import {
  currentLessonState,
  fileStructureState,
  selectedFileIdState,
} from "@/store";

// Learn Content
import helloWorld from "@/learningMaterial/helloWorld.json";
import { useParams } from "next/navigation";
import { useLessonContext } from "@/hooks/useLessonContext";

export default function Home() {
  const { activeEditorCode, setActiveEditorCode, stepType } =
    useLessonContext();

  const [selectedFileId, setSelectedFileId] =
    useRecoilState(selectedFileIdState);

  const fileStructure = useRecoilValue(fileStructureState);

  const setLessonContent = useSetRecoilState(currentLessonState);

  const [files, setFiles] = useState<FileStructureNode[]>([]);

  // Get all files from file structure
  const getFiles = useCallback(
    (node: FileStructureNode): FileStructureNode[] => {
      const files: FileStructureNode[] = [];
      if (node.children?.length) {
        node.children.forEach((node) => {
          if (node.type === "file") {
            files.push(node);
          } else if (node.type === "folder" && node.children?.length) {
            files.push(...getFiles(node));
          }
        });
      }
      return files;
    },
    []
  );

  useEffect(() => {
    const allFiles: FileStructureNode[] = [];
    fileStructure.forEach((node) => {
      if (node.type === "file") {
        allFiles.push(node);
      } else if (node.type === "folder" && node.children?.length) {
        allFiles.push(...getFiles(node));
      }
    });
    setFiles(allFiles);
  }, [fileStructure, getFiles]);

  const params = useParams();

  const { data, error, isError, isLoading } = useGetExercise(params?.slug);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex gap-4 h-main">
        <Sidebar exerciseData={data} />
        <div className="w-full flex flex-col gap-4">
          <IDE
            isDisabled={stepType === "terminal"}
            defaultFiles={files}
            activeEditorCode={activeEditorCode}
            activeFileId={selectedFileId}
            setActiveFileId={setSelectedFileId}
            setActiveEditorCode={setActiveEditorCode}
          />
          <Terminal />
        </div>
      </div>
    </div>
  );
}
