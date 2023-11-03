export type FileStructureNodeType = 'folder' | 'file';

export interface FileStructureNode {
  id: string;
  title: string;
  type: FileStructureNodeType;
  children?: FileStructureNode[];
}
