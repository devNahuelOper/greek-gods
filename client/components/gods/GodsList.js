import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
import DeleteGod from "./DeleteGod";
const { FETCH_GODS } = Queries;

const GodsList = () => {
  return (
    <div className="outer">
      <ul className="god-index">
        <Query query={FETCH_GODS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return data.gods.map(({ id, name, description }) => (
              <li key={id}>
                <Link to={`/gods/${id}`}>
                  <h1 className={`name ${name}`}>{name}</h1>
                </Link>
                <p className="description">
                  <strong>Description</strong>: {description}
                </p>
                <DeleteGod id={id} />
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default GodsList;
