import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";
import Abodes from "./Abodes";
import { ClickAwayListener } from "@material-ui/core";
import { Link } from "react-router-dom";

import Mutations from "../../../graphql/mutations";
const { UPDATE_GOD_ABODE } = Mutations;

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
      // console.log(this.state);
    }
  }

  render() {
    const { editing, abode, abodeId } = this.state;
    const { id  } = this.props;

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_ABODE}>
          {(updateGodAbode, data) => {
            return (
            <ClickAwayListener
              onClickAway={(e) => {
                let menu = document.getElementById("menu-");
                let currEle = document.elementFromPoint(e.pageX, e.pageY);
                if (menu && menu.contains(currEle)) return;
                this.setState({ editing: false });
              }}
            >
              <div>
                <form
                  id="abodeForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateGodAbode({
                      variables: {
                        godId: id,
                        abodeId,
                      },
                    }).then((newAbode) => this.setState({ editing: false, abode: newAbode.data.updateGodAbode.abode }));
                  }}
                >
                  <Abodes abode={abode} abodeId={abodeId} onChange={this.fieldUpdate("abodeId")} />
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
            <h3 className="unknown">Unknown</h3>
          )}
          <EditTools onClick={this.handleEdit} title="Edit Abode"/>
        </div>
      );
    }
  }
}

export default GodAbodeDetail;
