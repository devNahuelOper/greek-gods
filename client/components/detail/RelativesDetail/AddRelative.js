import React from "react";
import { Mutation } from "react-apollo";
import { ClickAwayListener } from "@material-ui/core";
import RelativeSelect from "./RelativeSelect";

import Mutations from "../../../graphql/mutations";
const { ADD_GOD_RELATIVE } = Mutations;

class AddRelative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatives: this.props.relatives || [],
      relativeId: null,
    };
  }

  fieldUpdate(field) {
    return (e) => this.setState({ [field]: e.value });
  }

  addRelative(e, addGodRelative) {
    e.preventDefault();

    const { godId, relationship, tag, handleAddRelative } = this.props;
    const { relativeId } = this.state;

    if (!relativeId) return;

    addGodRelative({
      variables: {
        godId,
        relativeId,
        relationship,
      },
    }).then((god) => {
      let newRelatives = god.data.addGodRelative[`${tag}`];
      console.log(newRelatives);
      handleAddRelative(newRelatives);
    });
  }

  render() {
    const { godId, relationship, clickAway } = this.props;
    const { relatives } = this.state;

    return (
      <ClickAwayListener onClickAway={clickAway}>
        <div className="add-relative">
          <Mutation mutation={ADD_GOD_RELATIVE}>
            {(addGodRelative, data) => {
              return (
                <form
                  id="relativeForm"
                  onSubmit={(e) => this.addRelative(e, addGodRelative)}
                >
                  <RelativeSelect
                    godId={godId}
                    relatives={relatives}
                    relationship={relationship}
                    onChange={this.fieldUpdate("relativeId")}
                  />
                </form>
              );
            }}
          </Mutation>
        </div>
      </ClickAwayListener>
    );
  }
}

export default AddRelative;
