import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_EMBLEM } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_EMBLEMS } = Queries;

class EmblemCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
    };
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newEmblem) {
    e.preventDefault();
    let { name } = this.state;

    newEmblem({
      variables: {
        name,
      },
    }).then((data) => {
      console.log(data);
      this.setState({
        message: `New emblem "${name} created successfully"`,
        name: "",
      });
    });
  }

  updateCache(cache, { data: { newEmblem } }) {
    let emblems;
    try {
      emblems = cache.readQuery({ query: FETCH_EMBLEMS });
    } catch (err) {
      return;
    }

    if (emblems) {
      let emblemArray = emblems.emblems;
      cache.writeQuery({
        query: FETCH_EMBLEMS,
        data: { emblems: [...emblemArray, newEmblem] },
      });
    }
  }

  render() {
    const { name, message } = this.state;

    return (
      <Mutation
        mutation={NEW_EMBLEM}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newEmblem, { data }) => (
          <div>
            <form onSubmit={(e) => this.handleSubmit(e, newEmblem)}>
              <input
                value={name}
                className="name-input"
                placeholder="Name"
                onChange={this.update("name")}
              />
              <button className="update-btn" type="submit">Create Emblem</button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EmblemCreate;
