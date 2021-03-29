import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Queries from "../../graphql/queries";
const { FETCH_GOD } = Queries;

const GodDetail = (props) => {
  return (
    <Query query={FETCH_GOD} variables={{ id: props.match.params.godId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        const {
          id,
          name,
          description,
          domains,
          abode,
          emblems,
          parents,
          children,
          siblings,
        } = data.god;
        return (
          data && (
            <div className="detail">
              <h1 className="name">{name}</h1>
              <p>{description}</p>
              <h3 className="god-abode">
                Abode:
                <Link to={`/abodes/${abode.id}`}>  {abode.name}</Link>
              </h3>
              <ul className="domains">
                <h3>Domains:</h3>
                {domains.map((domain) => (
                  <li key={domain}>{domain}</li>
                ))}
              </ul>
              <ul className="god-emblems">
                <h3>Emblems:</h3>
                {emblems.map(({ id, name }) => (
                  <li key={id}>
                    <Link to={`/emblems/${id}`}>
                      <h4 className="name">{name}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        );
      }}
    </Query>
  );
};

export default GodDetail;
