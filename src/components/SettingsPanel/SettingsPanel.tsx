import React, { useState } from "react";

const SettingsPanel = ({ selectedNode, updateNodeLabel }) => {

  const handleChange = (e) => {
    const newText = e.target.value;
    updateNodeLabel(newText);
  };

  return (
    <div className="flex flex-col border-b">
      <div className="h-10 font-semibold border-b flex justify-center items-center">
        <button onClick={() => (selectedNode.selected = false)}>back</button>
        <span>Message</span>
      </div>
      <div className="h-40 flex flex-col">
        <span className="text-gray-600 p-2">Text</span>
        <textarea
          onChange={handleChange}
          defaultValue={selectedNode.data.label}
          className="m-5 border-2 p-2"
          name="text"
          id="text"
        ></textarea>
      </div>
    </div>
  );
};

export default SettingsPanel;
