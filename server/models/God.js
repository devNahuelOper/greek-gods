const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const GodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  domains: [
    {
      type: String,
    },
  ],
  abode: {
    type: Schema.Types.ObjectId,
    ref: "abode",
  },
  emblems: [
    {
      type: Schema.Types.ObjectId,
      ref: "emblem",
    },
  ],
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
  siblings: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
});

// RELATIVES

GodSchema.statics.findRelatives = function (godId, type) {
  return this.findById(godId)
    .populate(`${type}`)
    .then((god) => god[type]);
};

GodSchema.statics.addRelative = function (godId, relativeId, relationship) {
  const God = mongoose.model("god");

  return God.find({
    _id: { $in: [godId, relativeId] },
  }).then((gods) => {
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];

    switch (relationship) {
      case "parent":
        god.parents.addToSet(relative);
        relative.children.addToSet(god);
        break;
      case "child":
        god.children.addToSet(relative);
        relative.parents.addToSet(god);
        break;
      case "sibling":
        god.siblings.addToSet(relative);
        relative.siblings.addToSet(god);
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  });
};

GodSchema.statics.removeRelative = function (godId, relativeId, relationship) {
  const God = mongoose.model("god");

  return God.find({
    _id: { $in: [godId, relativeId] },
  }).then((gods) => {
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];

    switch (relationship) {
      case "parent":
        god.parents.pull(relative);
        relative.children.pull(god);
        break;
      case "child":
        god.children.pull(relative);
        relative.parents.pull(god);
        break;
      case "sibling":
        god.siblings.pull(relative);
        relative.siblings.pull(god);
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  });
};

// EMBLEM

GodSchema.statics.addEmblem = (godId, emblemId) => {
  const God = mongoose.model("god");
  const Emblem = mongoose.model("emblem");

  return God.findById(godId).then((god) => {
    return Emblem.findById(emblemId).then((emblem) => {
      god.emblems.addToSet(emblem);
      emblem.gods.addToSet(god);

      return Promise.all([god.save(), emblem.save()]).then(
        ([god, emblem]) => god
      );
    });
  });
};

GodSchema.statics.removeEmblem = (godId, emblemId) => {
  const God = mongoose.model("god");
  const Emblem = mongoose.model("emblem");

  return God.findById(godId).then((god) => {
    return Emblem.findById(emblemId).then((emblem) => {
      god.emblems.pull(emblem);
      emblem.gods.pull(god);

      return Promise.all([god.save(), emblem.save()]).then(
        ([god, emblem]) => god
      );
    });
  });
};

// ABODE

GodSchema.statics.updateAbode = async (godId, abodeId) => {
  const God = mongoose.model("god");
  const Abode = mongoose.model("abode");

  let fetchedGod = await God.findById(godId);
  let fetchedAbode = await Abode.findById(abodeId);

  fetchedGod = await God.findOneAndUpdate(
    { _id: godId },
    { $set: { abode: fetchedAbode } },
    { new: true },
    (err, god) => god
  );

  let abodeGods = [...new Set(fetchedAbode.gods.map(JSON.stringify))].map(JSON.parse);
  
  fetchedAbode.gods.addToSet(fetchedGod);

  fetchedAbode = await Abode.findOneAndUpdate(
    { _id: abodeId },
    { $set: { gods: abodeGods } },
    { new: true },
    (err, abode) => abode
  );

  return Promise.all([fetchedGod.save(), fetchedAbode.save()]).then(
    ([god, abode]) => god
  );
};

// DOMAIN

GodSchema.statics.addDomain = function (godId, domain) {
  const God = mongoose.model("god");
  return God.findById(godId).then((god) => {
    god.domains.push(domain);

    return god.save().then((god) => god);
  });
};

GodSchema.statics.removeDomain = async function (godId, domain) {
  const God = mongoose.model("god");
  let god = await God.findById(godId);
  god.domains.pull(domain);

  god = await god.save();
  return god;
};

module.exports = mongoose.model("god", GodSchema);
