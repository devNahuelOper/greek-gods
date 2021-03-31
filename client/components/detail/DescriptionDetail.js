import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "./EditTools";

import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_DESCRIPTION } = Mutations;

class DescriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      description: this.props.description || "",
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
    const { editing, description } = this.state;
    const { id } = this.props;

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_DESCRIPTION}>
          {(updateGodDescription, data) => (
            <div id="description-update">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateGodDescription({
                    variables: {
                      id,
                      description,
                    },
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <textarea
                  value={description}
                  onChange={this.fieldUpdate("description")}
                  placeholder="Description"
                />
                <button className="update-btn" type="submit">
                  Update Description
                </button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div id="description">
          <p>{description}</p>
          <EditTools onClick={this.handleEdit} title="Edit Description"/>
        </div>
      )
    }
  }
}

export default DescriptionDetail;