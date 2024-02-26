import NodesPanel from "../NodesPanel/NodesPanel";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

const SidePanel = ({ selectedNode , updateNode }) => {
  console.log(selectedNode, "hjsh");

  return (
    <aside className="border-l-2  md:w-1/4">
      {!selectedNode?.selected ? <NodesPanel /> : <SettingsPanel selectedNode = {selectedNode} updateNode = {updateNode}/>}
    </aside>
  );
}; 

export default SidePanel;
