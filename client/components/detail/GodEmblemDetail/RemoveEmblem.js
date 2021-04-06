import React from "react";
import { Mutation } from "react-apollo";
import Emblems from "./Emblems";
import EditTools from "../EditTools";

import Mutations from "../../../graphql/mutations";
const { REMOVE_GOD_EMBLEM } = Mutations;

class RemoveEmblem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      emblems: this.props.emblems || []
    }
  }

  render() {
    const { emblems } = this.state;
    const { id } = this.props;

    return (
      <React.Fragment>
        <Mutation mutation={REMOVE_GOD_EMBLEM}>
          {(removeGodEmblem, data) => (
            <Emblems emblems={emblems} listChildren >
              <EditTools onClick={e => {
                e.preventDefault();
                // removeGodEmblem({
                //   variables: {
                //     godId: id,
                //   }
                // })
              }}
              title="Remove Emblem"
              icon="x"
              />
            </Emblems>
          )}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default RemoveEmblem;