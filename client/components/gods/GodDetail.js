import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import NameDetail from "../detail/NameDetail";
import TypeDetail from "../detail/TypeDetail";
import DescriptionDetail from "../detail/DescriptionDetail";
import EditDomain from "../detail/DomainsDetail/EditDomain";
import GodAbodeDetail from "../detail/GodAbodeDetail/GodAbodeDetail";
import EditEmblem from "../detail/GodEmblemDetail/EditEmblem";
import Relatives from "../detail/RelativesDetail/Relatives";

import Queries from "../../graphql/queries";
const { FETCH_GOD } = Queries;

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_NAME } = Mutations;

const GodDetail = (props) => {
  return (
    <Query query={FETCH_GOD} variables={{ id: props.match.params.godId }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        const {
          id,
          name,
          type,
          description,
          domains,
          abode,
          emblems,
          parents,
          children,
          siblings,
        } = data.god;

        return (
          data.god && (
            <div className="detail">
              <NameDetail id={id} name={name} mutation={UPDATE_GOD_NAME} />
              <br />
              <TypeDetail id={id} type={type} />
              <DescriptionDetail id={id} description={description} />
              <GodAbodeDetail id={id} abode={abode || ""} />
              <div id="domain-wrap">
                <h3>Domains:</h3>
                <EditDomain id={id} domains={domains} />
              </div>
              <EditEmblem id={id} emblems={emblems} />
              <h2 id="relatives-label">Relatives: </h2>
              <section className="god-family">
                <Relatives relativeType={parents} tag="Parents" />
                <Relatives relativeType={children} tag="Children" />
                <Relatives relativeType={siblings} tag="Siblings" />
              </section>
            </div>
          )
        );
      }}
    </Query>
  );
};

export default GodDetail;
