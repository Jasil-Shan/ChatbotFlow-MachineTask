import React from "react";

const SettingsPanel = ({selectedNode, updateNode}) => {
  return (
    <div className="flex flex-col border-b">
      <div className="h-10 font-semibold border-b flex justify-center items-center">
        <button onClick={()=>selectedNode.selected = false}>back</button>
        <span>Message</span>
      </div>
      <div className="h-40 flex flex-col">
        <span className="text-gray-600 p-2">Text</span>
        <textarea onChange={(e)=> updateNode(e.target.value)} value = {selectedNode.data.label} className="m-5 border-2 p-2" name="text" id="">
          
        </textarea>
      </div>
    </div>
  );
};

export default SettingsPanel;
