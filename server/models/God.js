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

GodSchema.statics.findRelatives = function (godId, type) {
  return this.findById(godId)
    .populate(`${type}`)
    .then((god) => god[type]);
};

GodSchema.statics.addDomain = function (godId, domain) {
  return this.findById(godId).then((god) => {
    if (!god.domains.includes(domain)) {
      god.domains.push(domain);
      return god.domains;
    } else {
      throw new Error(`${god.name} already has domain: ${domain}`);
    }
  });
};

GodSchema.statics.removeDomain = async function (godId, domain) {
  const god = await this.findById(godId);
  const domainIndex = await god.domains.findIndex(
    (dom) => dom.toLowerCase() === domain.toLowerCase()
  );

  if (domainIndex != -1) {
    god.domains.splice(domainIndex, 1);
    god.save();
    return god.domains;
  } else {
    throw new Error(`${domain} is not part of ${god.name}'s domains`);
  }
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
        parentIdx = god.parents.findIndex((par) => par.toString() == relative._id.toString());
        childIdx = relative.children.findIndex((child) => child.toString() == god._id.toString());

        if (parentIdx != -1) god.parents.splice(parentIdx, 1);
        if (childIdx != -1) relative.children.splice(childIdx, 1);

        break;
      case "child":
        childIdx = god.children.findIndex(child => child.toString() == relative._id.toString());
        parentIdx = relative.parents.findIndex(par => par.toString() == god._id.toString());

        if (childIdx != -1) god.children.splice(childIdx, 1);
        if (parentIdx != -1) relative.parents.splice(parentIdx, 1);

        break;
      case "sibling":
        let godSibIdx = god.siblings.findIndex(sib => sib.toString() == relative._id.toString());
        let relSibIdx = relative.siblings.findIndex(sib => sib.toString() == god._id.toString());

        if (godSibIdx != -1) god.siblings.splice(godSibIdx, 1);
        if (relSibIdx != -1) relative.siblings.splice(relSibIdx, 1);

        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  });
};

module.exports = mongoose.model("god", GodSchema);
