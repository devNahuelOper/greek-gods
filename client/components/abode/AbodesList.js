import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_ABODES } = Queries;

const AbodesList = () => {
  return (
    <div className="outer">
      <ul className="abode-list">
        <Query query={FETCH_ABODES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;

            return data.abodes.map(({ id, name, coordinates, gods }) => (
              <li key={id}>
                <Link to={`/abodes/${id}`}>
                  <h4 className="name abode-name">{name}</h4>
                </Link>
                <p>Coordinates: {coordinates || "Unknown"}</p>
                Gods:
                <ul className="gods-list">
                  {[...new Set(gods)].map(({ id, name }) => (
                    <li key={id}>
                      <Link to={`/gods/${id}`}>
                        <h4 className="name god-name">{name}</h4>
                      </Link>
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
