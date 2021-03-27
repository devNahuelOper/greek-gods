import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_GOD } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_GODS } = Queries;

class GodCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "god",
      description: "",
      message: "",
    };
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e, newGod) {
    e.preventDefault();
    let { name, type, description } = this.state;

    newGod({
      variables: {
        name,
        type,
        description,
      },
    }).then((data) => {
      console.log(data);
      this.setState({
        message: `New god "${name}" created successfully`,
        name: "",
        type: "god",
        description: "",
      });
    });
  }

  updateCache(cache, { data: { newGod } }) {
    let gods;
    try {
      gods = cache.readQuery({ query: FETCH_GODS });
    } catch (err) {
      return;
    }

    if (gods) {
      let godArray = gods.gods;
      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: [...godArray, newGod] },
      });
    }
  }

  render() {
    const { name, type, description, message } = this.state;

    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newGod, { data }) => (
          <div>
            <form onSubmit={(e) => this.handleSubmit(e, newGod)}>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={this.update("name")}
              />
              <select value={type} onChange={this.update("type")}>
                <option value="god">God</option>
                <option value="goddess">Goddess</option>
              </select>
              <textarea
                value={description}
                placeholder="Description"
                onChange={this.update("description")}
              />
              <button type="submit">Create God</button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default GodCreate;
