import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "./EditTools";
import { ClickAwayListener } from "@material-ui/core";

class NameDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name || "",
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
    const { editing, name } = this.state;
    const { id, mutation } = this.props;

    if (editing) {
      return (
        <Mutation mutation={mutation}>
          {(updateName, data) => (
            <ClickAwayListener
              onClickAway={() => this.setState({ editing: false })}
            >
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateName({
                      variables: {
                        id,
                        name,
                      },
                    }).then(() => this.setState({ editing: false }));
                  }}
                >
                  <input
                    className="name-input"
                    value={name}
                    onChange={this.fieldUpdate("name")}
                  />
                  <button className="update-btn" type="submit">
                    Update Name
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
          <h1 className="name">{name}</h1>
          <EditTools onClick={this.handleEdit} title="Edit Name" />
        </div>
      );
    }
  }
}

export default NameDetail;
