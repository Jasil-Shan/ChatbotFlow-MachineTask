import React, { useState } from "react";

const SettingsPanel = ({ selectedNode, handleEdit, handleBack }) => {
  const handleChange = (e) => {
    const newText = e.target.value;
    handleEdit(newText);
  };

  return (
    <div className="flex flex-col border-b">
      <div className="h-10 font-semibold border-b flex justify-between w-full px-4 items-center">
        <button onClick={ handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="">Message</span>
        <div></div>
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
