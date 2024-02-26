import React from "react";
import { NavbarProps } from "../types";

const SaveButton = ({ saveEditedNode }: NavbarProps) => {
  return (
    <button
      onClick={saveEditedNode}
      className="border-2 rounded-md border-blue-900 bg-slate-200 px-5 py-1 mr-16 font-semibold"
    >
      Save Changes
    </button>
  );
};

export default SaveButton;
