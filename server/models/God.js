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
        god.parents.push(relative);
        relative.children.push(god);
        break;
      case "child":
        god.children.push(relative);
        relative.parents.push(god);
        break;
      case "sibling":
        god.siblings.push(relative);
        relative.siblings.push(god);
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

    let parentIdx, childIdx;

    switch (relationship) {
      case "parent":
        parentIdx = god.parents.findIndex(
          (par) => par.toString() == relative._id.toString()
        );
        childIdx = relative.children.findIndex(
          (child) => child.toString() == god._id.toString()
        );

        if (parentIdx != -1) god.parents.splice(parentIdx, 1);
        if (childIdx != -1) relative.children.splice(childIdx, 1);

        break;
      case "child":
        childIdx = god.children.findIndex(
          (child) => child.toString() == relative._id.toString()
        );
        parentIdx = relative.parents.findIndex(
          (par) => par.toString() == god._id.toString()
        );

        if (childIdx != -1) god.children.splice(childIdx, 1);
        if (parentIdx != -1) relative.parents.splice(parentIdx, 1);

        break;
      case "sibling":
        let godSibIdx = god.siblings.findIndex(
          (sib) => sib.toString() == relative._id.toString()
        );
        let relSibIdx = relative.siblings.findIndex(
          (sib) => sib.toString() == god._id.toString()
        );

        if (godSibIdx != -1) god.siblings.splice(godSibIdx, 1);
        if (relSibIdx != -1) relative.siblings.splice(relSibIdx, 1);

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
      god.emblems.push(emblem);
      emblem.gods.push(god);

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

// DOMAIN

GodSchema.statics.addDomain = function (godId, domain) {
  const God = mongoose.model("god");
  return God.findById(godId).then(god => {
    god.domains.push(domain);

    return god.save().then(god => god);
  })
};

GodSchema.statics.removeDomain = async function(godId, domain) {
  const God = mongoose.model("god");
  let god = await God.findById(godId);

  god.domains.pull(domain);

  god = await god.save();
  return god;
}

module.exports = mongoose.model("god", GodSchema);
