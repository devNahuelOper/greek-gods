const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} = graphql;
const Abode = mongoose.model("abode");

const AbodeType = new GraphQLObjectType({
  name: "AbodeType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    coordinates: { type: GraphQLFloat },
    gods: {
      type: new GraphQLList(require("./god_type")),
      resolve(parentValue) {
        return Abode.findById(parentValue.id)
          .populate("gods")
          .then((abode) => abode.gods);
      },
    },
  }),
});

module.exports = AbodeType;
