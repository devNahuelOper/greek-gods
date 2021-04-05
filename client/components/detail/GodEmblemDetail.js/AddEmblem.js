import React from "react";
import { Mutation } from "react-apollo";
import EmblemSelect from "./EmblemSelect";
import Emblems from "./Emblems";

import Mutations from "../../../graphql/mutations";
const { ADD_GOD_EMBLEM } = Mutations;

class AddEmblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emblems: this.props.emblems || [],
      emblemId: null,
      newEmblem: "",
    };
  }

  fieldUpdate(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
      console.log(e.target.value);
    };
  }

  addEmblem(e, addGodEmblem) {
    e.preventDefault();
    let { emblems, emblemId } = this.state;

    if (!emblemId) return;

    addGodEmblem({
      variables: {
        godId: this.props.id,
        emblemId,
      },
    }).then((emb) => {
      let emblem = emb.data.addGodEmblem.emblem;
      this.setState({ emblemId: emblem.id, emblems: [...emblems, emblem] });
    });
  }

  render() {
    const { emblems, emblemId } = this.state;
    const { id } = this.props;

    return (
      <React.Fragment>
        <Emblems emblems={emblems} />
        <Mutation mutation={ADD_GOD_EMBLEM}>
          {(addGodEmblem, data) => {
            return (
              <form
                id="emblemForm"
                onSubmit={(e) => this.addEmblem(e, addGodEmblem)}
              >
                <EmblemSelect
                  emblemId={emblemId}
                  onChange={this.fieldUpdate("emblemId")}
                />
                <button className="update-btn" type="submit">Add Emblem</button>
              </form>
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default AddEmblem;
