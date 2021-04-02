import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {
  Select,
  MenuItem,
  InputLabel,
  ClickAwayListener,
} from "@material-ui/core";

const FETCH_ABODES = gql`
  query FetchAbodes {
    abodes {
      id
      name
    }
  }
`;

const Abodes = ({ abode, abodeId, onChange }) => {
  console.log(abode);
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <Query query={FETCH_ABODES}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <InputLabel id="label">Select Abode</InputLabel>
              <Select
                labelId="label"
                id="select"
                value={abodeId}
                onOpen={handleOpen}
                onClose={handleClose}
                onChange={onChange}
              >
                {data.abodes.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </ClickAwayListener>
        );
      }}
    </Query>
  );
};

export default Abodes;
