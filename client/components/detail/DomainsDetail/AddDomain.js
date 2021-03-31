import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";
import Domains from "./Domains";
import { ClickAwayListener } from "@material-ui/core";

import Mutations from "../../../graphql/mutations";
const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = Mutations;

class EditDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      deleting: false,
      domains: this.props.domains || [],
      newDomain: "",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState({ deleting: true });
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

  deleteDomain(e, domain, removeGodDomain) {
    e.preventDefault();
    let { domains } = this.state;

    removeGodDomain({
      variables: {
        godId: this.props.id,
        domain,
      },
    }).then(() =>
      this.setState({
        deleting: false,
        domains: domains.filter((dom) => dom != domain),
      })
    );
  }

  render() {
    const { editing, deleting, domains, newDomain } = this.state;
    const { id } = this.props;

    if (editing) {
      return (
        <ClickAwayListener
          onClickAway={() => this.setState({ editing: false })}
        >
          <article>
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
          </article>
        </ClickAwayListener>
      );
    } else if (deleting) {
      return (
        <ClickAwayListener
          onClickAway={() => this.setState({ deleting: false })}
        >
          <article>
            <Mutation mutation={REMOVE_GOD_DOMAIN}>
              {(removeGodDomain, data) => (
                <ul className="domains">
                  {domains.map((domain) => (
                    <li key={domain}>
                      {domain}
                      <EditTools
                        onClick={(e) =>
                          this.deleteDomain(e, domain, removeGodDomain)
                        }
                        title={`Delete ${domain}`}
                        icon="x"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </Mutation>
          </article>
        </ClickAwayListener>
      );
    } else {
      return (
        <>
          <Domains domains={domains} />
          <EditTools onClick={this.handleEdit} title="Add Domain" icon="plus" />
          <EditTools
            onClick={this.handleDelete}
            title="Delete Domain"
            icon="minus"
          />
        </>
      );
    }
  }
}

export default EditDomain;
