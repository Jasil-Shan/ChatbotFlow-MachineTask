import SaveButton from "../SaveButton/SaveButton";
import { NavbarProps } from "../types";


const Navbar = ({ saveEditedNode } :NavbarProps) => {
  return (
    <div className="flex h-fit bg-gray-300 p-1 rounded-md justify-end">
      <SaveButton saveEditedNode={saveEditedNode} />
    </div>
  );
};

export default Navbar;
