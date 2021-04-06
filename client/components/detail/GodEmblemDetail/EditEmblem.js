import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";
import Emblems from "./Emblems";
import { ClickAwayListener } from "@material-ui/core";
import AddEmblem from "./AddEmblem";
import RemoveEmblem from "./RemoveEmblem";

class EditEmblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      deleting: false,
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

  render() {
    const { adding, deleting } = this.state;
    const { id, emblems } = this.props;

    if (adding) {
      return (
        <ClickAwayListener onClickAway={(e) => {
          if (
            !emblemForm.contains(e.target) &&
            !e.target.classList.contains("select__option")
          ) {
            this.setState({ adding: false });
          }
        }}>
          <AddEmblem id={id} emblems={emblems} />
        </ClickAwayListener>
      );
    } else if (deleting) {
      return (
        <ClickAwayListener onClickAway={() => this.setState({ deleting: false })}>
          <RemoveEmblem id={id} emblems={emblems}/>
        </ClickAwayListener>
      )
    } else {
      return (
        <div id="emblem-wrap">
          <Emblems emblems={emblems} />
          <EditTools onClick={this.handleAdd} title="Add Emblem" icon="plus" />
          <EditTools onClick={this.handleDelete} title="Remove Emblem" icon="minus" />
        </div>
      );
    }
  }
}

export default EditEmblem;
