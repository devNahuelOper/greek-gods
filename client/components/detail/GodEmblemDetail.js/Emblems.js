import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Select from "react-select";

const FETCH_EMBLEMS = gql`
  query FetchEmblems {
    emblems {
      id
      name
    }
  }
`;

const Emblems = () => {
  // console.log(emblem, emblemId);

  return (
    <Query query={FETCH_EMBLEMS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        // console.log(data);
        const options = data.emblems.map(emblem => ({ value: emblem.id, label: emblem.name }));
        return (
          <React.Fragment>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isLoading={loading}
              isClearable
              isSearchable
              placeholder="Select Emblem to add..."
              options={options}
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Emblems;
