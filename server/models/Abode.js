const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const AbodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
  gods: [
    {
      type: Schema.Types.ObjectId,
      ref: "god",
    },
  ],
});

AbodeSchema.statics.editAbode = function (abodeId, name, coordinates) {
  const updateObj = {};
  updateObj.id = abodeId;
  if (name) updateObj.name = name;
  if (coordinates) updateObj.coordinates = coordinates;

  return this.findOneAndUpdate(
    { _id: abodeId },
    { $set: updateObj },
    { new: true },
    (err, abode) => abode
  );
};


module.exports = mongoose.model("abode", AbodeSchema);
