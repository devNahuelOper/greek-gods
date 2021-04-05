import React from "react";
import { Link } from "react-router-dom";

const Emblems = ({ emblems }) => {
  return (
    <ul className="god-emblems">
      {emblems.length ? (
        emblems.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/emblems/${id}`}>
              <h4 className="name">{name}</h4>
            </Link>
          </li>
        ))
      ) : (
        <h4 key="no-emblem">&nbsp; None</h4>
      )}
    </ul>
  );
};

export default Emblems;
