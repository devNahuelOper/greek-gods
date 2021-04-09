import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTools from "../EditTools";
import { ClickAwayListener } from "@material-ui/core";
import RemoveRelative from "./RemoveRelative";
import AddRelative from "./AddRelative";

const Relatives = ({ godId, relativeType, tag }) => {
  const [adding, setAdding] = useState(false);
  const handleAdd = () => setAdding(true);

  const [deleting, setDeleting] = useState(false);
  const handleDelete = () => setDeleting(true);

  const [relatives, setRelatives] = useState(relativeType);
  const handleUpdateRelatives = (updatedRelatives) =>
    setRelatives(updatedRelatives);

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
                    handleRemoveRelative={handleUpdateRelatives}
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

        {adding && (
          <AddRelative
            godId={godId}
            relationship={relationship}
            relatives={relatives}
            tag={tag.toLowerCase()}
            handleAddRelative={handleUpdateRelatives}
            clickAway={() => setAdding(false)}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Relatives;
