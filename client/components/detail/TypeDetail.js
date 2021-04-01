import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "./EditTools";
import { ClickAwayListener } from "@material-ui/core";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_TYPE } = Mutations;

class TypeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      type: this.props.type || "",
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  render() {
    const { editing, type } = this.state;
    const { id } = this.props;

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_TYPE}>
          {(updateGodType, data) => (
            <ClickAwayListener onClickAway={() => this.setState({ editing: false })}>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateGodType({
                      variables: {
                        id,
                        type,
                      },
                    }).then(() => this.setState({ editing: false }));
                  }}
                >
                  <label htmlFor="god">
                    God
                    <input
                      type="radio"
                      id="god"
                      name="godtype"
                      value="god"
                      checked={type === "god"}
                      onChange={this.fieldUpdate("type")}
                    />
                  </label>
                  <label>
                    Goddess
                    <input
                      type="radio"
                      id="goddess"
                      name="godtype"
                      value="goddess"
                      checked={type === "goddess"}
                      onChange={this.fieldUpdate("type")}
                    />
                  </label>
                  <button className="update-btn" type="submit">
                    Update Type
                  </button>
                </form>
              </div>
            </ClickAwayListener>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <em>{type}</em>
          <EditTools onClick={this.handleEdit} title="Edit Type" />
        </div>
      );
    }
  }
}

export default TypeDetail;
