const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLUnionType,
} = graphql;

const GodType = require("./god_type");
const EmblemType = require("./emblem_type");
const AbodeType = require("./abode_type");

const God = mongoose.model("god");
const Emblem = mongoose.model("emblem");
const Abode = mongoose.model("abode");

const resolveType = (data) => {
  if (data.name) return [GodType, AbodeType, EmblemType];
};

const SearchableType = new GraphQLUnionType({
  name: "SearchableType",
  types: [GodType, AbodeType, EmblemType],
  resolveType,
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    gods: {
      type: new GraphQLList(GodType),
      resolve() {
        return God.find({});
      },
    },
    god: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return God.findById(id);
      },
    },
    emblems: {
      type: new GraphQLList(EmblemType),
      resolve() {
        return Emblem.find({});
      },
    },
    emblem: {
      type: EmblemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Emblem.findById(id);
      },
    },
    abodes: {
      type: new GraphQLList(AbodeType),
      resolve() {
        return Abode.find({});
      },
    },
    abode: {
      type: AbodeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Abode.findById(id);
      },
    },
    search: {
      type: new GraphQLList(SearchableType),
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(root, args) {
        const text = args.text;
        const DATA = [...God.find({}), ...Abode.find({}), ...Emblem.find({})];

        return DATA.filter((d) => {
          const searchableProperty = d.name;
          return searchableProperty.indexOf(text) !== -1;
        });
      },
    },
  }),
});

module.exports = RootQuery;
