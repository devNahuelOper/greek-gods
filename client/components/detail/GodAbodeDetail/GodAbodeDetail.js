import React from "react";
import { Mutation, Query } from "react-apollo";
import EditTools from "../EditTools";
import Abodes from "./Abodes";
import { ClickAwayListener } from "@material-ui/core";
import { Link } from "react-router-dom";

import Mutations from "../../../graphql/mutations";
const { UPDATE_GOD_ABODE } = Mutations;

import gql from "graphql-tag";
const FETCH_ABODES = gql`
  query FetchAbodes {
    abodes {
      id
      name
    }
  }
`;

class GodAbodeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      abode: this.props.abode || null,
      abodeId: this.props.abode.id || null
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {

    return (e) => {
      this.setState({ [field]: e.target.value });
      console.log(this.state);
    }
  }

  render() {
    const { editing, abode, abodeId } = this.state;
    const { id  } = this.props;

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_ABODE}>
          {(updateGodAbode, data) => {
            // console.log(data);
            return (
            <ClickAwayListener
              onClickAway={() => false}
            >
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateGodAbode({
                      variables: {
                        godId: id,
                        abodeId,
                      },
                    }).then(() => this.setState({ editing: false }));
                  }}
                >
                 <Query query={FETCH_ABODES}>
                  {({loading, error, data}) => {
                    // console.log(data);
                     if (loading) return <p>Loading...</p>;
                     if (error) return <p>{error}</p>;
                     return (
                       <select value={abodeId} onChange={this.fieldUpdate("abodeId")}>
                         {data.abodes.map(abode => 
                         <option key={abode.id} value={abode.id}>{abode.name}</option>
                          )}
                       </select>
                     )
                  }}
                 </Query>
                  {/* <Abodes abode={abode} onChange={this.fieldUpdate("abode")} /> */}
                  <button className="update-btn" type="submit">Update Abode</button>
                </form>
              </div>
            </ClickAwayListener>
          )}}
        </Mutation>
      );
    } else {
      return (
        <div id="god-abode-detail">
          Abode:
          {Boolean(abode) ? (
            <Link to={`/abodes/${abode.id}`}>
              <h3 className="god-abode">{abode.name}</h3>
            </Link>
          ) : (
            <h3>Unknown</h3>
          )}
          <EditTools onClick={this.handleEdit} title="Edit Abode"/>
        </div>
      );
    }
  }
}

export default GodAbodeDetail;
