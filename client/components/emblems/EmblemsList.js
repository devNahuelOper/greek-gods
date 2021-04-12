import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import DeleteEmblem from "./DeleteEmblem";

import Queries from "../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;

const EmblemsList = () => {
  return (
    <div className="outer emblem-index">
      <ul className="emblems-list">
        <Query query={FETCH_EMBLEMS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error}</p>;

            const emblems = _.sortBy(data.emblems, (emblem) => emblem.name);
            
            return emblems.map(({ id, name, gods }) => (
              <li key={id}>
                <Link to={`/emblems/${id}`}>
                  <h3 className="name emblem-name">{name}</h3>
                </Link>
                <br />
                Gods:
                <ul className="gods-list">
                  {gods.map(({ id, name }) => (
                    <li key={id}>
                      <Link to={`/gods/${id}`}>
                        <h4 className="name god-name">{name}</h4>
                      </Link>
                    </li>
                  ))}
                </ul>
                <DeleteEmblem id={id}/>
              </li>
            ));
          }}
        </Query>
      </ul>
    </div>
  );
};

export default EmblemsList;
