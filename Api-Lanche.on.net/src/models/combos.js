const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComboSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  description: { type: String },
  id: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  adicionais: { type: String, required: true },
  type: [{
    type: String,
    enum: ["sim", "não"],
  }],
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Combo", ComboSchema);
