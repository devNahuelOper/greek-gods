import React from "react";
import { Mutation } from "react-apollo";
import EditTools from "../EditTools";

import Mutations from "../../../graphql/mutations";
const { REMOVE_GOD_RELATIVE } = Mutations;

class RemoveRelative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatives: this.props.relatives || [],
    };
  }

  removeRelative(e, godId, relativeId, relationship, removeGodRelative) {
    e.preventDefault();

    const { handleRemoveRelative } = this.props;
    const { relatives } = this.state;

    removeGodRelative({
      variables: {
        godId,
        relativeId,
        relationship,
      },
    }).then(() =>
      handleRemoveRelative(relatives.filter((rel) => rel.id != relativeId))
    );
  }

  render() {
    const { godId, relativeId, relationship, title } = this.props;

    return (
      <React.Fragment>
        <Mutation mutation={REMOVE_GOD_RELATIVE}>
          {(removeGodRelative, data) => (
            <EditTools
              onClick={(e) =>
                this.removeRelative(
                  e,
                  godId,
                  relativeId,
                  relationship,
                  removeGodRelative
                )
              }
              title={title}
              icon="x"
            />
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default RemoveRelative;
