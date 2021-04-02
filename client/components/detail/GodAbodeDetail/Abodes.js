import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {
  Select,
  MenuItem,
  InputLabel,
  ClickAwayListener,
} from "@material-ui/core";

// import Queries from "../../../graphql/queries";
// const { FETCH_ABODES } = Queries;

const FETCH_ABODES = gql`
  query FetchAbodes {
    abodes {
      id
      name
    }
  }
`;

const Abodes = ({ abode, onChange }) => {
  // console.log(abode);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Query query={FETCH_ABODES}>
      {({loading, error, data}) => {
        // console.log(data);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <InputLabel id="label">Abode</InputLabel>
              <Select
                labelId="label"
                id="select"
                defaultValue={abode.name}
                onOpen={handleOpen}
                onClose={handleClose}
                onChange={onChange}
              >
                {data.abodes.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
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
