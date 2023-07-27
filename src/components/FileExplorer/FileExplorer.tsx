import type { FC } from "react";
import type { FileStructureNode } from "@/types";
import cx from "classnames";

// Components
import Scrollbar from "@/components/common/Scrollbar";
import FileExplorerNode from "./FileExplorerNode";

interface FileExplorerProps {
  nodes: FileStructureNode[];
  selectedFileId?: string;
  setSelectedFileId: (fileId: string) => void;
}

const FileExplorer: FC<FileExplorerProps> = ({
  nodes,
  selectedFileId,
  setSelectedFileId,
}) => {
  return (
    <div className="h-[300px] pb-12 bg-dark-gray">
      <div className={cx(
        'flex justify-start items-center h-[50px] px-5',
        'border-b border-solid border-black font-bold',
      )}>
        File Explorer
      </div>
      <div className="pt-4 pb-6 pr-3">
        <div className="h-52">
          <Scrollbar>
            <div className="pr-4">
              {nodes.map((node) => (
                <FileExplorerNode
                  key={node.id}
                  id={node.id}
                  title={node.title}
                  type={node.type}
                  nodes={node.children}
                  nestedIndex={1}
                  selectedFileId={selectedFileId}
                  setSelectedFileId={setSelectedFileId}
                />
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
