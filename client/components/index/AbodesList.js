import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_ABODES } = Queries;

const AbodesList = () => {
  return (
    <div className="outer">
      <ul>
        <Query query={FETCH_ABODES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;

            return data.abodes.map(({ id, name, coordinates, gods }) => (
              <li key={id}>
                <Link to={`/abodes/${id}`}>
                  <h4 className="name">{name}</h4>
                </Link>
                <p>Coordinates: {coordinates || "Unknown"}</p>
                Gods:
                <ul className="abode-gods">
                  {gods.map(({ id, name }) => (
                    <li key={id}>
                      <Link to={`/gods/${id}`}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default AbodesList;
