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

        const family = [parents, children, siblings];
        const famStrings = ["Parents", "Children", "Siblings"];
        return (
          data.god && (
            <div className="detail">
              <h1 className="name">{name}</h1>
              <p>{description}</p>
              <h3 className="god-abode">
                Abode:
                {Boolean(abode) ? (
                  <Link to={`/abodes/${abode.id}`}> {abode.name}</Link>
                ) : (
                  " Unknown"
                )}
              </h3>
              <ul className="domains">
                <h3>Domains:</h3>
                {domains.length ? (
                  domains.map((domain) => <li key={domain}>{domain}</li>)
                ) : (
                  <h4>&nbsp; None</h4>
                )}
              </ul>
              <ul className="god-emblems">
                <h3>Emblems: </h3>
                {emblems.length ? (
                  emblems.map(({ id, name }) => (
                    <li key={id}>
                      <Link to={`/emblems/${id}`}>
                        <h4 className="name">{name}</h4>
                      </Link>
                    </li>
                  ))
                ) : (
                  <h4 key="no-emblem">&nbsp; None</h4>
                )}
              </ul>
              <h2 id="relatives-label">Relatives: </h2>
              <section className="god-family">
                {family.map((famgroup, i) =>
                  Boolean(famgroup.length) ? (
                    <ul key={i}>
                      {famStrings[i]}:
                      {famgroup.map((relative) => (
                        <li key={relative.id}>
                          <Link to={`/gods/${relative.id}`}>
                            <h4>{relative.name}</h4>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <h4 key={`none${i}`}>
                      {" "}
                      {famStrings[i]}: <br /> None
                    </h4>
                  )
                )}
              </section>
            </div>
          )
        );
      }}
    </Query>
  );
};

export default GodDetail;