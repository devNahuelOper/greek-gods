import React from "react";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

const EditTools = ({ onClick, title }) => {
  return (
    <div className="edit-tools" onClick={onClick} title={title}>
      <IconContext.Provider value={{ className: "custom-icon" }}>
        <FaPencilAlt />
      </IconContext.Provider>
    </div>
  );
}

export default EditTools;