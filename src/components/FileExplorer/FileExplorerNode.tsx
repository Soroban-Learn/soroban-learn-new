import type { FileStructureNode, FileStructureNodeType } from "@/types";
import { type FC, useState, useCallback } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/pro-regular-svg-icons";

export interface FileExplorerFolderProps {
  id: string;
  title: string;
  type: FileStructureNodeType;
  nodes?: FileStructureNode[];
  nestedIndex: number;
  selectedFileId?: string;
  setSelectedFileId: (fileId: string) => void;
}

const FileExplorerNode: FC<FileExplorerFolderProps> = ({
  id,
  title,
  type,
  nodes = [],
  nestedIndex,
  selectedFileId,
  setSelectedFileId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      setSelectedFileId(id);
    }
  }, [id, type, isOpen, setSelectedFileId]);

  return (
    <div className={cx('cursor-pointer', {
      'mt-2.5': type === 'file',
      'mt-4': type === 'folder',
    })}>
      <div
        className={cx(
          'h-[25px] flex justify-start items-center text-xs',
          'border-l-4 border-solid',
          'transition-all duration-300 ease-linear',
          'rounded-r-md',
          {
            'border-transparent': selectedFileId !== id,
            'bg-black border-primary': selectedFileId === id,
          }
        )}
        style={{
          paddingLeft: `${nestedIndex * 1}rem`,
        }}
        onClick={handleClick}
      >
        {type === "folder" && (
          <FontAwesomeIcon
            icon={faCaretDown}
            className={cx(
              'transition-all duration-200 ease-in-out',
              {
                'rotate-180': !isOpen,
                'rotate-0': isOpen,
              }
            )}
          />
        )}
        {type === "file" && (
          <FontAwesomeIcon icon={faFile} />
        )}
        <div className="ml-3">{title}</div>
      </div>
      {!!nodes?.length && (
        <div
          className={cx(
            'grid grid-rows-[0fr] ease-in-out transition-all duration-500',
            {
              'grid-rows-[1fr]': isOpen,
            },
          )}
        >
          <div className="overflow-hidden">
            {nodes?.map((node) => (
              <FileExplorerNode
                key={node.id}
                id={node.id}
                title={node.title}
                type={node.type}
                nodes={node.children}
                nestedIndex={nestedIndex + 1}
                selectedFileId={selectedFileId}
                setSelectedFileId={setSelectedFileId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileExplorerNode;
