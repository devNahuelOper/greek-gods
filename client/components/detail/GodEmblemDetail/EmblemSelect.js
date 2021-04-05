import React, { useState, useRef } from "react";
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

const EmblemSelect = ({ onChange }) => {
  const selectRef = useRef(null);
  console.log(selectRef);
  window.ref = selectRef;

  return (
    <Query query={FETCH_EMBLEMS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        const options = data.emblems.map((emblem) => ({
          value: emblem.id,
          label: emblem.name,
        }));
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
              ref={selectRef}
              onChange={onChange}
            />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default EmblemSelect;
