import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTools from "../EditTools";
import { ClickAwayListener } from "@material-ui/core";

const Relatives = ({ relativeType, tag }) => {
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => setAdding(true);
  const handleDelete = () => setDeleting(true);

  const title = tag.replace(/s$|ren$/, "");
  return (
    <ClickAwayListener onClickAway={() => setDeleting(false)}>
      <div className="relative-group">
        {relativeType.length ? (
          <ul>
            {tag}:
            {relativeType.map(({ id, name }) => (
              <li key={id}>
                <Link to={`/gods/${id}`}>
                  <h4 className={`name ${name}`}>{name}</h4>
                </Link>
                {deleting && (
                  <EditTools
                    onClick={(e) => console.log(e.target)}
                    title={`Remove ${name}`}
                    icon="x"
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
        {Boolean(relativeType.length) && (
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
