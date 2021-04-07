import React from "react";
import { Mutation } from "react-apollo";
import Emblems from "./Emblems";
import EditTools from "../EditTools";

import Mutations from "../../../graphql/mutations";
const { REMOVE_GOD_EMBLEM } = Mutations;

class RemoveEmblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emblems: this.props.emblems || [],
    };
  }

  render() {
    const { emblems } = this.state;
    const { id } = this.props;

    return (
      <React.Fragment>
        <Mutation mutation={REMOVE_GOD_EMBLEM}>
          {(removeGodEmblem, data) => (
            <ul className="god-emblems">
              <h3>Emblems: </h3>
              {emblems.map((emblem) => (
                <li key={emblem.id}>
                  <h4>{emblem.name}</h4>
                  <EditTools
                    onClick={(e) => {
                      e.preventDefault();
                      removeGodEmblem({
                        variables: {
                          godId: id,
                          emblemId: emblem.id,
                        },
                      }).then(() =>
                        this.setState({
                          emblems: emblems.filter((emb) => emb.id != emblem.id),
                        })
                      );
                    }}
                    title={`Remove ${emblem.name}`}
                    icon="x"
                  />
                </li>
              ))}
            </ul>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default RemoveEmblem;
