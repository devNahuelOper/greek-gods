import React from "react";
import { Link } from "react-router-dom";

const Emblems = ({ emblems, children, listChildren = false }) => {
  // console.log(
  //   React.Children.map(children, (child, index) => React.cloneElement(child, { emblemId: index}))
  // );
  return (
    <ul className="god-emblems">
      <h3>Emblems: </h3>
      {emblems.length ? (
        emblems.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/emblems/${id}`}>
              <h4 className="name">{name}</h4>
            </Link>
            {listChildren &&
              React.Children.map(children, (child) =>
                React.cloneElement(child, { emblemId: id })
              )}
          </li>
        ))
      ) : (
        <h4 key="no-emblem">&nbsp; None</h4>
      )}
    </ul>
  );
};

export default Emblems;
