import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;

const EmblemsList = () => {
  return (
    <div className="outer">
      <ul>
        <Query query={FETCH_EMBLEMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;

            return data.emblems.map(({ id, name, gods }) => (
              <li key={id}>
                <Link to={`/emblems/${id}`}>
                  <h4 className="name">{name}</h4>
                </Link>
                <br />
                Gods:
                <ul className="gods-list">
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

export default EmblemsList;
