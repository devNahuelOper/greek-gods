import React from "react";
import { IconContext } from "react-icons";
import { FaPencilAlt, FaPlus, FaMinus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const EditTools = ({ onClick, title, icon = "pencil" }) => {
  return (
    <div className="edit-tools" onClick={onClick} title={title}>
      <IconContext.Provider value={{ className: `custom-icon ${icon}` }}>
        {icon == "pencil" && <FaPencilAlt />}
        {icon == "plus" && <FaPlus />}
        {icon == "minus" && <FaMinus />}
        {icon == "x" && <TiDelete />}
      </IconContext.Provider>
    </div>
  );
};

export default EditTools;
