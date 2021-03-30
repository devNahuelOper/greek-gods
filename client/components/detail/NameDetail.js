import React from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_NAME } = Mutations;

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
    const { id } = this.props;

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_NAME}>
          {(updateGodName, data) => (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateGodName({
                    variables: {
                      id,
                      name
                    },
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <input value={name} onChange={this.fieldUpdate("name")} />
                <button type="submit">Update Name</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <h1 className="name">{name}</h1>
          <div className="edit-tools" onClick={this.handleEdit}>
            <IconContext.Provider
              value={{ className: "custom-icon" }}
            >
              <FaPencilAlt />
            </IconContext.Provider>
          </div>
        </div>
      );
    }

  }
}

export default NameDetail;
