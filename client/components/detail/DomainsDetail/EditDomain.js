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
      adding: false,
      deleting: false,
      domains: this.props.domains || [],
      newDomain: "",
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({ adding: true });
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState({ deleting: true });
  }

  fieldUpdate(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  addDomain(e, addGodDomain) {
    e.preventDefault();
    let { newDomain, domains } = this.state;
    if (!newDomain.trim()) {
      this.setState({ adding: false });
      return;
    }

    addGodDomain({
      variables: {
        godId: this.props.id,
        domain: newDomain,
      },
    }).then(() =>
      this.setState({ adding: false, domains: [...domains, newDomain] })
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
    const { adding, deleting, domains, newDomain } = this.state;
    const { id } = this.props;

    if (adding) {
      return (
        <ClickAwayListener
          onClickAway={() => this.setState({ adding: false })}
        >
          <article>
            <Mutation mutation={ADD_GOD_DOMAIN}>
              {(addGodDomain, data) => (
                <Domains domains={domains}>
                  <form onSubmit={(e) => this.addDomain(e, addGodDomain)}>
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
          <EditTools onClick={this.handleAdd} title="Add Domain" icon="plus" />
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
