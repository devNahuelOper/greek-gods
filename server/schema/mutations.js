const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;

const God = mongoose.model("god");
const GodType = require("./god_type");

const Abode = mongoose.model("abode");
const AbodeType = require("./abode_type");

const Emblem = mongoose.model("emblem");
const EmblemType = require("./emblem_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newGod: {
      type: GodType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { name, type, description }) {
        return new God({ name, type, description }).save();
      },
    },
    deleteGod: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return God.findById(id).then((god) => God.deleteOne(god));
      },
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { id, name, type, description }) {
        const updateObj = {};
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;

        return God.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, god) => {
            return god;
          }
        );
      },
    },
    addGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString },
      },
      resolve(parentValue, { godId, domain }) {
        return God.addDomain(godId, domain);
      },
    },
    removeGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        domain: { type: GraphQLString },
      },
      resolve(parentValue, { godId, domain }) {
        return God.removeDomain(godId, domain);
      },
    },
    addGodEmblem: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        emblemId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.addEmblem(godId, emblemId);
      },
    },
    removeGodEmblem: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        emblemId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.removeEmblem(godId, emblemId);
      },
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        relativeId: { type: new GraphQLNonNull(GraphQLID) },
        relationship: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.addRelative(godId, relativeId, relationship);
      },
    },
    removeGodRelative: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        relativeId: { type: new GraphQLNonNull(GraphQLID) },
        relationship: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.removeRelative(godId, relativeId, relationship);
      },
    },
    newAbode: {
      type: AbodeType,
      args: {
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString },
      },
      resolve(parentValue, { name, coordinates }) {
        return new Abode({ name, coordinates }).save();
      },
    },
    deleteAbode: {
      type: AbodeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Abode.findOneAndDelete({ _id: id });
      },
    },
    updateAbode: {
      type: AbodeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString },
      },
      resolve(parentValue, { id, name, coordinates }) {
        return Abode.editAbode(id, name, coordinates);
      },
    },
    newEmblem: {
      type: EmblemType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }) {
        return new Emblem({ name }).save();
      },
    },
    deleteEmblem: {
      type: EmblemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Emblem.findOneAndDelete({ _id: id });
      },
    },
    updateEmblem: {
      type: EmblemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve(parentValue, { id, name }) {
        return Emblem.editEmblem(id, name);
      },
    },
  },
});

module.exports = mutation;
