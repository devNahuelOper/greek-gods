import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import NameDetail from "../detail/NameDetail";

import Queries from "../../graphql/queries";
const { FETCH_EMBLEM } = Queries;

import Mutations from "../../graphql/mutations";
const { UPDATE_EMBLEM_NAME } = Mutations;

const EmblemDetail = props => {
  return (
    <Query query={FETCH_EMBLEM} variables={{ id: props.match.params.emblemId }}>
      {({ loading, error, data }) => {
         if (loading) return <p>Loading...</p>;
         if (error) return <p>{error}</p>;

         const { id, name, gods } = data.emblem;

         return (
           <div className="detail emblem-detail">
             <NameDetail id={id} name={name} mutation={UPDATE_EMBLEM_NAME}/>
             <br />
             Gods: 
             <ul className="gods-list emblem-gods">
                {gods.map(god => 
                <li key={god.id}>
                  <Link to={`/gods/${god.id}`}>
                    <h4 className="name god-name">{god.name}</h4>
                  </Link>
                </li>
                  )}
             </ul>
           </div>
         )
      }}
    </Query>
  )
}

export default EmblemDetail;