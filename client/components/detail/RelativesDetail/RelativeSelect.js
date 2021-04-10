import React, { useRef } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Select from "react-select";
import _ from "lodash";

const FETCH_GODS = gql`
  query FetchGods {
    gods {
      id
      name
    }
  }
`;

const RelativeSelect = ({ godId, relatives, relationship, onChange }) => {
  const relativeRef = useRef(null);
  
  const clearSelection = () => {
    try {
      setTimeout(() => relativeRef.current.select.setValue(""), 0);
    } catch {
      return;
    }
  }

  return (
    <Query query={FETCH_GODS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        const gods = _.pullAllBy(data.gods, relatives, "id").filter(
          (god) => god.id != godId
        );

        const options = gods.map((god) => ({
          value: god.id,
          label: god.name,
        }));

        return (
          <React.Fragment>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isLoading={loading}
              isClearable
              isSearchable
              placeholder={`Select ${relationship} to add...`}
              options={options}
              ref={relativeRef}
              onChange={onChange}
            />
            <button className="update-btn" type="submit" onClick={clearSelection}>
              Add {relationship}
            </button>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default RelativeSelect;
