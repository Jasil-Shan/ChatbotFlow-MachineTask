import NodesPanel from "../NodesPanel/NodesPanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

const SidePanel = ({ selectedNode , updateNodeLabel }) => {
  return (
    <aside className="border-l-2  md:w-1/4">
      {!selectedNode?.selected ? <NodesPanel /> : <SettingsPanel selectedNode = {selectedNode} updateNodeLabel = {updateNodeLabel}/>}
    </aside>
  );
}; 

export default SidePanel;
