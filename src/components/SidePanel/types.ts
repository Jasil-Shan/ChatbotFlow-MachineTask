import { Node } from "reactflow";

//Types common for Sidepanel and SettingPanel

export type NodeData = {
  label: string;
  selected?: boolean;
};

export type CustomNode = Node<NodeData>;

export type SidePanelProps = {
  selectedNode: CustomNode | null;
  handleEdit: (newText: string) => void;
  handleBack?: () => void;
}
