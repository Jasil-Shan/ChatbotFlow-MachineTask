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
    // this will allow horizontal scrolling when adding more settings or Node types
    <aside className="border-l-2 overflow-y-auto md:w-1/4">
      {selected && selected ? (
        //conditionally rendering panels when selecting nodes
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
