import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_ABODE } = Mutations;

import Queries from "../../graphql/queries";
const { FETCH_ABODES } = Queries;

class AbodeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      coordinates: "",
      message: "",
    };
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  async handleSubmit(e, newAbode) {
    e.preventDefault();
    let { name, coordinates } = this.state;

    let data = await newAbode({
      variables: {
        name,
        coordinates,
      },
    });
    console.log(data);

    this.setState({
      message: `New Abode "${name}" created successfully`,
      name: "",
      coordinates: "",
    });
  }

  updateCache(cache, { data: { newAbode } }) {
    let abodes;
    try {
      abodes = cache.readQuery({ query: FETCH_ABODES });
    } catch (err) {
      return;
    }

    if (abodes) {
      let abodeArray = abodes.abodes;
      cache.writeQuery({
        query: FETCH_ABODES,
        data: { abodes: [...abodeArray, newAbode] },
      });
    }
  }

  render() {
    const { name, coordinates, message } = this.state;

    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newAbode, { data }) => (
          <div>
            <form onSubmit={(e) => this.handleSubmit(e, newAbode)}>
              <input
                value={name}
                className="name-input"
                placeholder="Name"
                onChange={this.update("name")}
              />
              <input
                value={coordinates}
                className="name-input"
                placeholder="Coordinates"
                onChange={this.update("coordinates")}
              />
              <button className="update-btn" type="submit">
                Create Abode
              </button>
              <p>{message}</p>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AbodeCreate;
