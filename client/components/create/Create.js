import React from "react";
import GodCreate from "./GodCreate";
import EmblemCreate from "./EmblemCreate";
import AbodeCreate from "./AbodeCreate";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createType: "god",
    };
    this.updateSelection = this.updateSelection.bind(this);
  }

  updateSelection(e) {
    e.preventDefault();
    this.setState({ createType: e.target.value });
  }

  render() {
    const { createType } = this.state;
    let form;

    switch (createType) {
      case "god":
        form = <GodCreate />;
        break;
      case "emblem":
        form = <EmblemCreate />;
        break;
      case "abode":
        form = <AbodeCreate />;
    }

    return (
      <div className="styled-select slate">
        <select onChange={this.updateSelection}>
          <option value="god">God</option>
          <option value="emblem">Emblem</option>
          <option value="abode">Abode</option>
        </select>
        <h4>Create a new {createType}</h4>
        {form}
      </div>
    );
  }
}

export default Create;
