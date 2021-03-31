import React from "react";
import { IconContext } from "react-icons";
import { FaPencilAlt, FaPlus } from "react-icons/fa";

const EditTools = ({ onClick, title, icon = "pencil" }) => {
  return (
    <div className="edit-tools" onClick={onClick} title={title}>
      <IconContext.Provider value={{ className: `custom-icon ${icon}` }}>
        {icon == "pencil" && <FaPencilAlt />}
        {icon == "plus" && <FaPlus />}
      </IconContext.Provider>
    </div>
  );
};

export default EditTools;
