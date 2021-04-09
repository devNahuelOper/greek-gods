import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTools from "../EditTools";

const Relatives = ({ relativeType, tag }) => {
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => setAdding(true);
  const handleDelete = () => setDeleting(true);

  const title = tag.replace(/s$|ren$/, "");
  return (
    <div className="relative-group">
      {relativeType.length ? (
        <ul>
          {tag}:
          {relativeType.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/gods/${id}`}>
                <h4 className={`name ${name}`}>{name}</h4>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h4>
          {tag}: <br /> None
        </h4>
      )}
      <EditTools onClick={handleAdd} title={`Add ${title}`} icon="plus"/>
      <EditTools onClick={handleDelete} title={`Remove ${title}`} icon="minus"/>
    </div>
  );
};

export default Relatives;
