const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const EmblemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  gods: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
});

EmblemSchema.statics.editEmblem = function (emblemId, name) {
  const updateObj = {};
  updateObj.id = emblemId;
  if (name) updateObj.name = name;

  return this.findOneAndUpdate(
    { _id: emblemId },
    { $set: updateObj },
    { new: true },
    (err, emblem) => emblem
  );
};

module.exports = mongoose.model("emblem", EmblemSchema);
