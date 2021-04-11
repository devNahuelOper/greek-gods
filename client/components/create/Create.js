import React from "react";
import GodCreate from "./GodCreate";
import EmblemCreate from "./EmblemCreate";
import AbodeCreate from "./AbodeCreate";
import Select from "react-select";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createType: "god",
    };
    this.updateSelection = this.updateSelection.bind(this);
  }

  updateSelection(e) {
    // e.preventDefault();
    this.setState({ createType: e.value });
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

    const options = ["God", "Emblem", "Abode"].map((type) => ({
      label: type,
      value: type.toLowerCase(),
    }));

    return (
      <div className="styled-select slate">
        <Select
          className="basic-single select-create"
          classNamePrefix="select"
          isClearable
          isSearchable
          defaultValue={createType}
          placeholder="Select Type to Create"
          options={options}
          onChange={(e) => this.updateSelection(e)}
        />
        {/* <select onChange={this.updateSelection} className="select-create">
          <option value="god">God</option>
          <option value="emblem">Emblem</option>
          <option value="abode">Abode</option>
        </select> */}
        <h4>Create a new {createType}</h4>
        {form}
      </div>
    );
  }
}

export default Create;
