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

const EmblemSelect = () => {
  const selectRef = useRef(null);
  console.log(selectRef);

  const onChange = (e) => {
    // console.log(selectRef.current.select.getValue());
    console.log(selectRef.current.getProp("value"));
  }
  return (
    <Query query={FETCH_EMBLEMS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        // console.log(data);
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
              isMulti
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
