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
    };
  }

  fieldUpdate(field) {
    return (e) => {
      this.setState({ [field]: e.value });
      // console.log(e);
    };
  }

  addEmblem(e, addGodEmblem) {
    e.preventDefault();
    let { emblemId } = this.state;

    if (!emblemId) return;

    addGodEmblem({
      variables: {
        godId: this.props.id,
        emblemId,
      },
    }).then((emb) => {
      let emblems = emb.data.addGodEmblem.emblems;
      this.setState({ emblems });
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
                <EmblemSelect godEmblems={emblems} onChange={this.fieldUpdate("emblemId")} />
                <button className="update-btn" type="submit">
                  Add Emblem
                </button>
              </form>
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default AddEmblem;
