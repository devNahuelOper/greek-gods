import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";
import Domains from "./Domains";

import Mutations from "../../../graphql/mutations";
const { ADD_GOD_DOMAIN } = Mutations;

class AddDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      domains: this.props.domains || [],
      newDomain: "",
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

  handleSubmit(e, addGodDomain) {
    e.preventDefault();
    let { newDomain, domains } = this.state;
    if (!newDomain.trim()) {
      this.setState({ editing: false });
      return;
    }

    addGodDomain({
      variables: {
        godId: this.props.id,
        domain: newDomain,
      },
    }).then(() =>
      this.setState({ editing: false, domains: [...domains, newDomain] })
    );
  }

  render() {
    const { editing, domains, newDomain } = this.state;
    const { id } = this.props;

    if (editing) {
      return (
        <Mutation mutation={ADD_GOD_DOMAIN}>
          {(addGodDomain, data) => (
            <Domains domains={domains}>
              <form onSubmit={(e) => this.handleSubmit(e, addGodDomain)}>
                <input
                  className="name-input"
                  value={newDomain}
                  placeholder="Type domain name"
                  onChange={this.fieldUpdate("newDomain")}
                />
                <button className="update-btn" type="submit">
                  Add Domain
                </button>
              </form>
            </Domains>
          )}
        </Mutation>
      );
    } else {
      return (
        <>
          <Domains domains={domains} />
          <EditTools onClick={this.handleEdit} title="Add Domain" icon="plus" />
        </>
      );
    }
  }
}

export default AddDomain;
