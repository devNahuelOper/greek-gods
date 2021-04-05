import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";
import Emblems from "./Emblems";
import { ClickAwayListener } from "@material-ui/core";
import AddEmblem from "./AddEmblem";

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
    const { id } = this.props;

    if (adding) {
      return (
        <ClickAwayListener onClickAway={() => this.setState({ adding: false })}>
          <AddEmblem id={id} adding={adding}/>
        </ClickAwayListener>
      );
    }
  }
}

export default EditEmblem;