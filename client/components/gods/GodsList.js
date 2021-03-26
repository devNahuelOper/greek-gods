import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_GODS } = Queries;

const GodsList = () => {
  return (
    <div className="outer">
      <ul>
        <Query query={FETCH_GODS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return data.gods.map(({ id, name, description }) => (
              <li key={id}>
                <Link to={`/gods/${id}`}>
                  <h4 className="name">{name}</h4>
                </Link>
                <p className="description">Description: {description}</p>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default GodsList;
