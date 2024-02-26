import { useEffect, useState } from "react";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import NodesPanel from "../NodesPanel/pages/NodesPanel";
import { SidePanelProps } from "../types";


const SidePanel = ({ selectedNode, handleEdit }: SidePanelProps) => {
  const [selected, setSelected] = useState(false);

  const handleBack = () => {
    setSelected(false);
  };

  useEffect(() => {
    if (selectedNode) {
      setSelected(selectedNode.selected || false);
    }
  }, [selectedNode]);

  return (
    <aside className="border-l-2  md:w-1/4">
      {selected && selected ? (
        <SettingsPanel
          key={selectedNode?.id}
          selectedNode={selectedNode}
          handleEdit={handleEdit}
          handleBack={handleBack}
        />
      ) : (
        <NodesPanel />
      )}
    </aside>
  );
};

export default SidePanel;
