import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";
import EmblemSelect from "./EmblemSelect";
import { ClickAwayListener } from "@material-ui/core";

import Mutations from "../../../graphql/mutations";
const { ADD_GOD_EMBLEM } = Mutations;

class AddEmblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emblems: this.props.emblems || [],
      emblemId: null,
      newEmblem: "",
    };
  }

  fieldUpdate(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  render() {
    const { emblems, emblemId, newEmblem } = this.state;
    const { id } = this.props;

    return (
      <React.Fragment>
      <Mutation mutation={ADD_GOD_EMBLEM}>
        {(addGodEmblem, data) => {
          return (
            <form id="emblemForm" onSubmit={e => {
              e.preventDefault();
              addGodEmblem({
                variables: {
                  godId: id,
                  emblemId
                }
              }).then(newEmblem => this.setState({}))
            }}>
              <EmblemSelect />
            </form>
          )
        }}
      </Mutation>
      </React.Fragment>
    )
  }
}

export default AddEmblem;