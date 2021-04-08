import React from "react";
import { Link } from "react-router-dom";

const Relatives = ({ relativeType, tag }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Relatives;
