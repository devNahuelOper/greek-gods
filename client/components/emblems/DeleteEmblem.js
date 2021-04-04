import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { DELETE_EMBLEM } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;

const linkStyle = {
  cursor: "pointer",
  fontSize: "10px",
  color: "red",
  display: "inline-block",
};

const DeleteEmblem = (props) => {
  return (
    <Mutation
      mutation={DELETE_EMBLEM}
      refetchQueries={() => {
        return [
          {
            query: FETCH_EMBLEMS,
          },
        ];
      }}
    >
      {(deleteEmblem, { data }) => (
        <a
          style={linkStyle}
          onClick={(e) => {
            e.preventDefault();
            deleteEmblem({ variables: { id: props.id } });
          }}
        >
          <p>Delete</p>
        </a>
      )}
    </Mutation>
  );
};

export default DeleteEmblem;