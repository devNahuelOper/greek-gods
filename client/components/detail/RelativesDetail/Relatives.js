import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTools from "../EditTools";
import { ClickAwayListener } from "@material-ui/core";
import RemoveRelative from "./RemoveRelative";

const Relatives = ({ godId, relativeType, tag }) => {
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [relatives, setRelatives] = useState(relativeType);
  const handleRemoveRelative = (updatedRelatives) => setRelatives(updatedRelatives);

  const handleAdd = () => setAdding(true);
  const handleDelete = () => setDeleting(true);

  const title = tag.replace(/s$|ren$/, "");
  const relationship = title.toLowerCase();

  return (
    <ClickAwayListener onClickAway={() => setDeleting(false)}>
      <div className="relative-group">
        {relatives.length ? (
          <ul>
            {tag}:
            {relatives.map(({ id, name }) => (
              <li key={id}>
                <Link to={`/gods/${id}`}>
                  <h4 className={`name ${name}`}>{name}</h4>
                </Link>
                {deleting && (
                  <RemoveRelative
                    godId={godId}
                    relativeId={id}
                    relationship={relationship}
                    relatives={relatives}
                    title={`Remove ${name}`}
                    handleRemoveRelative={handleRemoveRelative}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <h4>
            {tag}: <br /> None
          </h4>
        )}
        <EditTools onClick={handleAdd} title={`Add ${title}`} icon="plus" />
        {Boolean(relatives.length) && (
          <EditTools
            onClick={handleDelete}
            title={`Remove ${title}`}
            icon="minus"
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Relatives;
