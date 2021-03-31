import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import NameDetail from "../detail/NameDetail";

import Queries from "../../graphql/queries";
const { FETCH_ABODE } = Queries;

import Mutations from "../../graphql/mutations";
const { UPDATE_ABODE_NAME } = Mutations;

const AbodeDetail = (props) => {
  return (
    <Query query={FETCH_ABODE} variables={{ id: props.match.params.abodeId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        const { id, name, coordinates, gods } = data.abode;

        return (
          <div className="detail abode-detail">
            <NameDetail id={id} name={name} mutation={UPDATE_ABODE_NAME}/>
            <br />
            <h4>Coordinates: {coordinates}</h4>
            <ul className="abode-gods">Gods:
              {gods.map((god) => (
                <li key={god.id}>
                  <Link to={`/gods/${god.id}`}>
                    <h3 className="name">{god.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default AbodeDetail;
