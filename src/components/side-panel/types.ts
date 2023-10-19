export type SidePanelProps = {
  nodeName: string;
  setNodeName: React.Dispatch<React.SetStateAction<string | undefined>>;
  isSelected: boolean;
  clearSelectedNode: () => void;
};
